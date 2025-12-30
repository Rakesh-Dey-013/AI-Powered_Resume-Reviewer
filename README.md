# 🚀 AI Resume Reviewer

<div align="center">

![AI Resume Reviewer](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=ai)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**AI-powered resume optimization tool with instant feedback and ATS scoring**

[Live Demo](#) • [Video Demo](#) • [Report Bug](https://github.com/yourusername/ai-resume-reviewer/issues)

</div>

## 📋 Table of Contents
- [✨ Features](#-features)
- [🎯 What It Does](#-what-it-does)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🎨 Screenshots](#-screenshots)
- [📊 How It Works](#-how-it-works)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 **Core Features**
- **📄 Smart Resume Parsing** - Upload PDF/DOCX resumes with intelligent text extraction
- **🤖 AI-Powered Analysis** - Get comprehensive feedback using Groq's Llama 3/Mixtral models
- **📊 ATS Score Simulation** - Realistic ATS compatibility scoring (75-92 range for decent resumes)
- **🎨 Modern Glass UI** - Beautiful dark theme with glass morphism effects
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile

### 🔍 **Analysis Includes**
- ✅ **Overall Summary** - Brief assessment of resume quality
- ✅ **Strengths & Weaknesses** - Balanced feedback with actionable insights
- ✅ **Missing Skills** - Identifies gaps for your target role
- ✅ **ATS Optimization** - Specific tips to beat applicant tracking systems
- ✅ **Grammar & Clarity** - Language and formatting improvements
- ✅ **Resume Score** - Visual score (0-100) with detailed breakdown

### 🎨 **Design Highlights**
- 🌟 **Glass Morphism Effects** - Modern translucent UI elements
- 🎨 **Gradient Accents** - Emerald, violet, and blue color scheme
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🔄 **Interactive Hover Effects** - Engaging micro-interactions
- 📱 **Mobile-First Design** - Optimized for all screen sizes

## 🎯 What It Does

AI Resume Reviewer helps job seekers optimize their resumes for better job applications by:

1. **📤 Upload** your resume (PDF or DOCX format)
2. **🎯 Specify** your target job role and experience level
3. **🤖 Receive** instant AI-powered analysis with:
   - ATS compatibility score
   - Strengths and areas for improvement
   - Missing skills for your target role
   - Specific optimization recommendations
   - Grammar and clarity suggestions
4. **📊 Download** a comprehensive report for future reference

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload handling
- **Groq SDK** - AI integration with Llama 3/Mixtral
- **PDF-Parse** - PDF text extraction
- **Mammoth** - DOCX text extraction

### **AI/ML**
- **Groq API** - High-performance inference
- **Llama 3 70B** / **Mixtral 8x7B** - Large language models
- **Custom Prompts** - Optimized for resume analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Groq API key (free at [console.groq.com](https://console.groq.com))
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-resume-reviewer.git
cd ai-resume-reviewer
```

2. **Set up the backend**
```bash
cd backend
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env and add your Groq API key
```

4. **Set up the frontend**
```bash
cd ../frontend
npm install
```

5. **Start both servers**
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

6. **Open your browser**
```
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```

## 📁 Project Structure

```
ai-resume-reviewer/
├── backend/                    # Node.js + Express backend
│   ├── controllers/           # Request handlers
│   │   └── analyzeController.js
│   ├── utils/                 # Utility functions
│   │   └── resumeParser.js
│   ├── .env                   # Environment variables
│   ├── server.js             # Express server
│   └── package.json
│
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── FileUpload.jsx
│   │   │   ├── JobInput.jsx
│   │   │   ├── ResultsDisplay.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ScoreCircle.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   └── ReviewPage.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json
│
└── README.md               # This file
```

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Getting a Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into your `.env` file

## 🎨 Screenshots

<div align="center">

### 🏠 Landing Page
![Landing Page](https://github.com/Rakesh-Dey-013/AI-Powered_Resume-Reviewer/blob/main/frontend/src/assets/home.png)

### 📄 Resume Upload
![Upload Interface](https://github.com/Rakesh-Dey-013/AI-Powered_Resume-Reviewer/blob/main/frontend/src/assets/upload.png)

### 📊 Select Job Role
![Gather Details](https://github.com/Rakesh-Dey-013/AI-Powered_Resume-Reviewer/blob/main/frontend/src/assets/details.png)

### 📊 Analysis Results
![Results Dashboard](https://github.com/Rakesh-Dey-013/AI-Powered_Resume-Reviewer/blob/main/frontend/src/assets/result.png)

</div>

## 📊 How It Works

### 1. **Resume Processing**
```javascript
// Backend processes resume files
1. User uploads PDF/DOCX file
2. Multer handles file upload (memory storage)
3. PDF-Parse/Mammoth extracts text
4. Text is cleaned and prepared for analysis
```

### 2. **AI Analysis**
```javascript
// AI analyzes the resume
1. Resume text + job details sent to Groq API
2. Custom prompt structures the analysis
3. Llama 3/Mixtral generates comprehensive feedback
4. Response parsed into structured JSON
```

### 3. **Scoring Algorithm**
```javascript
// Realistic ATS score calculation
Base Score (75-82) +
Role Complexity Modifier (2-9) +
Random Variation (-2 to +3) =
Final Score (65-95 range)

// Most professional resumes score 78-88
```

### 4. **Frontend Display**
```javascript
// Results presentation
1. Glass morphism cards for each section
2. Visual score display with animations
3. Interactive hover effects
4. Downloadable report generation
```

## 🔒 Security & Privacy

- **No File Storage** - Resumes processed in memory, not saved to disk
- **Secure API Keys** - Environment variable configuration
- **CORS Protection** - Configured for specific origins
- **Input Validation** - File type and size validation
- **Error Handling** - Graceful error recovery

## 🚀 Deployment

### Option 1: Vercel (Frontend) + Railway/Render (Backend)
```bash
# Frontend (Vercel)
vercel deploy

# Backend (Railway)
railway up
```

### Option 2: Docker Deployment
```dockerfile
# Docker Compose example
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
  
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

## 🤝 Contributing

We love contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### 🐛 Reporting Issues
Please use the [GitHub Issues](https://github.com/yourusername/ai-resume-reviewer/issues) page to report bugs or request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for providing free AI API access
- **Meta** for Llama 3 model
- **Mistral AI** for Mixtral model
- **React & Node.js** communities for amazing tools
- **All contributors** who help improve this project

## 📞 Support

For support, questions, or feedback:
- 📧 Email: rakesh.coding.007@gmail.com
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 💬 GitHub: [Open an issue](https://github.com/Rakesh-Dey-013/AI-Powered_Resume-Reviewer/issues)

---

<div align="center">

### Made with ❤️ for job seekers everywhere

⭐ **Star this repo if you find it helpful!** ⭐

</div>