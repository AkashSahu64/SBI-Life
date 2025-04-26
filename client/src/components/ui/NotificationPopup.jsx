import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotificationPopup = ({ 
  id, 
  title, 
  message, 
  type = 'primary', 
  linkTo, 
  linkText,
  autoHide = true, 
  hideAfter = 8000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    let timer
    if (autoHide && isVisible) {
      timer = setTimeout(() => {
        hideNotification()
      }, hideAfter)
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [autoHide, hideAfter, isVisible])
  
  const hideNotification = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (onClose) onClose(id)
    }, 300) // Wait for animation to complete
  }
  
  // Determine background color based on type
  const bgColor = 
    type === 'primary' ? 'bg-primary-500/10 border-primary-500/30' :
    type === 'success' ? 'bg-success/10 border-success/30' :
    type === 'warning' ? 'bg-warning/10 border-warning/30' :
    'bg-error/10 border-error/30'
  
  const iconColor =
    type === 'primary' ? 'text-primary-500' :
    type === 'success' ? 'text-success' :
    type === 'warning' ? 'text-warning' :
    'text-error'
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full max-w-sm rounded-lg border ${bgColor} shadow-lg overflow-hidden`}
        >
          <div className="p-4">
            <div className="flex items-start">
              {/* Icon based on type */}
              <div className={`flex-shrink-0 ${iconColor}`}>
                {type === 'success' && (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {type === 'warning' && (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {type === 'error' && (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {type === 'primary' && (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-sm text-gray-300">{message}</p>
                {linkTo && linkText && (
                  <div className="mt-3">
                    <Link
                      to={linkTo}
                      className={`text-sm font-medium ${
                        type === 'primary' ? 'text-primary-500 hover:text-primary-400' :
                        type === 'success' ? 'text-success hover:text-success/80' :
                        type === 'warning' ? 'text-warning hover:text-warning/80' :
                        'text-error hover:text-error/80'
                      }`}
                    >
                      {linkText}
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-200 focus:outline-none"
                  onClick={hideNotification}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {autoHide && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: hideAfter / 1000, ease: 'linear' }}
              className={`h-1 ${
                type === 'primary' ? 'bg-primary-500' :
                type === 'success' ? 'bg-success' :
                type === 'warning' ? 'bg-warning' :
                'bg-error'
              }`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationPopup