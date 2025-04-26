import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AgentDashboardPage = () => {
  const [customers, setCustomers] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [performance, setPerformance] = useState({})
  const [conversions, setConversions] = useState({})
  
  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock data
      setCustomers([
        {
          id: 'CUST001',
          name: 'Rahul Sharma',
          age: 32,
          occupation: 'Software Engineer',
          income: '₹18,00,000',
          policyCount: 2,
          nextBestAction: 'Health insurance upgrade',
          conversionProbability: 78,
          status: 'Active',
          lastContact: '2025-02-20',
          profilePicture: 'https://i.pravatar.cc/150?img=11',
        },
        {
          id: 'CUST002',
          name: 'Priya Patel',
          age: 28,
          occupation: 'Doctor',
          income: '₹22,00,000',
          policyCount: 1,
          nextBestAction: 'Term life with critical illness',
          conversionProbability: 92,
          status: 'High Priority',
          lastContact: '2025-02-15',
          profilePicture: 'https://i.pravatar.cc/150?img=5',
        },
        {
          id: 'CUST003',
          name: 'Vikram Singh',
          age: 45,
          occupation: 'Business Owner',
          income: '₹38,00,000',
          policyCount: 3,
          nextBestAction: 'Retirement planning',
          conversionProbability: 65,
          status: 'Active',
          lastContact: '2025-02-18',
          profilePicture: 'https://i.pravatar.cc/150?img=12',
        },
        {
          id: 'CUST004',
          name: 'Sneha Reddy',
          age: 36,
          occupation: 'Financial Analyst',
          income: '₹24,00,000',
          policyCount: 2,
          nextBestAction: 'Child education plan',
          conversionProbability: 88,
          status: 'New Lead',
          lastContact: '2025-02-22',
          profilePicture: 'https://i.pravatar.cc/150?img=20',
        },
      ])
      
      setTasks([
        {
          id: 'TASK001',
          title: 'Follow up with Priya Patel',
          customerId: 'CUST002',
          dueDate: '2025-03-01',
          priority: 'High',
          status: 'Pending',
          description: 'Discuss term life insurance options with critical illness rider. Customer showed high interest in previous call.',
        },
        {
          id: 'TASK002',
          title: 'Send policy details to Rahul Sharma',
          customerId: 'CUST001',
          dueDate: '2025-02-28',
          priority: 'Medium',
          status: 'Pending',
          description: 'Email premium comparison for upgraded health insurance with family floater option.',
        },
        {
          id: 'TASK003',
          title: 'Renewal reminder call to Vikram Singh',
          customerId: 'CUST003',
          dueDate: '2025-03-05',
          priority: 'Medium',
          status: 'Pending',
          description: 'Vehicle insurance renewal due in 20 days. Prepare revised quote with no-claim bonus.',
        },
        {
          id: 'TASK004',
          title: 'Welcome call to Sneha Reddy',
          customerId: 'CUST004',
          dueDate: '2025-02-25',
          priority: 'High',
          status: 'Pending',
          description: 'New customer introduction call. Review financial needs and explain our AI-based recommendation system.',
        },
      ])
      
      setPerformance({
        labels: [
          'Lead Generation',
          'Client Engagement',
          'Policy Conversion',
          'Cross-Selling',
          'Client Retention',
          'Documentation',
          'Claims Processing',
        ],
        datasets: [
          {
            label: 'Your Performance',
            data: [85, 92, 78, 68, 95, 82, 74],
            backgroundColor: 'rgba(30, 136, 229, 0.3)',
            borderColor: '#1E88E5',
            borderWidth: 2,
            pointBackgroundColor: '#1E88E5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#1E88E5',
          },
          {
            label: 'Team Average',
            data: [72, 68, 65, 70, 75, 80, 68],
            backgroundColor: 'rgba(0, 191, 166, 0.3)',
            borderColor: '#00BFA6',
            borderWidth: 2,
            pointBackgroundColor: '#00BFA6',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00BFA6',
          },
        ],
      })
      
      setConversions({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Policies Sold',
            data: [12, 19, 15, 22, 24, 18],
            backgroundColor: 'rgba(30, 136, 229, 0.8)',
            borderColor: '#1E88E5',
            borderWidth: 1,
          },
          {
            label: 'Premium Generated (Lakhs)',
            data: [8, 12, 10, 15, 18, 14],
            backgroundColor: 'rgba(0, 191, 166, 0.8)',
            borderColor: '#00BFA6',
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
  
  // Chart options for dark theme
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(71, 85, 105, 0.3)',
        },
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
        },
        pointLabels: {
          color: '#e2e8f0',
          font: {
            family: 'Inter',
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#94a3b8',
          font: {
            family: 'Inter',
          },
        },
      },
    },
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
  }
  
  const barOptions = {
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
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white">Agent Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Monitor your clients, tasks, and performance
        </p>
      </motion.div>
      
      {/* Summary cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card bg-gradient-to-br from-primary-900/50 to-primary-800/50 border-primary-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Customers</p>
              <p className="text-2xl font-bold text-white mt-1">{customers.length}</p>
              <p className="text-xs text-primary-400 mt-1">+2 this month</p>
            </div>
            <div className="h-12 w-12 bg-primary-500/20 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-accent-900/50 to-accent-800/50 border-accent-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-300">Pending Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">{tasks.length}</p>
              <p className="text-xs text-accent-400 mt-1">2 high priority</p>
            </div>
            <div className="h-12 w-12 bg-accent-500/20 rounded-full flex items-center justify-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-300">Conversion Rate</p>
              <p className="text-2xl font-bold text-white mt-1">68%</p>
              <p className="text-xs text-green-400 mt-1">+5% from last month</p>
            </div>
            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-300">Premium Generated</p>
              <p className="text-2xl font-bold text-white mt-1">₹14.2L</p>
              <p className="text-xs text-purple-400 mt-1">This month</p>
            </div>
            <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers section */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">High Priority Customers</h2>
            <button className="text-sm text-primary-500 hover:text-primary-400">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="card hover:bg-dark-700/50 transition-colors flex flex-col md:flex-row md:items-center"
              >
                <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                  <img
                    src={customer.profilePicture}
                    alt={customer.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-dark-600"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-white">{customer.name}</h3>
                    <p className="text-sm text-gray-400">
                      {customer.occupation} | {customer.age} years
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-400">Next Best Action</p>
                    <p className="text-sm text-white">{customer.nextBestAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Conversion Probability</p>
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden mr-2">
                        <div
                          className={`h-full ${
                            customer.conversionProbability > 80
                              ? 'bg-green-500'
                              : customer.conversionProbability > 60
                              ? 'bg-primary-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${customer.conversionProbability}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">
                        {customer.conversionProbability}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <p
                        className={`text-sm ${
                          customer.status === 'High Priority'
                            ? 'text-yellow-500'
                            : customer.status === 'New Lead'
                            ? 'text-green-500'
                            : 'text-gray-300'
                        }`}
                      >
                        {customer.status}
                      </p>
                    </div>
                    <button className="btn-outline py-1 px-3 text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Tasks section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Upcoming Tasks</h2>
            <button className="text-sm text-primary-500 hover:text-primary-400">
              View All
            </button>
          </div>
          
          <div className="card space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border ${
                  task.priority === 'High'
                    ? 'border-yellow-500/30 bg-yellow-500/10'
                    : task.priority === 'Medium'
                    ? 'border-primary-500/30 bg-primary-500/10'
                    : 'border-gray-600 bg-dark-700/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white">{task.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : task.priority === 'Medium'
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </p>
                  <button className="text-xs text-primary-500 hover:text-primary-400">
                    Complete
                  </button>
                </div>
              </div>
            ))}
            
            <button className="w-full text-center text-sm text-primary-500 hover:text-primary-400 py-2">
              Add New Task
            </button>
          </div>
          
          {/* Weekly goal card */}
          <div className="card bg-gradient-to-br from-primary-900/30 to-primary-800/30">
            <h3 className="font-medium text-white mb-4">Weekly Goal</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">New Policies</span>
                  <span className="text-sm text-primary-400">8/12</span>
                </div>
                <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: '66.67%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Premium Target</span>
                  <span className="text-sm text-green-400">₹18L/₹20L</span>
                </div>
                <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Customer Meetings</span>
                  <span className="text-sm text-yellow-400">15/20</span>
                </div>
                <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-medium text-white mb-4">Performance Radar</h3>
          <div className="h-80">
            <Radar data={performance} options={radarOptions} />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-medium text-white mb-4">
            Policies & Premium Trends
          </h3>
          <div className="h-80">
            <Bar data={conversions} options={barOptions} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AgentDashboardPage