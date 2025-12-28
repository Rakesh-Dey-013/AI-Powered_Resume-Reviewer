import { motion } from 'framer-motion'
import { FiLoader } from 'react-icons/fi'

const LoadingSpinner = ({ message = "AI is analyzing your resume..." }) => {
  return (
    <motion.div 
      className="card max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <FiLoader className="w-16 h-16 text-blue-500" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Resume</h3>
        <p className="text-gray-400 text-center mb-8">{message}</p>
        
        <div className="w-full max-w-md space-y-4">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {['Extracting key skills', 'Checking ATS compatibility', 'Finding improvements'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, delay: index * 0.3, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-xs text-gray-400 mb-1">{step}</div>
                <div className="flex justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-blue-400 rounded-full mx-0.5"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingSpinner