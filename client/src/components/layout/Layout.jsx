import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { AnimatePresence, motion } from 'framer-motion'

const Layout = () => {
  const { isAuthenticated } = useAuth()
  const { sidebarOpen, NotificationsRenderer } = useUI()

  if (!isAuthenticated) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Below Navbar: Sidebar and Main Content side by side */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 md:p-6 max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Notifications */}
      <NotificationsRenderer />
    </div>
  )
}

export default Layout
