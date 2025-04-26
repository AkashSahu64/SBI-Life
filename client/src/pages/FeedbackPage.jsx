import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const FeedbackPage = () => {
  const { policyId } = useParams()
  const navigate = useNavigate()
  const [policy, setPolicy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showConfetti, setShowConfetti] = useState(true)
  const [recommendations, setRecommendations] = useState([])
  
  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock policy data
      setPolicy({
        id: policyId,
        name: 'SmartLife Term Shield Pro',
        type: 'Term Life',
        coverage: '₹1,50,00,000',
        premium: '₹15,800',
        policyNumber: 'SBI-LIFE-' + Math.floor(10000 + Math.random() * 90000),
        startDate: new Date().toISOString().split('T')[0],
        color: 'primary',
      })
      
      // Mock add-on recommendations
      setRecommendations([
        {
          id: 'REC-1',
          name: 'Critical Illness Rider',
          description: 'Add protection against 36 critical illnesses with a lump sum payout on diagnosis.',
          premium: '₹4,200',
          color: 'accent',
        },
        {
          id: 'REC-2',
          name: 'Family Income Benefit',
          description: 'Provides monthly income to your family in addition to lump sum payment.',
          premium: '₹3,800',
          color: 'primary',
        },
        {
          id: 'REC-3',
          name: 'Premium Waiver Benefit',
          description: 'Waives off future premiums in case of disability while keeping the policy active.',
          premium: '₹1,800',
          color: 'warning',
        },
      ])
      
      setLoading(false)
    }
    
    fetchData()
    
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [policyId])
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  
  // Item variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }
  
  // Confetti elements
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 10 + 5
          const color = [
            '#1E88E5', // primary
            '#00BFA6', // accent
            '#FF9800', // warning
            '#FFFFFF', // white
          ][Math.floor(Math.random() * 4)]
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                top: `${Math.random() * 20 - 20}%`,
                left: `${Math.random() * 100}%`,
                opacity: 1,
              }}
              animate={{
                top: `${100 + Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: 'easeOut',
                delay: Math.random() * 2,
              }}
              style={{
                width: size,
                height: size,
                backgroundColor: color,
              }}
            />
          )
        })}
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* Confetti animation */}
      {showConfetti && <Confetti />}
      
      {/* Success message */}
      <motion.div
        variants={itemVariants}
        className="text-center space-y-4"
      >
        <div className="inline-flex h-24 w-24 rounded-full bg-primary-500/20 items-center justify-center mx-auto">
          <svg
            className="h-12 w-12 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white">Congratulations!</h1>
        <p className="text-xl text-gray-300">
          Your policy has been successfully purchased
        </p>
      </motion.div>
      
      {/* Policy details */}
      <motion.div variants={itemVariants} className="card border-l-4 border-l-primary-500">
        <h2 className="text-xl font-bold text-white mb-4">Policy Details</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-400">Policy Name</p>
            <p className="text-white font-medium">{policy.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Policy Number</p>
            <p className="text-white font-medium">{policy.policyNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Coverage</p>
            <p className="text-white font-medium">{policy.coverage}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Premium</p>
            <p className="text-white font-medium">{policy.premium}/year</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-400">Policy Type</p>
            <p className="text-white">{policy.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Start Date</p>
            <p className="text-white">
              {new Date(policy.startDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
              Active
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => { /* Open PDF */ }}
            className="btn-outline"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Policy Document
          </button>
        </div>
      </motion.div>
      
      {/* Next steps */}
      <motion.div variants={itemVariants} className="card">
        <h2 className="text-xl font-bold text-white mb-4">Next Steps</h2>
        
        <ul className="space-y-4">
          <li className="flex">
            <div className="flex-shrink-0">
              <span className="flex h-8 w-8 rounded-full bg-primary-500/20 text-primary-500 items-center justify-center text-lg font-medium">
                1
              </span>
            </div>
            <div className="ml-4">
              <p className="text-white font-medium">Complete your profile</p>
              <p className="text-sm text-gray-400 mt-1">
                Update your health information and nominee details for faster claim processing.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex-shrink-0">
              <span className="flex h-8 w-8 rounded-full bg-primary-500/20 text-primary-500 items-center justify-center text-lg font-medium">
                2
              </span>
            </div>
            <div className="ml-4">
              <p className="text-white font-medium">Set up automatic payments</p>
              <p className="text-sm text-gray-400 mt-1">
                Never miss a premium payment by setting up auto-debit from your account.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex-shrink-0">
              <span className="flex h-8 w-8 rounded-full bg-primary-500/20 text-primary-500 items-center justify-center text-lg font-medium">
                3
              </span>
            </div>
            <div className="ml-4">
              <p className="text-white font-medium">Download the mobile app</p>
              <p className="text-sm text-gray-400 mt-1">
                Access your policy details, make claims, and get support on the go.
              </p>
            </div>
          </li>
        </ul>
      </motion.div>
      
      {/* Recommendations */}
      <motion.div variants={itemVariants} className="card">
        <h2 className="text-xl font-bold text-white mb-4">Recommended Add-ons</h2>
        <p className="text-gray-400 mb-6">
          Enhance your protection with these personalized add-ons
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border border-${rec.color}-500/30 bg-${rec.color}-500/10`}
            >
              <h3 className="font-medium text-white mb-2">{rec.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{rec.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-white">{rec.premium}/year</span>
                <button className={`btn-sm bg-${rec.color}-500 hover:bg-${rec.color}-600 text-white`}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Feedback form */}
      <motion.div variants={itemVariants} className="card">
        <h2 className="text-xl font-bold text-white mb-4">Your Feedback</h2>
        <p className="text-gray-400 mb-6">
          Help us improve your experience with SmartLife AI
        </p>
        
        <div className="mb-6">
          <label className="text-gray-300 block mb-2">
            How satisfied are you with the purchase experience?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
              >
                <svg
                  className={`h-8 w-8 ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-600'
                  } transition-colors`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="feedback" className="text-gray-300 block mb-2">
            Share your thoughts (optional)
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell us what you liked or how we can improve..."
          ></textarea>
        </div>
        
        <button className="btn-primary">
          Submit Feedback
        </button>
      </motion.div>
      
      {/* Referral card */}
      <motion.div
        variants={itemVariants}
        className="card bg-gradient-to-r from-primary-900/80 to-accent-900/80 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">
            Refer a Friend
          </h3>
          <p className="text-gray-300 mb-6">
            Know someone who could benefit from SmartLife AI? Refer them and both get one month of premium free!
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Enter friend's email"
              className="form-input sm:flex-1"
            />
            <button className="btn-accent">
              Send Invitation
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FeedbackPage