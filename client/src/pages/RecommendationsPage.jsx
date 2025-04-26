import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const RecommendationsPage = () => {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPolicies, setSelectedPolicies] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  
  useEffect(() => {
    // Simulate API fetch
    const fetchPolicies = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock data
      setPolicies([
        {
          id: 'POL-REC-1',
          name: 'SmartLife Term Shield Pro',
          type: 'Term Life',
          coverage: '₹1,50,00,000',
          premium: '₹15,800',
          term: '30 years',
          returnOfPremium: 'No',
          criticalIllnessRider: 'Optional',
          accidentalDeathBenefit: 'Yes',
          score: 97,
          highlights: [
            'Highest coverage at lowest premium',
            'Free virtual health checkups',
            'No medical tests up to age 40',
          ],
          color: 'primary',
        },
        {
          id: 'POL-REC-2',
          name: 'SmartLife Term Guard Plus',
          type: 'Term Life',
          coverage: '₹1,00,00,000',
          premium: '₹12,600',
          term: '25 years',
          returnOfPremium: 'No',
          criticalIllnessRider: 'Included',
          accidentalDeathBenefit: 'Yes',
          score: 92,
          highlights: [
            'Built-in critical illness coverage',
            'Premium waiver on disability',
            'Covers 35 critical illnesses',
          ],
          color: 'accent',
        },
        {
          id: 'POL-REC-3',
          name: 'SmartLife TROP Advantage',
          type: 'Term with Return of Premium',
          coverage: '₹75,00,000',
          premium: '₹24,950',
          term: '30 years',
          returnOfPremium: 'Yes',
          criticalIllnessRider: 'Optional',
          accidentalDeathBenefit: 'Yes',
          score: 88,
          highlights: [
            'Get all premiums back at term end',
            'Guaranteed addition of 5% sum assured',
            'Tax benefits under Sec 80C and 10(10D)',
          ],
          color: 'warning',
        },
        {
          id: 'POL-REC-4',
          name: 'SmartLife Health Ultra',
          type: 'Health Insurance',
          coverage: '₹25,00,000',
          premium: '₹18,400',
          term: '1 year (renewable)',
          hospitalCashBenefit: 'Yes',
          noClaimBonus: '50% increase in sum insured',
          preExistingDiseasesCover: 'After 2 years',
          score: 94,
          highlights: [
            '5000+ network hospitals',
            'No room rent capping',
            'Coverage for advanced treatments',
          ],
          color: 'success',
        },
      ])
      
      setLoading(false)
    }
    
    fetchPolicies()
  }, [])
  
  const togglePolicySelection = (policyId) => {
    setSelectedPolicies((prev) => {
      if (prev.includes(policyId)) {
        return prev.filter((id) => id !== policyId)
      } else {
        // Limit to 3 selections
        if (prev.length >= 3) {
          return [...prev.slice(1), policyId]
        }
        return [...prev, policyId]
      }
    })
  }
  
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
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  // Get selected policy objects
  const selectedPolicyObjects = policies.filter((policy) =>
    selectedPolicies.includes(policy.id)
  )
  
  // Determine all possible comparison keys across selected policies
  const getComparisonKeys = () => {
    const basicKeys = ['coverage', 'premium', 'term']
    
    // Gather all unique keys from selected policies
    const allKeys = new Set(basicKeys)
    selectedPolicyObjects.forEach((policy) => {
      Object.keys(policy).forEach((key) => {
        // Exclude certain keys
        if (
          !['id', 'name', 'type', 'score', 'highlights', 'color'].includes(key)
        ) {
          allKeys.add(key)
        }
      })
    })
    
    return Array.from(allKeys)
  }
  
  // Format policy values for display
  const formatValue = (key, value) => {
    if (value === undefined || value === null) {
      return '-'
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    return value
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Personalized Recommendations
        </h1>
        <p className="text-gray-400 mt-1">
          AI-powered insurance plans tailored for your needs
        </p>
      </motion.div>
      
      {/* Comparison controls */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-3">
            {selectedPolicies.length} of 3 selected
          </span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i < selectedPolicies.length
                    ? 'bg-primary-500'
                    : 'bg-dark-700'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setShowComparison(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              !showComparison
                ? 'bg-primary-500 text-white'
                : 'bg-dark-700 text-gray-300'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setShowComparison(true)}
            disabled={selectedPolicies.length < 2}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              showComparison
                ? 'bg-primary-500 text-white'
                : selectedPolicies.length < 2
                ? 'bg-dark-700 text-gray-500 cursor-not-allowed'
                : 'bg-dark-700 text-gray-300'
            }`}
          >
            Compare ({selectedPolicies.length})
          </button>
        </div>
      </motion.div>
      
      {/* Card view */}
      {!showComparison && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {policies.map((policy) => (
            <motion.div
              key={policy.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`card border-l-4 border-l-${policy.color}-500 relative`}
            >
              {/* AI score badge */}
              <div className="absolute top-4 right-4 flex items-center">
                <div className={`h-8 w-8 rounded-full bg-${policy.color}-500 flex items-center justify-center text-white text-sm font-bold`}>
                  {policy.score}
                </div>
                <span className="ml-1 text-xs text-gray-400">AI Score</span>
              </div>
              
              {/* Selection checkbox */}
              <div className="absolute top-4 left-4">
                <input
                  type="checkbox"
                  id={`select-${policy.id}`}
                  checked={selectedPolicies.includes(policy.id)}
                  onChange={() => togglePolicySelection(policy.id)}
                  className="sr-only"
                />
                <label
                  htmlFor={`select-${policy.id}`}
                  className={`h-6 w-6 rounded border ${
                    selectedPolicies.includes(policy.id)
                      ? `bg-${policy.color}-500 border-${policy.color}-500 text-white`
                      : 'bg-dark-600 border-dark-500'
                  } flex items-center justify-center cursor-pointer`}
                >
                  {selectedPolicies.includes(policy.id) && (
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </label>
              </div>
              
              <div className="mt-8">
                <div className="mb-4">
                  <span className="text-xs text-gray-400">{policy.type}</span>
                  <h3 className="text-xl font-bold text-white">{policy.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-400">Coverage</p>
                    <p className="text-white font-medium">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Premium</p>
                    <p className="text-white font-medium">{policy.premium}/year</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Term</p>
                    <p className="text-white font-medium">{policy.term}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Return of Premium</p>
                    <p className="text-white font-medium">
                      {policy.returnOfPremium || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-white mb-2">Highlights</p>
                  <ul className="space-y-2">
                    {policy.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className={`h-5 w-5 text-${policy.color}-500 mr-2 flex-shrink-0`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-3">
                  <Link
                    to={`/policy/${policy.id}`}
                    className={`flex-1 btn bg-${policy.color}-500 hover:bg-${policy.color}-600 text-white`}
                  >
                    View Details
                  </Link>
                  <button className="btn-outline flex-1">Save for Later</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Comparison view */}
      {showComparison && (
        <motion.div
          variants={itemVariants}
          className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden"
        >
          <div className="grid" style={{ gridTemplateColumns: `220px repeat(${selectedPolicyObjects.length}, 1fr)` }}>
            {/* Header row */}
            <div className="bg-dark-700 p-4 font-medium text-white border-b border-dark-600">
              Features
            </div>
            
            {selectedPolicyObjects.map((policy) => (
              <div 
                key={policy.id}
                className="bg-dark-700 p-4 font-medium text-white border-b border-dark-600 flex flex-col items-center text-center"
              >
                <span className={`inline-block w-2 h-2 rounded-full bg-${policy.color}-500 mb-2`}></span>
                {policy.name}
              </div>
            ))}
            
            {/* Comparison rows */}
            {getComparisonKeys().map((key) => (
              <React.Fragment key={key}>
                <div className="p-4 border-b border-dark-700 bg-dark-800 text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                
                {selectedPolicyObjects.map((policy) => (
                  <div 
                    key={`${policy.id}-${key}`}
                    className="p-4 border-b border-dark-700 text-center text-white"
                  >
                    {formatValue(key, policy[key])}
                  </div>
                ))}
              </React.Fragment>
            ))}
            
            {/* AI score row */}
            <div className="p-4 border-b border-dark-700 bg-dark-800 text-gray-300">
              AI Score
            </div>
            
            {selectedPolicyObjects.map((policy) => (
              <div 
                key={`${policy.id}-score`}
                className="p-4 border-b border-dark-700 text-center"
              >
                <span className={`inline-block px-2 py-1 rounded-full bg-${policy.color}-500/20 text-${policy.color}-500 font-medium`}>
                  {policy.score}/100
                </span>
              </div>
            ))}
            
            {/* Action buttons */}
            <div className="p-4 bg-dark-800 text-gray-300">
              Actions
            </div>
            
            {selectedPolicyObjects.map((policy) => (
              <div 
                key={`${policy.id}-actions`}
                className="p-4 flex justify-center"
              >
                <Link
                  to={`/policy/${policy.id}`}
                  className={`btn bg-${policy.color}-500 hover:bg-${policy.color}-600 text-white`}
                >
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RecommendationsPage