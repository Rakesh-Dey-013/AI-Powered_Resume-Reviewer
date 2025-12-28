import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'

const ScoreCircle = ({ score }) => {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStrokeColor = (score) => {
    if (score >= 80) return '#4ade80'
    if (score >= 60) return '#fbbf24'
    return '#f87171'
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="150" height="150" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#374151"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="75"
          cy="75"
          r={radius}
          stroke={getStrokeColor(score)}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <FiAward className={`w-6 h-6 mb-2 ${getScoreColor(score)}`} />
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`text-3xl font-bold ${getScoreColor(score)}`}
          >
            {score}
          </motion.div>
          <div className="text-sm text-gray-400">Score</div>
        </div>
      </div>
    </div>
  )
}

export default ScoreCircle