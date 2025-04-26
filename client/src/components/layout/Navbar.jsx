import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { toggleSidebar } = useUI()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Premium Due',
      message: 'Your Vehicle Protect policy premium is due in 10 days',
      time: '2 hours ago',
      type: 'warning',
      unread: true,
    },
    {
      id: 2,
      title: 'New Recommendation',
      message: 'We have a personalized health insurance recommendation for you',
      time: '5 hours ago',
      type: 'primary',
      unread: true,
    },
    {
      id: 3,
      title: 'Claim Approved',
      message: 'Your health claim for ₹42,500 has been approved',
      time: '1 day ago',
      type: 'success',
      unread: false,
    },
  ]
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNotificationClick = (notification) => {
    setShowNotifications(false)
    navigate('/notifications', { state: { selectedNotification: notification } })
  }
  
  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="md:hidden mr-4 text-gray-400 hover:text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <span className="font-bold text-xl text-white">
                <span className="text-primary-500">SmartLife</span> AI
              </span>
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="text-gray-400 hover:text-white relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500"></span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-dark-700 rounded-lg shadow-lg overflow-hidden border border-dark-600"
                  >
                    <div className="p-4 border-b border-dark-600">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white">Notifications</h3>
                        <button className="text-sm text-primary-500 hover:text-primary-400">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-dark-600 hover:bg-dark-600 cursor-pointer ${
                            notification.unread ? 'bg-dark-600/50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`h-2 w-2 mt-2 rounded-full flex-shrink-0 ${
                              notification.type === 'warning' ? 'bg-warning' :
                              notification.type === 'success' ? 'bg-success' :
                              'bg-primary-500'
                            }`}></div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-dark-600">
                      <button 
                        className="w-full text-center text-sm text-primary-500 hover:text-primary-400"
                        onClick={() => {
                          setShowNotifications(false)
                          navigate('/notifications')
                        }}
                      >
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Help button */}
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => navigate('/assistant')}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="hidden md:block mr-2">{currentUser?.name}</span>
                <img
                  className="h-8 w-8 rounded-full border-2 border-primary-500"
                  src={currentUser?.profilePicture}
                  alt="Profile"
                />
              </button>
              
              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-md shadow-lg py-1 z-50"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-600"
                    onClick={() => {
                      setShowProfileMenu(false)
                      navigate('/profile')
                    }}
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-600"
                    onClick={() => {
                      setShowProfileMenu(false)
                      handleLogout()
                    }}
                  >
                    Sign out
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar