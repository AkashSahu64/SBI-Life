import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Default chart options with dark theme
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#e2e8f0',
        font: {
          family: 'Inter',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#e2e8f0',
      bodyColor: '#e2e8f0',
      borderColor: '#334155',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      bodyFont: {
        family: 'Inter',
      },
      titleFont: {
        family: 'Inter',
        weight: 600,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(71, 85, 105, 0.2)',
      },
      ticks: {
        color: '#94a3b8',
        font: {
          family: 'Inter',
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(71, 85, 105, 0.2)',
      },
      ticks: {
        color: '#94a3b8',
        font: {
          family: 'Inter',
        },
      },
    },
  },
  animation: {
    duration: 2000,
    easing: 'easeOutQuart',
  },
}

const DashboardPage = () => {
  const { currentUser } = useAuth()
  const [greeting, setGreeting] = useState('')
  const [policies, setPolicies] = useState([])
  const [notifications, setNotifications] = useState([])
  const [premiumData, setPremiumData] = useState({})
  const [claimsData, setClaimsData] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
    
    // Simulate API fetch with setTimeout
    const fetchData = async () => {
      // In a real app, these would be actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock data
      setPolicies([
        {
          id: 'POL-1234',
          name: 'SmartLife Health Max',
          type: 'Health',
          coverage: '₹15,00,000',
          premium: '₹24,500',
          nextPayment: '2025-04-15',
          status: 'Active',
          progress: 75,
          color: 'primary',
        },
        {
          id: 'POL-5678',
          name: 'SmartLife Term Secure',
          type: 'Term Life',
          coverage: '₹1,00,00,000',
          premium: '₹32,750',
          nextPayment: '2025-05-22',
          status: 'Active',
          progress: 60,
          color: 'accent',
        },
        {
          id: 'POL-9012',
          name: 'SmartLife Vehicle Protect',
          type: 'Auto',
          coverage: '₹5,00,000',
          premium: '₹12,300',
          nextPayment: '2025-03-10',
          status: 'Renewal Due',
          progress: 15,
          color: 'warning',
        },
      ])
      
      setNotifications([
        {
          id: 1,
          title: 'Premium Due',
          message: 'Your Vehicle Protect policy premium is due in 10 days',
          date: '2025-03-01',
          type: 'warning',
          read: false,
        },
        {
          id: 2,
          title: 'Claim Approved',
          message: 'Your health claim for ₹42,500 has been approved',
          date: '2025-02-20',
          type: 'success',
          read: true,
        },
        {
          id: 3,
          title: 'New Recommendation',
          message: 'We have a personalized recommendation for you',
          date: '2025-02-15',
          type: 'primary',
          read: false,
        },
      ])
      
      // Monthly premium data for the chart
      setPremiumData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Premiums Paid',
            data: [65000, 59000, 80000, 81000, 56000, 75000],
            borderColor: '#1E88E5',
            backgroundColor: 'rgba(30, 136, 229, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      })
      
      // Claims history data
      setClaimsData({
        labels: ['Health', 'Vehicle', 'Home', 'Travel', 'Other'],
        datasets: [
          {
            label: 'Claims Filed',
            data: [45000, 25000, 0, 12000, 5000],
            backgroundColor: [
              'rgba(30, 136, 229, 0.8)', // primary
              'rgba(0, 191, 166, 0.8)', // accent
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(255, 99, 132, 0.8)',
            ],
            borderColor: [
              'rgb(30, 136, 229)',
              'rgb(0, 191, 166)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(255, 99, 132)',
            ],
            borderWidth: 1,
          },
        ],
      })
      
      setLoading(false)
    }
    
    fetchData()
  }, [])
  
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
          {greeting}, {currentUser?.name}
        </h1>
        <p className="text-gray-400 mt-1">
          Here's an overview of your insurance portfolio
        </p>
      </motion.div>
      
      {/* Featured recommendation */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary-900/80 to-accent-900/80 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
          <div>
            <div className="inline-block px-2 py-1 bg-accent-500/20 rounded-lg text-accent-400 text-xs font-medium mb-3">
              AI Recommendation
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Enhance your family's protection
            </h2>
            <p className="text-gray-300 max-w-lg">
              Based on your life stage and dependents, we recommend adding a 
              Critical Illness Rider to your Term Secure policy for comprehensive 
              protection.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/recommendations"
              className="btn-accent px-6 py-3 whitespace-nowrap"
            >
              View Recommendation
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Policies section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Your Policies</h2>
            <Link
              to="/recommendations"
              className="text-sm text-primary-500 hover:text-primary-400"
            >
              View All
            </Link>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {policies.map((policy) => (
              <motion.div
                key={policy.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="card flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-white">{policy.name}</h3>
                    <p className="text-sm text-gray-400">{policy.type}</p>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      policy.status === 'Active'
                        ? 'bg-success/20 text-success'
                        : 'bg-warning/20 text-warning'
                    }`}
                  >
                    {policy.status}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Coverage</p>
                      <p className="text-sm font-medium text-white">
                        {policy.coverage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Annual Premium</p>
                      <p className="text-sm font-medium text-white">
                        {policy.premium}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-400">Policy Term</p>
                      <p className="text-xs font-medium text-gray-400">
                        {policy.progress}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${policy.color}-500 rounded-full`}
                        style={{ width: `${policy.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-dark-700 flex justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Next Payment</p>
                    <p className="text-sm text-white">
                      {new Date(policy.nextPayment).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <Link
                    to={`/policy/${policy.id}`}
                    className="btn-outline text-sm py-1 px-3"
                  >
                    Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Notifications section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <button className="text-sm text-primary-500 hover:text-primary-400">
              Mark All as Read
            </button>
          </div>
          
          <div className="card space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.type === 'primary'
                    ? 'border-primary-500/30 bg-primary-500/10'
                    : notification.type === 'success'
                    ? 'border-success/30 bg-success/10'
                    : notification.type === 'warning'
                    ? 'border-warning/30 bg-warning/10'
                    : 'border-error/30 bg-error/10'
                } ${notification.read ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-white">{notification.title}</h4>
                  <div className="flex items-center">
                    <span
                      className={`block h-2 w-2 rounded-full ${
                        notification.read ? 'bg-transparent' : 'bg-primary-500'
                      }`}
                    ></span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(notification.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
              </div>
            ))}
            
            <button className="w-full text-center text-sm text-primary-500 hover:text-primary-400 py-2">
              View All Notifications
            </button>
          </div>
          
          {/* Customer support card */}
          <div className="card bg-gradient-to-br from-dark-800 to-dark-700">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">Need help?</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Our virtual assistant is ready to answer your questions 24/7
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-accent-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/assistant" className="btn-accent w-full">
                Chat with Assistant
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="card space-y-4">
          <h3 className="font-medium text-white">Premium History</h3>
          <div className="h-64">
            <Line options={chartOptions} data={premiumData} />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card space-y-4">
          <h3 className="font-medium text-white">Claims by Category</h3>
          <div className="h-64">
            <Bar options={chartOptions} data={claimsData} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardPage