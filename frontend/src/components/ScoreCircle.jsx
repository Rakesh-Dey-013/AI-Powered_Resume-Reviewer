import { motion } from 'framer-motion'
import { FiAward, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'

const ScoreCircle = ({ score }) => {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getScoreColor = (score) => {
    if (score >= 85) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', stroke: '#10b981' }
    if (score >= 75) return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', stroke: '#3b82f6' }
    if (score >= 65) return { text: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30', stroke: '#f59e0b' }
    return { text: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/30', stroke: '#f43f5e' }
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return { label: 'Excellent', icon: <FiAward className="w-5 h-5" /> }
    if (score >= 80) return { label: 'Great', icon: <FiTrendingUp className="w-5 h-5" /> }
    if (score >= 70) return { label: 'Good', icon: <FiCheckCircle className="w-5 h-5" /> }
    return { label: 'Needs Work', icon: null }
  }

  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <svg width="160" height="160" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#27272a"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color.stroke}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          className="drop-shadow-lg"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`text-4xl font-bold ${color.text} mb-1`}
          >
            {score}
          </motion.div>
          <div className="text-sm text-zinc-400">ATS Score</div>
          
        </div>
      </div>
          {/* Score label */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full ${color.bg} ${color.border} border text-sm ${color.text}`}
          >
            {label.icon}
            <span>{label.label}</span>
          </motion.div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 to-teal-500/0 rounded-full blur-xl group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
    </motion.div>
  )
}

export default ScoreCircle