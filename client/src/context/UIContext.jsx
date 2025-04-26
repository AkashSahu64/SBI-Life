import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const UIContext = createContext()

export function UIProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  
  // Add a new notification
  const addNotification = (notification) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { ...notification, id }])
    
    // Auto-remove notification after timeout
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)
    
    return id
  }
  
  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id))
  }
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }
  
  // Update html class for theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  // Render notifications
  const NotificationsRenderer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-72">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-success/20 border-l-4 border-success'
                : notification.type === 'error'
                ? 'bg-error/20 border-l-4 border-error'
                : notification.type === 'warning'
                ? 'bg-warning/20 border-l-4 border-warning'
                : 'bg-primary-500/20 border-l-4 border-primary-500'
            }`}
          >
            <div className="flex justify-between">
              <p className="font-medium">{notification.title}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-200"
              >
                ×
              </button>
            </div>
            {notification.message && (
              <p className="text-sm mt-1">{notification.message}</p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
  
  const value = {
    notifications,
    sidebarOpen,
    theme,
    addNotification,
    removeNotification,
    toggleSidebar,
    toggleTheme,
    NotificationsRenderer,
  }
  
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// Custom hook to use UI context
export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}