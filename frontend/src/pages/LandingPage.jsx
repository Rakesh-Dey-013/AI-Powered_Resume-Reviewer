import { motion } from 'framer-motion'
import { FiSearch, FiBarChart2, FiCheckCircle, FiUpload } from 'react-icons/fi'
import FileUpload from '../components/FileUpload'

const LandingPage = ({ onUploadComplete }) => {
  const features = [
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Get tips to beat Applicant Tracking Systems"
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Skill Analysis",
      description: "Identify missing skills for your target role"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Professional Feedback",
      description: "AI-powered comprehensive resume review"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            AI Resume Reviewer
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get instant AI-powered feedback to optimize your resume and land more interviews
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-gray-400">ATS Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-gray-400">Skills Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400">Instant Feedback</div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/20 rounded-full mb-4">
                <div className="text-blue-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FileUpload onUploadComplete={onUploadComplete} />
        </motion.div>

        {/* How It Works */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Upload Resume", desc: "Upload your PDF or DOCX resume" },
              { step: "2", title: "Enter Job Details", desc: "Specify your target role and experience level" },
              { step: "3", title: "Get AI Feedback", desc: "Receive comprehensive analysis and score" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 py-8 text-center">
        <p className="text-gray-400">
          Built with ❤️ for job seekers worldwide | AI Resume Reviewer © 2024
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Powered by Groq AI & Llama 3/Mixtral
        </p>
      </footer>
    </div>
  )
}

export default LandingPage