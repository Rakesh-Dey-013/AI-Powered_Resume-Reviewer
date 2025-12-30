const ResumeParser = require('../utils/resumeParser');

// Initialize Groq with error handling
let groq;
try {
  const { Groq } = require('groq-sdk');
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  console.log('Groq SDK initialized successfully');
} catch (error) {
  console.error('Groq SDK initialization error:', error.message);
  groq = null;
}

class AnalyzeController {
  static async uploadResume(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      console.log(`Processing resume: ${req.file.originalname} (${req.file.size} bytes)`);
      
      // Process the file buffer directly
      const text = await ResumeParser.parse(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );
      
      res.json({
        success: true,
        fileName: req.file.originalname,
        text: text,
        message: 'Resume parsed successfully',
        textPreview: text.substring(0, 200) + '...'
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        error: 'Failed to process resume',
        message: error.message,
        details: 'Please ensure you uploaded a valid PDF or DOCX file'
      });
    }
  }
  
  static async analyzeResume(req, res) {
    try {
      const { resumeText, jobRole, experienceLevel } = req.body;
      
      console.log('Analysis request received:', {
        jobRole,
        experienceLevel,
        textLength: resumeText?.length || 0
      });
      
      if (!resumeText || !jobRole) {
        return res.status(400).json({
          error: 'Resume text and job role are required',
          received: { 
            hasResumeText: !!resumeText, 
            hasJobRole: !!jobRole 
          }
        });
      }
      
      // Check if Groq is initialized
      if (!groq || !process.env.GROQ_API_KEY) {
        console.log('Using demo analysis (Groq not configured)');
        const demoFeedback = AnalyzeController.getDemoFeedback(jobRole, experienceLevel);
        return res.json({
          success: true,
          feedback: demoFeedback,
          note: 'Using demo data - Add GROQ_API_KEY to .env for AI analysis',
          config: {
            hasApiKey: !!process.env.GROQ_API_KEY,
            hasGroqInstance: !!groq
          }
        });
      }
      
      const prompt = AnalyzeController.createPrompt(resumeText, jobRole, experienceLevel);
      console.log(`Sending to AI for ${experienceLevel} ${jobRole}...`);
      
      const feedback = await AnalyzeController.getAIResponse(prompt);
      
      // Parse the response into structured JSON
      const structuredFeedback = AnalyzeController.parseAIResponse(feedback, jobRole);
      
      res.json({
        success: true,
        feedback: structuredFeedback,
        source: 'AI Analysis'
      });
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Return demo data if AI service fails
      const demoFeedback = AnalyzeController.getDemoFeedback(
        req.body.jobRole || 'Software Developer',
        req.body.experienceLevel || 'Mid'
      );
      
      res.json({
        success: true,
        feedback: demoFeedback,
        note: 'Using demo data due to: ' + error.message,
        source: 'Demo Analysis'
      });
    }
  }
  
  static createPrompt(resumeText, jobRole, experienceLevel = 'Mid') {
    return `You are an expert resume reviewer and career coach. Analyze the following resume for a ${experienceLevel} level ${jobRole} position.

Resume Content:
${resumeText.substring(0, 3000)} ${resumeText.length > 3000 ? '...[truncated]' : ''}

Please provide a comprehensive analysis in the following JSON format:
{
  "summary": "Brief overall assessment (2-3 sentences)",
  "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
  "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
  "missingSkills": ["Skill 1", "Skill 2", "Skill 3"],
  "atsOptimization": ["ATS tip 1", "ATS tip 2"],
  "grammarImprovements": ["Grammar tip 1", "Grammar tip 2"],
  "score": 85,
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}

Focus on:
1. Relevance to ${jobRole} at ${experienceLevel} level
2. Clarity, formatting, and professional presentation
3. Keyword optimization for Applicant Tracking Systems
4. Quantification of achievements with metrics
5. Skills alignment with ${jobRole} requirements
6. Actionable improvement suggestions

Score should be 0-100 based on ATS compatibility, content quality, and relevance.

Return ONLY valid JSON, no additional text or explanations.`;
  }
  
  static async getAIResponse(prompt) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.3,
        max_tokens: 2000
      });
      
      return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('AI API Error:', error.message);
      throw new Error(`AI service error: ${error.message}`);
    }
  }
  
  static parseAIResponse(response, jobRole) {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Validate and ensure all required fields exist
        const validated = AnalyzeController.validateFeedback(parsed, jobRole);
        return validated;
      }
      
      throw new Error('No valid JSON found in AI response');
    } catch (error) {
      console.error('Failed to parse AI response:', error.message);
      console.log('Response sample:', response?.substring(0, 200));
      return AnalyzeController.getDemoFeedback(jobRole, 'Mid');
    }
  }
  
  static validateFeedback(feedback, jobRole) {
    const defaultFeedback = AnalyzeController.getDemoFeedback(jobRole, 'Mid');
    
    return {
      summary: feedback.summary || defaultFeedback.summary,
      strengths: Array.isArray(feedback.strengths) && feedback.strengths.length > 0 
        ? feedback.strengths.slice(0, 4)
        : defaultFeedback.strengths,
      weaknesses: Array.isArray(feedback.weaknesses) && feedback.weaknesses.length > 0
        ? feedback.weaknesses.slice(0, 3)
        : defaultFeedback.weaknesses,
      missingSkills: Array.isArray(feedback.missingSkills) && feedback.missingSkills.length > 0
        ? feedback.missingSkills.slice(0, 3)
        : defaultFeedback.missingSkills,
      atsOptimization: Array.isArray(feedback.atsOptimization) && feedback.atsOptimization.length > 0
        ? feedback.atsOptimization.slice(0, 2)
        : defaultFeedback.atsOptimization,
      grammarImprovements: Array.isArray(feedback.grammarImprovements) && feedback.grammarImprovements.length > 0
        ? feedback.grammarImprovements.slice(0, 2)
        : defaultFeedback.grammarImprovements,
      score: typeof feedback.score === 'number' 
        ? Math.min(100, Math.max(0, Math.round(feedback.score)))
        : defaultFeedback.score,
      recommendations: Array.isArray(feedback.recommendations) && feedback.recommendations.length > 0
        ? feedback.recommendations.slice(0, 3)
        : defaultFeedback.recommendations
    };
  }
  
static getDemoFeedback(jobRole = 'Software Developer', experienceLevel = 'Mid') {
  const roleSpecificTips = {
    'Software Developer': {
      missingSkills: ['Containerization (Docker/Kubernetes)', 'CI/CD pipeline experience', 'Cloud platform certification'],
      recommendations: ['Add GitHub profile with projects', 'Include specific metrics in achievements', 'Mention testing frameworks used']
    },
    'Data Scientist': {
      missingSkills: ['Big data technologies (Spark/Hadoop)', 'Cloud ML services', 'Advanced visualization tools'],
      recommendations: ['Include link to Kaggle profile', 'Add specific model accuracy metrics', 'Mention data pipeline experience']
    },
    'Product Manager': {
      missingSkills: ['Product analytics tools (Amplitude/Mixpanel)', 'A/B testing framework', 'Roadmap management software'],
      recommendations: ['Quantify product impact with metrics', 'Include user research methods', 'Add product launch experience']
    },
    'Frontend Developer': {
      missingSkills: ['Modern frameworks (Next.js/Nuxt.js)', 'Performance optimization tools', 'Accessibility standards'],
      recommendations: ['Add links to live projects', 'Include Lighthouse scores', 'Mention cross-browser testing']
    },
    'Backend Developer': {
      missingSkills: ['Microservices architecture', 'API design patterns', 'Database optimization'],
      recommendations: ['Include API performance metrics', 'Add system design experience', 'Mention security practices']
    },
    'Full Stack Developer': {
      missingSkills: ['DevOps experience', 'Cloud deployment', 'End-to-end testing'],
      recommendations: ['Show full project examples', 'Include deployment statistics', 'Mention team collaboration tools']
    }
  };
  
  const tips = roleSpecificTips[jobRole] || roleSpecificTips['Software Developer'];
  
  // Improved scoring logic - More realistic and encouraging
  const baseScore = this.calculateRealisticScore(jobRole, experienceLevel);
  
  return {
    summary: `This resume demonstrates strong qualifications for ${experienceLevel.toLowerCase()} level ${jobRole} positions. The content is well-structured and showcases relevant experience, with opportunities for further optimization.`,
    strengths: [
      "Professional and clean formatting that's ATS-friendly",
      "Clear demonstration of relevant technical expertise",
      "Good use of industry-standard terminology",
      "Well-organized career progression timeline"
    ],
    weaknesses: [
      "Could benefit from more quantifiable achievements",
      "Opportunity to add more action-oriented language",
      "Consider adding more industry-specific keywords"
    ],
    missingSkills: tips.missingSkills,
    atsOptimization: [
      "Increase keyword density with job-specific terms",
      "Use standard section headers (Experience, Education, Skills)",
      "Include both full terms and acronyms for technologies"
    ],
    grammarImprovements: [
      "Maintain consistent verb tense throughout",
      "Use active voice for stronger impact",
      "Ensure consistent formatting of dates and locations"
    ],
    score: baseScore,
    recommendations: tips.recommendations
  };
}

static calculateRealisticScore(jobRole, experienceLevel) {
  // Base scores adjusted to be more realistic
  const baseScores = {
    'Fresher': 75,  // Higher base for freshers (they're learning!)
    'Mid': 78,      // Good resumes should score well
    'Senior': 82    // Experienced professionals have better resumes
  };
  
  let baseScore = baseScores[experienceLevel] || 78;
  
  // Add variation based on job role complexity
  const roleModifiers = {
    'Software Developer': 5,
    'Frontend Developer': 4,
    'Backend Developer': 6,
    'Full Stack Developer': 7,
    'Data Scientist': 8,
    'Product Manager': 3,
    'UX Designer': 2,
    'DevOps Engineer': 7,
    'Cloud Architect': 9
  };
  
  baseScore += roleModifiers[jobRole] || 5;
  
  // Add some random variation (less variation for more realistic scores)
  const randomVariation = Math.floor(Math.random() * 6) - 2; // -2 to +3
  
  // Ensure score is realistic but encouraging
  let finalScore = baseScore + randomVariation;
  
  // Cap scores realistically
  finalScore = Math.min(95, Math.max(65, finalScore));
  
  // Round to nearest 5 for cleaner display
  return Math.round(finalScore / 5) * 5;
}
}

module.exports = AnalyzeController;