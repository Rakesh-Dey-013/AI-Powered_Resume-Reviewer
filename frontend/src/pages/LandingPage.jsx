import { motion } from 'framer-motion'
import { FiUpload, FiSearch, FiBarChart2, FiCheckCircle, FiTarget, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi'
import { FaRobot, FaChartLine, FaMagic } from 'react-icons/fa'
import { SiTrustpilot } from 'react-icons/si'
import { RiSparklingFill } from "react-icons/ri";
import FileUpload from '../components/FileUpload'

const LandingPage = ({ onUploadComplete }) => {
  const features = [
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Beat Applicant Tracking Systems with keyword optimization",
      color: "from-emerald-500 to-teal-500",
      hoverColor: "hover:shadow-emerald-500/10"
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Skill Gap Analysis",
      description: "Identify missing skills for your target role",
      color: "from-violet-500 to-purple-500",
      hoverColor: "hover:shadow-emerald-500/10"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Professional Feedback",
      description: "AI-powered comprehensive resume review",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:shadow-emerald-500/10"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Upload Resume",
      description: "Drag & drop your PDF or DOCX file",
      icon: <FiUpload className="w-6 h-6" />,
      hoverIcon: "hover:rotate-12"
    },
    {
      number: "02",
      title: "Enter Details",
      description: "Specify target role & experience level",
      icon: <FiTarget className="w-6 h-6" />,
      hoverIcon: "hover:scale-110"
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive AI-powered analysis & score",
      icon: <RiSparklingFill className="w-6 h-6" />,
      hoverIcon: "hover:animate-pulse"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-zinc-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000 hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500 hover:scale-150 transition-transform duration-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] hover:bg-size-[60px_60px] transition-all duration-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 sm:py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-8 hover:border-emerald-500/40 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FaRobot className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 group-hover:animate-pulse transition-colors" />
              <span className="text-sm font-medium bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300 transition-all">
                AI-Powered Resume Review
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 font-mono">
              <span className="bg-linear-to-r from-white via-white to-white bg-clip-text text-transparent hover:from-emerald-200 hover:via-violet-200 hover:to-blue-200 transition-all duration-500">
                Elevate Your
              </span>
              <br />
              <span className="bg-linear-to-r from-emerald-400 via-violet-400 to-blue-400 bg-clip-text text-transparent hover:from-emerald-300 hover:via-violet-300 hover:to-blue-300 transition-all duration-500">
                Career Journey
              </span>
            </h1>
            
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed group font-mono">
              Get instant{" "}
              <span className="text-emerald-300 font-semibold group-hover:text-emerald-200 transition-colors">AI-powered feedback</span>{" "}
              to optimize your resume, 
              beat ATS systems, and{" "}
              <span className="text-violet-300 font-semibold group-hover:text-violet-200 transition-colors">land your dream job</span> faster.
            </p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <button
                onClick={() => document.querySelector('#upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 rounded-xl font-semibold text-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <RiSparklingFill className="w-5 h-5 group-hover:animate-spin transition-transform" />
                  Start Free Analysis
                  <FiArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </button>
              
              {/* Trust badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-400 transition-colors">
                <SiTrustpilot className="w-4 h-4" />
                <span>Trusted by 10,000+ professionals</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: "98%", label: "ATS Score Improvement", icon: <FaChartLine />, color: "text-emerald-400" },
              { value: "50+", label: "Skills Analyzed", icon: <FiBarChart2 />, color: "text-violet-400" },
              { value: "24/7", label: "Instant Feedback", icon: <FaMagic />, color: "text-blue-400" },
              { value: "4.9★", label: "User Rating", icon: <FiAward />, color: "text-amber-400" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="group glass-card p-6 text-center backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-zinc-800/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-4 group-hover:border-emerald-500/40 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all">
                  <div className={`${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-12 group">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:scale-105 transition-transform inline-block">
                How It Works
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto group-hover:text-zinc-300 transition-colors">
                Three simple steps to transform your resume
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Connection line with hover effect */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 right-0 w-full h-0.5 bg-linear-to-r from-emerald-500/20 to-violet-500/20 translate-x-1/2 group-hover:from-emerald-500/40 group-hover:to-violet-500/40 transition-all"></div>
                  )}
                  
                  <div className="glass-card p-8 h-full hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-300"></div>
                        <div className="relative w-14 h-14 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl group-hover:from-emerald-400 group-hover:to-teal-400 transition-all">
                          {step.number}
                        </div>
                      </div>
                      <div className={`text-2xl text-emerald-400 ${step.hoverIcon} transition-transform duration-300`}>
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors">{step.title}</h3>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{step.description}</p>
                    
                    {/* Hidden arrow on hover */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-emerald-400 text-sm">
                        <FiArrowRight className="w-4 h-4 mr-2" />
                        <span>Click to start</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center mb-12 group">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:scale-105 transition-transform inline-block">
                Why Choose AI Resume Reviewer?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto group-hover:text-zinc-300 transition-colors">
                Advanced features powered by cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`glass-card p-8 border border-zinc-700/50 hover:border-emerald-500/30 transition-all duration-300 group-hover:-translate-y-1 ${feature.hoverColor} hover:shadow-xl`}>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <div className="text-white group-hover:animate-pulse">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors">{feature.title}</h3>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{feature.description}</p>
                    
                    {/* Hidden feature highlight */}
                    <div className="mt-6 pt-6 border-t border-zinc-700/50 group-hover:border-emerald-500/30 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center text-sm text-emerald-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
                        <span>AI-powered insights</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upload Section */}
          <div id="upload-section">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card p-8 md:p-12 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6 hover:border-violet-500/40 hover:from-violet-500/20 hover:to-purple-500/20 transition-all group">
                    <FiUsers className="w-4 h-4 text-violet-400 group-hover:text-violet-300 group-hover:animate-bounce transition-all" />
                    <span className="text-sm font-medium bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-purple-300 transition-all">
                      Trusted by 10,000+ Job Seekers
                    </span>
                  </div>
                  <br />
                  <h2 className="text-3xl font-bold text-white mb-4 hover:scale-105 transition-transform inline-block">
                    Upload Your Resume
                  </h2>
                  <p className="text-zinc-400 hover:text-zinc-300 transition-colors">
                    Get started with your free AI resume analysis today
                  </p>
                </div>
                
                <FileUpload onUploadComplete={onUploadComplete} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-800/50 py-8 text-center hover:border-zinc-700/50 transition-colors">
          <div className="container mx-auto px-4">
            <p className="text-zinc-400 hover:text-zinc-300 transition-colors">
              Built by 
              <a href="https://github.com/Rakesh-Dey-013" target='_blank' className='text-blue-500'> Rakesh </a>
              with ❤️ for job seekers worldwide • AI Resume Reviewer © 2026
            </p>
            <p className="text-zinc-500 text-sm mt-2 hover:text-zinc-400 transition-colors">
              Powered by Groq AI • Modern UI with Glass Morphism
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage