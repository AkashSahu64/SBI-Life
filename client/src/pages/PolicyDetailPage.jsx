import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const PolicyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [policy, setPolicy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [coverageAmount, setCoverageAmount] = useState(0)
  const [term, setTerm] = useState(0)
  const [selectedRiders, setSelectedRiders] = useState([])
  const [premium, setPremium] = useState(0)
  
  useEffect(() => {
    // Simulate API fetch
    const fetchPolicy = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock data based on ID
      const mockPolicies = {
        'POL-REC-1': {
          id: 'POL-REC-1',
          name: 'SmartLife Term Shield Pro',
          type: 'Term Life',
          description: 'A comprehensive term life insurance policy designed to provide maximum financial protection for your loved ones at an affordable premium.',
          coverage: 15000000,
          basePremium: 15800,
          term: 30,
          returnOfPremium: false,
          minCoverage: 5000000,
          maxCoverage: 50000000,
          stepSize: 500000,
          minTerm: 10,
          maxTerm: 40,
          availableRiders: [
            {
              id: 'RIDER-CI',
              name: 'Critical Illness Cover',
              description: 'Provides a lump sum payment if diagnosed with any of the 36 covered critical illnesses.',
              premium: 4200,
              isSelected: false,
            },
            {
              id: 'RIDER-TPD',
              name: 'Total & Permanent Disability',
              description: 'Provides coverage in case of total and permanent disability due to accident or illness.',
              premium: 2800,
              isSelected: false,
            },
            {
              id: 'RIDER-ADB',
              name: 'Accidental Death Benefit',
              description: 'Provides additional sum assured in case of death due to accident.',
              premium: 1500,
              isSelected: true,
            },
            {
              id: 'RIDER-WOP',
              name: 'Waiver of Premium',
              description: 'Waives off future premium payments in case of disability or critical illness.',
              premium: 1800,
              isSelected: false,
            },
          ],
          benefits: [
            'High coverage at affordable premium',
            'Tax benefits under Section 80C and 10(10D)',
            'Option to increase coverage at key life stages',
            'Free virtual health checkups annually',
            'No medical tests required up to age 40 and coverage of ₹50 lakhs',
          ],
          exclusions: [
            'Suicide within 12 months of policy inception',
            'Death due to pre-existing conditions not disclosed',
            'Death due to hazardous activities not disclosed',
            'Death due to drug or alcohol abuse',
          ],
          color: 'primary',
        },
        'POL-REC-2': {
          id: 'POL-REC-2',
          name: 'SmartLife Term Guard Plus',
          type: 'Term Life',
          description: 'A term insurance plan with built-in critical illness coverage to protect against life\'s uncertainties and major health conditions.',
          coverage: 10000000,
          basePremium: 12600,
          term: 25,
          returnOfPremium: false,
          minCoverage: 5000000,
          maxCoverage: 30000000,
          stepSize: 500000,
          minTerm: 10,
          maxTerm: 35,
          availableRiders: [
            {
              id: 'RIDER-CI-PLUS',
              name: 'Enhanced Critical Illness',
              description: 'Expands critical illness coverage to 50 conditions from the base 15 conditions.',
              premium: 3500,
              isSelected: false,
            },
            {
              id: 'RIDER-TPD',
              name: 'Total & Permanent Disability',
              description: 'Provides coverage in case of total and permanent disability due to accident or illness.',
              premium: 2400,
              isSelected: false,
            },
            {
              id: 'RIDER-HOSP',
              name: 'Hospital Cash Benefit',
              description: 'Provides daily cash allowance for hospitalization.',
              premium: 2100,
              isSelected: false,
            },
            {
              id: 'RIDER-WOP',
              name: 'Waiver of Premium',
              description: 'Waives off future premium payments in case of disability or critical illness.',
              premium: 1600,
              isSelected: true,
            },
          ],
          benefits: [
            'Built-in critical illness coverage for 15 major conditions',
            'Premium waiver on disability',
            'Special premium rates for non-smokers',
            'Option to convert to whole life plan',
            'Coverage continues even after critical illness claim',
          ],
          exclusions: [
            'Pre-existing critical illnesses at policy inception',
            'Critical illnesses diagnosed within 90 days of policy inception',
            'Self-inflicted injuries or attempted suicide',
            'Hazardous activities not disclosed',
          ],
          color: 'accent',
        },
      }
      
      const policyData = mockPolicies[id]
      
      if (policyData) {
        setPolicy(policyData)
        setCoverageAmount(policyData.coverage)
        setTerm(policyData.term)
        setSelectedRiders(
          policyData.availableRiders
            .filter((rider) => rider.isSelected)
            .map((rider) => rider.id)
        )
        
        // Calculate initial premium
        const ridersPremium = policyData.availableRiders
          .filter((rider) => rider.isSelected)
          .reduce((sum, rider) => sum + rider.premium, 0)
          
        setPremium(policyData.basePremium + ridersPremium)
      }
      
      setLoading(false)
    }
    
    fetchPolicy()
  }, [id])
  
  // Calculate premium when selections change
  useEffect(() => {
    if (!policy) return
    
    // Base premium calculation (simplified)
    const coverageRatio = coverageAmount / policy.coverage
    const termRatio = term / policy.term
    
    let calculatedPremium = policy.basePremium * coverageRatio * termRatio
    
    // Add riders premium
    const ridersPremium = policy.availableRiders
      .filter((rider) => selectedRiders.includes(rider.id))
      .reduce((sum, rider) => sum + rider.premium, 0)
    
    calculatedPremium += ridersPremium
    
    setPremium(Math.round(calculatedPremium))
  }, [coverageAmount, term, selectedRiders, policy])
  
  // Handle rider toggle
  const toggleRider = (riderId) => {
    setSelectedRiders((prev) =>
      prev.includes(riderId)
        ? prev.filter((id) => id !== riderId)
        : [...prev, riderId]
    )
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real app, this would submit the policy customization
    navigate(`/feedback/${policy.id}`)
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
  
  if (!policy) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Policy Not Found</h2>
        <p className="text-gray-400 mb-6">
          The policy you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/recommendations')}
          className="btn-primary"
        >
          Back to Recommendations
        </button>
      </div>
    )
  }
  
  // Format currency
  const formatCurrency = (amount) => {
    const amountInLakhs = amount / 100000
    
    if (amountInLakhs >= 100) {
      const crores = (amountInLakhs / 100).toFixed(2)
      return `₹${crores} Cr`
    } else {
      return `₹${amountInLakhs} L`
    }
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <button
            onClick={() => navigate('/recommendations')}
            className="flex items-center text-gray-400 hover:text-white mb-2"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Recommendations
          </button>
          <h1 className="text-3xl font-bold text-white">{policy.name}</h1>
          <p className="text-gray-400 mt-1">{policy.type} Insurance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
          <button className="btn-outline">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Save
          </button>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy details section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="card space-y-4">
            <h2 className="text-xl font-bold text-white">Policy Details</h2>
            <p className="text-gray-300">{policy.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-dark-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-white font-medium">{policy.type}</p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Base Coverage</p>
                <p className="text-white font-medium">
                  {formatCurrency(policy.coverage)}
                </p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Base Premium</p>
                <p className="text-white font-medium">₹{policy.basePremium}/year</p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Term</p>
                <p className="text-white font-medium">{policy.term} years</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {policy.benefits.map((benefit, idx) => (
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
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Exclusions</h3>
              <ul className="space-y-3">
                {policy.exclusions.map((exclusion, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">{exclusion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Premium calculator section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className={`card border border-${policy.color}-500/30`}>
            <h2 className="text-xl font-bold text-white mb-6">
              Customize Your Policy
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Coverage slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="coverage" className="text-gray-300">
                    Coverage Amount
                  </label>
                  <span className="text-white font-medium">
                    {formatCurrency(coverageAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  id="coverage"
                  min={policy.minCoverage}
                  max={policy.maxCoverage}
                  step={policy.stepSize}
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(Number(e.target.value))}
                  className={`w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-${policy.color}-500`}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatCurrency(policy.minCoverage)}</span>
                  <span>{formatCurrency(policy.maxCoverage)}</span>
                </div>
              </div>
              
              {/* Term slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="term" className="text-gray-300">
                    Policy Term
                  </label>
                  <span className="text-white font-medium">{term} years</span>
                </div>
                <input
                  type="range"
                  id="term"
                  min={policy.minTerm}
                  max={policy.maxTerm}
                  step={1}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className={`w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-${policy.color}-500`}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{policy.minTerm} years</span>
                  <span>{policy.maxTerm} years</span>
                </div>
              </div>
              
              {/* Riders */}
              <div className="mb-6">
                <label className="text-gray-300 block mb-2">
                  Optional Add-ons (Riders)
                </label>
                <div className="space-y-3">
                  {policy.availableRiders.map((rider) => (
                    <div
                      key={rider.id}
                      className="flex items-start p-3 bg-dark-700 rounded-lg"
                    >
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          id={rider.id}
                          type="checkbox"
                          checked={selectedRiders.includes(rider.id)}
                          onChange={() => toggleRider(rider.id)}
                          className={`w-4 h-4 bg-dark-600 border-dark-500 rounded cursor-pointer focus:ring-${policy.color}-500 focus:ring-offset-dark-800`}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <label
                          htmlFor={rider.id}
                          className="text-white font-medium cursor-pointer"
                        >
                          {rider.name}
                        </label>
                        <p className="text-xs text-gray-400 mt-1">
                          {rider.description}
                        </p>
                      </div>
                      <div className="text-white font-medium ml-2">
                        ₹{rider.premium}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Premium calculation */}
              <div className="pt-4 border-t border-dark-600 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Base Premium</span>
                  <span className="text-white">
                    ₹{Math.round(
                      policy.basePremium *
                        (coverageAmount / policy.coverage) *
                        (term / policy.term)
                    )}
                  </span>
                </div>
                
                {selectedRiders.length > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Riders Premium</span>
                    <span className="text-white">
                      ₹
                      {policy.availableRiders
                        .filter((rider) => selectedRiders.includes(rider.id))
                        .reduce((sum, rider) => sum + rider.premium, 0)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-medium mt-4">
                  <span className="text-white">Total Annual Premium</span>
                  <span className={`text-${policy.color}-500`}>₹{premium}</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Tax benefits available under Sec 80C & 10(10D)</span>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className={`btn bg-${policy.color}-500 hover:bg-${policy.color}-600 text-white`}
                >
                  Buy This Policy
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate('/assistant')}
                >
                  Discuss with Assistant
                </button>
              </div>
            </form>
          </div>
          
          {/* Customer reviews */}
          <div className="card">
            <h3 className="font-medium text-white mb-4">Customer Reviews</h3>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white mr-2">4.8</span>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star > 4.8 ? 'text-dark-600' : 'text-yellow-500'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 ml-2">(124 reviews)</span>
            </div>
            <button className="text-sm text-primary-500 hover:text-primary-400">
              Read All Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PolicyDetailPage