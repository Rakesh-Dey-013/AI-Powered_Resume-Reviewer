import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiFileText, FiX } from 'react-icons/fi'
import axios from 'axios'

const FileUpload = ({ onUploadComplete, onBack }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or DOCX file')
        return
      }
      
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 5MB')
        return
      }
      
      setFile(selectedFile)
      setError('')
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
          text: response.data.text
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
  }

  return (
    <motion.div 
      className="card max-w-2xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/20 rounded-full mb-4">
          <FiFileText className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
        <p className="text-gray-400">Supported formats: PDF, DOCX (Max 5MB)</p>
      </div>

      <div className="space-y-6">
        {/* File upload area */}
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={uploading}
          />
          
          {!file ? (
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <FiUpload className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-lg font-medium text-white mb-2">Choose a file</p>
                <p className="text-sm text-gray-400">or drag and drop here</p>
              </div>
            </label>
          ) : (
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FiFileText className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="font-medium text-white">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                disabled={uploading}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-700 rounded-lg p-4"
          >
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          {onBack && (
            <button
              onClick={onBack}
              disabled={uploading}
              className="btn-secondary flex-1"
            >
              Back
            </button>
          )}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="btn-primary flex-1"
          >
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              'Upload & Continue'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default FileUpload