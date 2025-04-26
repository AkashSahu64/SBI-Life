import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const { currentUser, isAgent } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Define navigation items
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: 'Recommendations',
      path: '/recommendations',
      icon: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
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
      ),
    },
    {
      name: 'Virtual Assistant',
      path: '/assistant',
      icon: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
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
      ),
    },
    {
      name: 'Agent Dashboard',
      path: '/agent-dashboard',
      icon: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      agentOnly: true,
    },
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ]
  
  // Filter out agent-only items if user is not an agent
  const filteredNavItems = navItems.filter(
    (item) => !item.agentOnly || isAgent
  )
  
  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  }
  
  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path)
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }
  
  return (
    <>
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-700 z-30 md:hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-white">
                  <span className="text-primary-500">SmartLife</span> AI
                </span>
                <button
                  className="text-gray-400 hover:text-white"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              {/* User info */}
              <div className="mt-6 mb-8">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-primary-500"
                    src={currentUser?.profilePicture}
                    alt="Profile"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isAgent ? 'Insurance Agent' : 'Customer'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                {filteredNavItems.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                      location.pathname === item.path
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          <div className="flex-1 flex flex-col min-h-0 bg-dark-800 border-r border-dark-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="font-bold text-xl text-white">
                  <span className="text-primary-500">SmartLife</span> AI
                </span>
              </div>
              
              {/* User info */}
              <div className="mt-6 mb-8 px-4">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-primary-500"
                    src={currentUser?.profilePicture}
                    alt="Profile"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isAgent ? 'Insurance Agent' : 'Customer'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="mt-5 flex-1 px-4 space-y-1">
                {filteredNavItems.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                      location.pathname === item.path
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar