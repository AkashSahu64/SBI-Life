import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login } = useAuth()
  const { addNotification } = useUI()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      let credentials = { password }
      
      if (activeTab === 'email') {
        credentials.email = email
      } else if (activeTab === 'phone') {
        credentials.phone = phone
      } else if (activeTab === 'policy') {
        credentials.policyNumber = policyNumber
      }
      
      await login(credentials, activeTab)
      addNotification({
        title: 'Welcome back!',
        message: 'You have successfully logged in.',
        type: 'success',
      })
      navigate('/dashboard')
    } catch (error) {
      addNotification({
        title: 'Login failed',
        message: error.message || 'Something went wrong. Please try again.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }
  
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-primary-500">SmartLife</span> AI
            </h1>
            <p className="text-gray-400">
              AI-powered insurance personalization platform
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="bg-dark-800 rounded-xl border border-dark-700 shadow-lg overflow-hidden"
          >
            {/* Tab navigation */}
            <div className="flex border-b border-dark-700">
              <button
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'email'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('email')}
              >
                Email
              </button>
              <button
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'phone'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('phone')}
              >
                Phone
              </button>
              <button
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'policy'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('policy')}
              >
                Policy Number
              </button>
            </div>
            
            {/* Login form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Dynamic input based on selected tab */}
              {activeTab === 'email' && (
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              )}
              
              {activeTab === 'phone' && (
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              )}
              
              {activeTab === 'policy' && (
                <div>
                  <label htmlFor="policy" className="form-label">
                    Policy Number
                  </label>
                  <input
                    id="policy"
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className="form-input"
                    placeholder="SBI-LIFE-1234"
                    required
                  />
                </div>
              )}
              
              {/* Password field (common for all) */}
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-primary-500 hover:text-primary-400"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  'Sign In'
                )}
              </button>
              
              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-dark-800 text-sm text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              
              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="btn-outline flex justify-center items-center"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn-outline flex justify-center items-center"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn-outline flex justify-center items-center"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10c5.523 0 10-4.478 10-10S15.523 0 10 0zm-1.376 13.367c-2.007 0-3.64-1.632-3.64-3.64s1.633-3.64 3.64-3.64c.98 0 1.85.4 2.49 1.04l-1.002 1.002c-.374-.374-.891-.586-1.488-.586-1.207 0-2.186.979-2.186 2.184 0 1.207.979 2.186 2.186 2.186.652 0 1.222-.31 1.594-.79.29-.366.457-.766.495-1.174h-2.09v-1.36h3.424c.046.23.071.459.071.691 0 .807-.227 1.503-.676 2.042-.598.717-1.503 1.045-2.318 1.045zm5.98-2.845h-1.167v1.167h-1.167v-1.167h-1.166v-1.166h1.166v-1.167h1.167v1.167h1.167v1.166z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              
              {/* Register link */}
              <div className="text-center text-sm">
                <span className="text-gray-400">Don't have an account? </span>
                <a href="#" className="text-primary-500 hover:text-primary-400">
                  Create one
                </a>
              </div>
            </form>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="mt-6 text-center text-xs text-gray-500"
          >
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Right side - Features/Illustrations */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-dark-800 to-dark-900 p-10 items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Personalized insurance, just for you
          </h2>
          <p className="text-gray-300 mb-8">
            SmartLife AI uses cutting-edge artificial intelligence to analyze your
            profile and recommend the perfect insurance plans tailored to your
            specific needs and lifestyle.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
              <svg
                className="h-10 w-10 text-primary-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">
                Smart Protection
              </h3>
              <p className="text-sm text-gray-400">
                AI-powered risk assessment for optimal coverage
              </p>
            </div>
            
            <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
              <svg
                className="h-10 w-10 text-accent-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">
                Cost Efficiency
              </h3>
              <p className="text-sm text-gray-400">
                Save up to 30% with personalized plan recommendations
              </p>
            </div>
            
            <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
              <svg
                className="h-10 w-10 text-primary-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">
                Virtual Assistance
              </h3>
              <p className="text-sm text-gray-400">
                24/7 AI assistant to help with queries and claims
              </p>
            </div>
            
            <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
              <svg
                className="h-10 w-10 text-accent-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">
                Paperless Process
              </h3>
              <p className="text-sm text-gray-400">
                Digital-first experience from quotes to claims
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <button
              className="btn-accent px-8 py-3"
              onClick={() => document.getElementById('email').focus()}
            >
              Get Started Today
            </button>
          </div>
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage