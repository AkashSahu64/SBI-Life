import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const { currentUser, isAgent } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: /* your icon */ (<svg className="h-5 w-5" />) },
    { name: 'Recommendations', path: '/recommendations', icon: (<svg className="h-5 w-5"/>) },
    { name: 'Virtual Assistant', path: '/assistant', icon: (<svg className="h-5 w-5"/>) },
    { name: 'Agent Dashboard', path: '/agent-dashboard', icon: (<svg className="h-5 w-5"/>), agentOnly: true },
    { name: 'Profile & Settings', path: '/profile', icon: (<svg className="h-5 w-5"/>) },
  ]

  const filteredNavItems = navItems.filter(item => !item.agentOnly || isAgent)

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }

  return (
    <>
      {/* Mobile Sidebar */}
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
                <button className="text-gray-400 hover:text-white" onClick={toggleSidebar}>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* User Info */}
              <div className="mt-6 mb-8">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full border-2 border-primary-500" src={currentUser?.profilePicture} alt="Profile" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                    <p className="text-xs text-gray-400">{isAgent ? 'Insurance Agent' : 'Customer'}</p>
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

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-dark-800 border-r border-dark-700 w-64">
        <div className="h-full flex flex-col pt-5">
          {/* User Info */}
          <div className="mb-8 px-4">
            <div className="flex items-center">
              <img className="h-10 w-10 rounded-full border-2 border-primary-500" src={currentUser?.profilePicture} alt="Profile" />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                <p className="text-xs text-gray-400">{isAgent ? 'Insurance Agent' : 'Customer'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
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
    </>
  )
}

export default Sidebar
