import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiTrendingUp } from 'react-icons/fi'

const JobInput = ({ onSubmit, isLoading, initialJobRole = '', initialExperience = 'Mid' }) => {
  const [jobRole, setJobRole] = useState(initialJobRole)
  const [experienceLevel, setExperienceLevel] = useState(initialExperience)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (jobRole.trim()) {
      onSubmit({ jobRole: jobRole.trim(), experienceLevel })
    }
  }

  return (
    <motion.div 
      className="card max-w-2xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-900/20 rounded-full mb-4">
          <FiBriefcase className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Target Job Details</h2>
        <p className="text-gray-400">Tell us about the role you're applying for</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Role Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Desired Job Role *
          </label>
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
              className="input-field pl-10"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Experience Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Fresher', 'Mid', 'Senior'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setExperienceLevel(level)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all ${
                  experienceLevel === level
                    ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
                disabled={isLoading}
              >
                <FiTrendingUp className="w-4 h-4" />
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!jobRole.trim() || isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Analyzing...
            </div>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default JobInput