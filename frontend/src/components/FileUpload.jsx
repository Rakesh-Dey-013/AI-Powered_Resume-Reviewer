import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiFileText, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi'
import axios from 'axios'

const FileUpload = ({ onUploadComplete, onBack }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileValidation(droppedFile)
    }
  }

  const handleFileValidation = (selectedFile) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOCX file only')
      return false
    }
    
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 5MB')
      return false
    }
    
    setFile(selectedFile)
    setError('')
    return true
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      handleFileValidation(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        onUploadComplete({
          fileName: response.data.fileName,
          text: response.data.text,
          textPreview: response.data.textPreview
        })
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Upload Area */}
      <div 
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
          dragActive 
            ? 'border-emerald-500 bg-emerald-500/5' 
            : file 
            ? 'border-teal-500/30' 
            : 'border-zinc-700 hover:border-zinc-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        {!file ? (
          <div className="p-12 text-center cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-30"></div>
                  <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <FiUpload className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
              
              {/* Text */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop your resume here
                </h3>
                <p className="text-zinc-400 mb-4">
                  Supported formats: PDF, DOCX (Max 5MB)
                </p>
                <button
                  onClick={triggerFileInput}
                  disabled={uploading}
                  className="px-6 py-2 rounded-lg bg-linear-to-r from-zinc-800 to-zinc-900 border border-zinc-700 text-white hover:border-zinc-600 transition-colors"
                >
                  Browse Files
                </button>
              </div>
              
              {/* File Types */}
              <div className="flex flex-wrap justify-center gap-4">
                {['PDF', 'DOCX', 'DOC'].map((type) => (
                  <div key={type} className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <span className="text-sm text-zinc-400">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            className="p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* File Info */}
            <div className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <FiFileText className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{file.name}</h4>
                      <FiCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-sm text-zinc-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  disabled={uploading}
                  className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-zinc-400 hover:text-white" />
                </button>
              </div>
              
              {/* Progress Bar */}
              {uploading && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 text-center">
                    Processing your resume...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-red-500/30 bg-red-500/5 p-4"
        >
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-300 mb-1">Upload Error</p>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Tips */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <FiAlertCircle className="w-4 h-4 text-emerald-400" />
          Tips for Best Results
        </h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
            <span>Ensure your resume is in a standard format (PDF or DOCX)</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
            <span>Make sure text is selectable (not an image PDF)</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
            <span>Include your most recent work experience and skills</span>
          </li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {onBack && (
          <button
            onClick={onBack}
            disabled={uploading}
            className="glass-card flex-1 py-4 rounded-xl font-semibold text-white hover:bg-zinc-800/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back to Home
          </button>
        )}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="group relative flex-1 py-4 rounded-xl font-semibold text-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-3">
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <FiUpload className="w-5 h-5" />
                Upload & Continue
              </>
            )}
          </span>
        </button>
      </div>
    </motion.div>
  )
}

export default FileUpload