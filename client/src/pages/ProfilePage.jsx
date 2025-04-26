import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'

const ProfilePage = () => {
  const { currentUser, logout } = useAuth()
  const { addNotification } = useUI()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    occupation: '',
    annualIncome: '',
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: false,
    marketingCommunications: true,
    paperlessCommunication: true,
    twoFactorAuth: false,
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Set mock data
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        address: '123 Senapati Bapat Marg, Mumbai, Maharashtra 400013',
        dateOfBirth: '1990-05-15',
        occupation: 'Software Engineer',
        annualIncome: '1800000',
      })
      
      setLoading(false)
    }
    
    fetchData()
  }, [currentUser])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  const togglePreference = (preference) => {
    setPreferences({ ...preferences, [preference]: !preferences[preference] })
  }
  
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      addNotification({
        title: 'Profile Updated',
        message: 'Your profile information has been updated successfully',
        type: 'success',
      })
    }, 1000)
  }
  
  const handlePreferencesSubmit = (e) => {
    e.preventDefault()
    
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      addNotification({
        title: 'Preferences Updated',
        message: 'Your communication preferences have been updated successfully',
        type: 'success',
      })
    }, 1000)
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
  
  // Determine if form has been modified from original values
  const isProfileFormDirty = () => {
    return (
      formData.name !== currentUser?.name ||
      formData.email !== currentUser?.email ||
      formData.phone !== currentUser?.phone
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
        <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
        <p className="text-gray-400 mt-1">
          Manage your personal information and preferences
        </p>
      </motion.div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <div className="card space-y-6">
            {/* Profile image */}
            <div className="flex flex-col items-center">
              <img
                src={currentUser?.profilePicture}
                alt={currentUser?.name}
                className="h-24 w-24 rounded-full border-4 border-dark-700 object-cover"
              />
              <p className="mt-4 font-medium text-white">{currentUser?.name}</p>
              <p className="text-sm text-gray-400">
                {currentUser?.role === 'agent' ? 'Insurance Agent' : 'Customer'}
              </p>
              <button className="mt-2 text-sm text-primary-500 hover:text-primary-400">
                Change Photo
              </button>
            </div>
            
            {/* Navigation tabs */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 w-full rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </button>
              
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex items-center px-3 py-2 w-full rounded-lg transition-colors ${
                  activeTab === 'preferences'
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
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
                Communication Preferences
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 w-full rounded-lg transition-colors ${
                  activeTab === 'security'
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Security & Privacy
              </button>
              
              <button
                onClick={() => setActiveTab('data')}
                className={`flex items-center px-3 py-2 w-full rounded-lg transition-colors ${
                  activeTab === 'data'
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
                Data & Documents
              </button>
            </nav>
            
            {/* Logout button */}
            <div className="pt-4 border-t border-dark-700">
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 w-full rounded-lg text-gray-300 hover:bg-dark-700 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Main content */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          {/* Personal Information */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">
                Personal Information
              </h2>
              
              {loading ? (
                <div className="flex justify-center my-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                        rows={3}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="occupation" className="form-label">
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="annualIncome" className="form-label">
                        Annual Income (₹)
                      </label>
                      <input
                        type="number"
                        id="annualIncome"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-3">
                    <button
                      type="submit"
                      disabled={!isProfileFormDirty() || loading}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setFormData({
                        name: currentUser?.name || '',
                        email: currentUser?.email || '',
                        phone: currentUser?.phone || '',
                        address: '123 Senapati Bapat Marg, Mumbai, Maharashtra 400013',
                        dateOfBirth: '1990-05-15',
                        occupation: 'Software Engineer',
                        annualIncome: '1800000',
                      })}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {/* Communication Preferences */}
          {activeTab === 'preferences' && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">
                Communication Preferences
              </h2>
              
              {loading ? (
                <div className="flex justify-center my-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <form onSubmit={handlePreferencesSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive policy updates and renewal reminders via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.emailNotifications}
                          onChange={() => togglePreference('emailNotifications')}
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">SMS Notifications</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive payment confirmations and alerts via SMS
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.smsNotifications}
                          onChange={() => togglePreference('smsNotifications')}
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">WhatsApp Notifications</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive policy updates and service messages via WhatsApp
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.whatsappNotifications}
                          onChange={() => togglePreference('whatsappNotifications')}
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Marketing Communications</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive promotional offers, new product information and news
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.marketingCommunications}
                          onChange={() => togglePreference('marketingCommunications')}
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Paperless Communication</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive all policy documents and statements electronically
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.paperlessCommunication}
                          onChange={() => togglePreference('paperlessCommunication')}
                        />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button type="submit" className="btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {/* Security & Privacy */}
          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">
                Security & Privacy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.twoFactorAuth}
                      onChange={() => togglePreference('twoFactorAuth')}
                    />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="p-4 bg-dark-700 rounded-lg">
                  <h3 className="font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="form-input"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="form-input"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-input"
                        placeholder="••••••••"
                      />
                    </div>
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>
                
                <div className="p-4 bg-dark-700 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Privacy Controls</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Manage how your information is used
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="privacy1"
                        type="checkbox"
                        className="w-4 h-4 bg-dark-600 rounded border-dark-500 focus:ring-primary-500 focus:ring-offset-dark-800"
                        checked
                      />
                      <label htmlFor="privacy1" className="ml-2 text-sm text-gray-300">
                        Allow data analysis to improve services
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="privacy2"
                        type="checkbox"
                        className="w-4 h-4 bg-dark-600 rounded border-dark-500 focus:ring-primary-500 focus:ring-offset-dark-800"
                        checked
                      />
                      <label htmlFor="privacy2" className="ml-2 text-sm text-gray-300">
                        Share anonymous usage statistics
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="privacy3"
                        type="checkbox"
                        className="w-4 h-4 bg-dark-600 rounded border-dark-500 focus:ring-primary-500 focus:ring-offset-dark-800"
                      />
                      <label htmlFor="privacy3" className="ml-2 text-sm text-gray-300">
                        Allow partners to contact me about related products
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="btn-primary">Save Privacy Settings</button>
                  </div>
                </div>
                
                <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Data & Documents */}
          {activeTab === 'data' && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">
                Data & Documents
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-dark-700 rounded-lg">
                  <h3 className="font-medium text-white mb-4">Policy Documents</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="h-6 w-6 text-red-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-white">
                            Term Shield Pro - Policy Document
                          </p>
                          <p className="text-xs text-gray-400">PDF • 2.4 MB</p>
                        </div>
                      </div>
                      <button className="text-primary-500 hover:text-primary-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="h-6 w-6 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-white">
                            Premium Receipt - Jan 2025
                          </p>
                          <p className="text-xs text-gray-400">PDF • 1.1 MB</p>
                        </div>
                      </div>
                      <button className="text-primary-500 hover:text-primary-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="h-6 w-6 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-white">
                            Tax Benefit Certificate - FY 2024-25
                          </p>
                          <p className="text-xs text-gray-400">PDF • 0.8 MB</p>
                        </div>
                      </div>
                      <button className="text-primary-500 hover:text-primary-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-dark-700 rounded-lg">
                  <h3 className="font-medium text-white mb-4">Upload Documents</h3>
                  
                  <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center">
                    <svg
                      className="h-12 w-12 text-gray-500 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-400 mb-2">
                      Drag and drop your files here, or
                    </p>
                    <button className="btn-primary">Browse Files</button>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, JPG, PNG (Max size: 10MB)
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-dark-700 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Export Your Data</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Download a copy of your personal data
                  </p>
                  
                  <div className="flex space-x-3">
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export as PDF
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export as CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfilePage