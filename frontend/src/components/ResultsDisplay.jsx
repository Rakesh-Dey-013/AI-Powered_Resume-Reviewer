import { motion } from 'framer-motion'
import { FiCheck, FiAlertCircle, FiTarget, FiTool, FiEdit, FiStar } from 'react-icons/fi'
import ScoreCircle from './ScoreCircle'

const ResultsDisplay = ({ feedback, onNewReview }) => {
  const sections = [
    {
      id: 'summary',
      title: 'Overall Summary',
      icon: FiStar,
      color: 'blue',
      content: feedback.summary
    },
    {
      id: 'strengths',
      title: 'Strengths',
      icon: FiCheck,
      color: 'green',
      content: feedback.strengths,
      isList: true
    },
    {
      id: 'weaknesses',
      title: 'Areas for Improvement',
      icon: FiAlertCircle,
      color: 'yellow',
      content: feedback.weaknesses,
      isList: true
    },
    {
      id: 'missingSkills',
      title: 'Missing Skills',
      icon: FiTarget,
      color: 'purple',
      content: feedback.missingSkills,
      isList: true
    },
    {
      id: 'atsOptimization',
      title: 'ATS Optimization',
      icon: FiTool,
      color: 'teal',
      content: feedback.atsOptimization,
      isList: true
    },
    {
      id: 'grammarImprovements',
      title: 'Grammar & Clarity',
      icon: FiEdit,
      color: 'red',
      content: feedback.grammarImprovements,
      isList: true
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-900/20 border-blue-700 text-blue-300',
      green: 'bg-green-900/20 border-green-700 text-green-300',
      yellow: 'bg-yellow-900/20 border-yellow-700 text-yellow-300',
      purple: 'bg-purple-900/20 border-purple-700 text-purple-300',
      teal: 'bg-teal-900/20 border-teal-700 text-teal-300',
      red: 'bg-red-900/20 border-red-700 text-red-300'
    }
    return colors[color] || colors.blue
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Score */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">Resume Analysis Results</h2>
            <p className="text-gray-400 mb-6">
              Here's your comprehensive AI-powered resume review. Use these insights to optimize 
              your resume for better job applications.
            </p>
            
            {/* Recommendations */}
            {feedback.recommendations?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-white mb-2">Top Recommendations:</h4>
                <ul className="space-y-2">
                  {feedback.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <ScoreCircle score={feedback.score} />
            <p className="text-center text-gray-400 mt-4 text-sm">
              Based on ATS compatibility, content, and relevance
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mb-12">
        <button
          onClick={onNewReview}
          className="btn-primary"
        >
          Analyze Another Resume
        </button>
      </div>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${getColorClasses(section.color)}`}>
              <section.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{section.title}</span>
            </div>
            
            {section.isList ? (
              <ul className="space-y-3">
                {Array.isArray(section.content) && section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      section.color === 'green' ? 'bg-green-500' :
                      section.color === 'yellow' ? 'bg-yellow-500' :
                      section.color === 'purple' ? 'bg-purple-500' :
                      section.color === 'teal' ? 'bg-teal-500' :
                      section.color === 'red' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ResultsDisplay