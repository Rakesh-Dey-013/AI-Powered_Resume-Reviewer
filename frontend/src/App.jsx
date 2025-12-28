import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import ReviewPage from './pages/ReviewPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [uploadedResume, setUploadedResume] = useState(null)

  const handleUploadComplete = (resumeData) => {
    setUploadedResume(resumeData)
    setCurrentPage('review')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
    setUploadedResume(null)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-950">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onUploadComplete={handleUploadComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReviewPage 
              uploadedResume={uploadedResume}
              onBack={handleBackToHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App