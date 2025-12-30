import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiAlertCircle, FiChevronRight, FiUpload, FiTarget, FiBarChart2 } from 'react-icons/fi'
import { FaRobot, FaMagic } from 'react-icons/fa'
import FileUpload from '../components/FileUpload'
import JobInput from '../components/JobInput'
import LoadingSpinner from '../components/LoadingSpinner'
import ResultsDisplay from '../components/ResultsDisplay'
import axios from 'axios'

const ReviewPage = ({ uploadedResume, onBack }) => {
  const [step, setStep] = useState(uploadedResume ? 'job-input' : 'upload')
  const [jobDetails, setJobDetails] = useState({})
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJobSubmit = async (details) => {
    setJobDetails(details)
    setLoading(true)
    setError('')

    try {
      console.log('Submitting for analysis:', {
        jobRole: details.jobRole,
        experienceLevel: details.experienceLevel,
        resumeLength: uploadedResume?.text?.length || 0
      });

      const response = await axios.post('/api/analyze', {
        resumeText: uploadedResume.text,
        jobRole: details.jobRole,
        experienceLevel: details.experienceLevel
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Analysis response:', response.data);

      if (response.data.success) {
        setAnalysis(response.data.feedback)
        setStep('results')
      } else {
        setError(response.data.message || 'Analysis failed. Please try again.')
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        'Failed to analyze resume. Please check your connection and try again.'
      );
    } finally {
      setLoading(false)
    }
  }

  const handleNewReview = () => {
    setStep('upload')
    setAnalysis(null)
    setJobDetails({})
    setError('')
  }

  const handleUploadComplete = (resumeData) => {
    setStep('job-input')
  }

  const steps = [
    { id: 'upload', label: 'Upload', icon: <FiUpload className="w-4 h-4" /> },
    { id: 'job-input', label: 'Details', icon: <FiTarget className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <FiBarChart2 className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-zinc-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/40 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    step === s.id 
                      ? 'bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-300' 
                      : 'bg-zinc-800/40 border border-zinc-700/50 text-zinc-500'
                  } ${index > 0 ? 'ml-2' : ''}`}
                >
                  <div className={`p-1.5 rounded ${
                    step === s.id 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-zinc-700/50 text-zinc-500'
                  }`}>
                    {s.icon}
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="mx-2">
                    <FiChevronRight className="w-4 h-4 text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-red-500/30 bg-red-500/5 p-4 mb-6 hover:border-red-500/50 hover:bg-red-500/10 transition-all group/error"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0 group-hover/error:animate-pulse" />
              <div>
                <p className="font-medium text-red-300 mb-1 group-hover/error:text-red-200">Analysis Error</p>
                <p className="text-red-200 text-sm group-hover/error:text-red-100">{error}</p>
                <p className="text-red-300 text-xs mt-2">
                  Tip: The app will use demo data if AI analysis fails. You can still proceed.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card p-8 md:p-12 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6 group">
                    <FaRobot className="w-4 h-4 text-emerald-400 group-hover:animate-pulse" />
                    <span className="text-sm font-medium bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300 transition-all">
                      Step 1: Upload Resume
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 hover:scale-105 transition-transform inline-block">
                    Upload Your Resume
                  </h2>
                  <p className="text-zinc-400 hover:text-zinc-300 transition-colors">
                    Start your AI-powered resume analysis journey
                  </p>
                </div>
                
                <FileUpload 
                  onUploadComplete={handleUploadComplete} 
                  onBack={onBack}
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Job Input */}
          {step === 'job-input' && !loading && (
            <motion.div
              key="job-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-3xl mx-auto"
            >
              {uploadedResume && (
                <motion.div 
                  className="glass-card p-6 mb-6 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300 group/resume"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover/resume:bg-emerald-500/20 transition-all">
                        <FiUpload className="w-5 h-5 text-emerald-400 group-hover/resume:text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400 mb-1">Uploaded Resume</p>
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-white group-hover/resume:text-emerald-300 transition-colors truncate max-w-50">
                            {uploadedResume.fileName}
                          </p>
                          <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Ready
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('upload')}
                      className="text-sm px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                    >
                      Change
                    </button>
                  </div>
                  
                  {uploadedResume.textPreview && (
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 group-hover/resume:border-emerald-500/30 transition-colors">
                      <p className="text-sm text-zinc-400 mb-2 group-hover/resume:text-emerald-400 transition-colors">Preview:</p>
                      <div className="bg-zinc-900/40 rounded-lg p-3 max-h-32 overflow-y-auto">
                        <p className="text-zinc-300 text-sm whitespace-pre-line group-hover/resume:text-zinc-200 transition-colors">
                          {uploadedResume.textPreview}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              <div className="glass-card p-8 md:p-12 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6 group">
                    <FiTarget className="w-4 h-4 text-violet-400 group-hover:animate-pulse" />
                    <span className="text-sm font-medium bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-purple-300 transition-all">
                      Step 2: Job Details
                    </span>
                  </div>
                  <br />
                  <h2 className="text-3xl font-bold text-white mb-4 hover:scale-105 transition-transform inline-block">
                    Target Role & Experience
                  </h2>
                  <p className="text-zinc-400 hover:text-zinc-300 transition-colors">
                    Tell us about the position you're aiming for
                  </p>
                </div>
                
                <JobInput 
                  onSubmit={handleJobSubmit} 
                  isLoading={loading}
                  initialJobRole={jobDetails.jobRole}
                  initialExperience={jobDetails.experienceLevel}
                />
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <LoadingSpinner 
              message={`Analyzing resume for ${jobDetails.jobRole || 'your target role'}...`}
            />
          )}

          {/* Step 3: Results */}
          {step === 'results' && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              <ResultsDisplay 
                feedback={analysis} 
                onNewReview={handleNewReview}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div 
            className="mt-8 glass-card p-4 hover:border-emerald-500/30 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-emerald-400 mb-2 flex items-center gap-2">
              <FaMagic className="w-3 h-3" />
              Debug Info
            </p>
            <div className="text-xs text-zinc-500 space-y-1">
              <p>Step: {step}</p>
              <p>Has Resume: {!!uploadedResume}</p>
              <p>Resume Length: {uploadedResume?.text?.length || 0}</p>
              <p>Job Role: {jobDetails.jobRole || 'Not set'}</p>
              <p>Analysis Data: {analysis ? 'Loaded' : 'Not loaded'}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ReviewPage