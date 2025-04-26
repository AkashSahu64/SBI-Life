import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="mb-4">
          <span className="font-bold text-3xl text-white">
            <span className="text-primary-500">SmartLife</span> AI
          </span>
        </div>
        
        <div className="flex space-x-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: 0,
            }}
            className="w-4 h-4 bg-primary-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="w-4 h-4 bg-primary-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="w-4 h-4 bg-primary-500 rounded-full"
          />
        </div>
        
        <p className="mt-4 text-gray-400">Initializing SmartLife AI</p>
      </motion.div>
    </div>
  )
}

export default LoadingScreen