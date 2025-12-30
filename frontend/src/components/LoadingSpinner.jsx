import { motion } from 'framer-motion'
import { FiLoader, FiZap, FiTrendingUp } from 'react-icons/fi'
import { FaRobot } from 'react-icons/fa'
import { RiSparklingFill } from "react-icons/ri";

const LoadingSpinner = ({ message = "AI is analyzing your resume..." }) => {
  const analysisSteps = [
    { text: "Extracting key skills", icon: <FiZap className="w-3 h-3" /> },
    { text: "Checking ATS compatibility", icon: <FiTrendingUp className="w-3 h-3" /> },
    { text: "Finding improvements", icon: <RiSparklingFill className="w-3 h-3" /> },
    { text: "Generating insights", icon: <FaRobot className="w-3 h-3" /> }
  ]

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card p-8 md:p-12 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
        <div className="flex flex-col items-center justify-center py-8">
          {/* Animated Robot Icon */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <FiLoader className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Analyzing Your Resume</h3>
            <p className="text-zinc-400">{message}</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mb-8">
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden group">
              <motion.div 
                className="h-full bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          {/* Analysis Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: index * 0.3,
                  repeat: Infinity
                }}
                className="text-center group/step"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-2 group-hover/step:border-emerald-500/40 group-hover/step:from-emerald-500/20 group-hover/step:to-teal-500/20 transition-all">
                  <div className="text-emerald-400 group-hover/step:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>
                <div className="text-xs text-zinc-400 group-hover/step:text-emerald-300 transition-colors">{step.text}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Fun Facts */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/40 border border-zinc-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-zinc-400">
                Processing with advanced AI algorithms
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingSpinner