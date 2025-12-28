import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
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

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step === 'upload' ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
            <span className={`text-sm ${step === 'upload' ? 'text-blue-400' : 'text-gray-500'}`}>Upload</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step === 'job-input' ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
            <span className={`text-sm ${step === 'job-input' ? 'text-blue-400' : 'text-gray-500'}`}>Details</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step === 'results' ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
            <span className={`text-sm ${step === 'results' ? 'text-blue-400' : 'text-gray-500'}`}>Results</span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-300 mb-1">Analysis Error</p>
              <p className="text-red-200 text-sm">{error}</p>
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
          >
            <FileUpload 
              onUploadComplete={handleUploadComplete} 
              onBack={onBack}
            />
          </motion.div>
        )}

        {/* Step 2: Job Input */}
        {step === 'job-input' && !loading && (
          <motion.div
            key="job-input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {uploadedResume && (
              <div className="card max-w-2xl mx-auto mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Uploaded Resume</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{uploadedResume.fileName}</p>
                        <p className="text-sm text-gray-400">
                          {uploadedResume.text?.length || 0} characters extracted
                        </p>
                      </div>
                      <button
                        onClick={() => setStep('upload')}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Change File
                      </button>
                    </div>
                  </div>
                </div>
                
                {uploadedResume.textPreview && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    <div className="bg-gray-900 rounded p-3 max-h-32 overflow-y-auto">
                      <p className="text-gray-300 text-sm whitespace-pre-line">
                        {uploadedResume.textPreview}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <JobInput 
              onSubmit={handleJobSubmit} 
              isLoading={loading}
              initialJobRole={jobDetails.jobRole}
              initialExperience={jobDetails.experienceLevel}
            />
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
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Debug Info:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Step: {step}</p>
            <p>Has Resume: {!!uploadedResume}</p>
            <p>Resume Length: {uploadedResume?.text?.length || 0}</p>
            <p>Job Role: {jobDetails.jobRole || 'Not set'}</p>
            <p>Analysis Data: {analysis ? 'Loaded' : 'Not loaded'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewPage