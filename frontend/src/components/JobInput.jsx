import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiTrendingUp, FiZap, FiChevronRight, FiInfo } from 'react-icons/fi'
import { FaChartLine } from 'react-icons/fa'

const JobInput = ({ onSubmit, isLoading, initialJobRole = '', initialExperience = 'Mid' }) => {
  const [jobRole, setJobRole] = useState(initialJobRole)
  const [experienceLevel, setExperienceLevel] = useState(initialExperience)

  const experienceLevels = [
    { id: 'Fresher', label: 'Fresher', description: '0-2 years experience', color: 'from-blue-500 to-cyan-500' },
    { id: 'Mid', label: 'Mid Level', description: '3-7 years experience', color: 'from-emerald-500 to-teal-500' },
    { id: 'Senior', label: 'Senior', description: '8+ years experience', color: 'from-violet-500 to-purple-500' }
  ]

  const popularRoles = [
    'Software Developer', 'Frontend Developer', 'Backend Developer',
    'Full Stack Developer', 'Data Scientist', 'Product Manager',
    'UX Designer', 'DevOps Engineer', 'Cloud Architect'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (jobRole.trim()) {
      onSubmit({ jobRole: jobRole.trim(), experienceLevel })
    }
  }

  const handleRoleClick = (role) => {
    setJobRole(role)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Job Role Input */}
        <div>
          <label className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
            <FiBriefcase className="w-4 h-4 text-emerald-400" />
            Desired Job Role *
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors">
              <FiZap className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
              className="input-field pl-10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all"
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Popular Roles */}
          <div className="mt-4">
            <p className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
              <FiInfo className="w-3 h-3" />
              Popular roles:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleClick(role)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    jobRole === role
                      ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-800/40 border border-zinc-700/50 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-300 hover:bg-emerald-500/10'
                  }`}
                  disabled={isLoading}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4 text-violet-400" />
            Experience Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {experienceLevels.map((level) => (
              <motion.button
                key={level.id}
                type="button"
                onClick={() => setExperienceLevel(level.id)}
                className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                  experienceLevel === level.id
                    ? `bg-linear-to-br ${level.color} bg-opacity-20 border-transparent`
                    : 'glass-card hover:border-emerald-500/30'
                }`}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {experienceLevel === level.id && (
                  <div className={`absolute inset-0 bg-linear-to-br ${level.color} rounded-xl blur opacity-20`}></div>
                )}
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${
                    experienceLevel === level.id
                      ? 'bg-white/20'
                      : 'bg-zinc-800/50'
                  }`}>
                    <FaChartLine className={`w-5 h-5 ${
                      experienceLevel === level.id ? 'text-white' : 'text-zinc-400'
                    } group-hover:text-emerald-300 transition-colors`} />
                  </div>
                  
                  <div className="text-left">
                    <div className={`font-semibold mb-1 ${
                      experienceLevel === level.id ? 'text-white' : 'text-zinc-300'
                    } group-hover:text-white transition-colors`}>
                      {level.label}
                    </div>
                    <div className={`text-sm ${
                      experienceLevel === level.id ? 'text-white/80' : 'text-zinc-500'
                    } group-hover:text-zinc-300 transition-colors`}>
                      {level.description}
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  {experienceLevel === level.id && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!jobRole.trim() || isLoading}
          className="group relative w-full py-4 rounded-xl font-semibold text-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Analyze Resume
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-4 bg-white animate-pulse"></div>
                </span>
              </>
            )}
          </span>
        </motion.button>
      </form>

      {/* Tips */}
      <motion.div 
        className="glass-card p-6 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300 group/tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2 group-hover/tips:text-emerald-300 transition-colors">
          <FiInfo className="w-4 h-4 text-emerald-400 group-hover/tips:animate-pulse" />
          Tips for Better Analysis
        </h4>
        <ul className="space-y-2">
          {[
            "Be specific about your target role for more accurate feedback",
            "Select the experience level that matches your career stage",
            "Include relevant keywords from job descriptions you're targeting",
            "Consider future roles you want to grow into"
          ].map((tip, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 group-hover/item:scale-150 group-hover/item:animate-pulse transition-all"></div>
              <span className="text-sm text-zinc-400 group-hover/item:text-zinc-300 transition-colors">
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default JobInput