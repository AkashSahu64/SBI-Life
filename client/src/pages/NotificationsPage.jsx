import { useState } from 'react'
import { motion } from 'framer-motion'

const NotificationsPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [notifications] = useState([
    {
      id: 1,
      title: 'Premium Due',
      message: 'Your Vehicle Protect policy premium is due in 10 days',
      time: '2 hours ago',
      type: 'warning',
      unread: true,
      details: {
        policyNumber: 'POL-9012',
        dueDate: '2025-03-10',
        amount: '₹12,300',
        paymentLink: '#',
        additionalInfo: 'Set up auto-debit to never miss a payment and get additional 2% discount on your premium.',
      },
    },
    {
      id: 2,
      title: 'New Recommendation',
      message: 'We have a personalized health insurance recommendation for you',
      time: '5 hours ago',
      type: 'primary',
      unread: true,
      details: {
        recommendationType: 'Health Insurance',
        coverage: '₹25,00,000',
        premium: '₹18,400/year',
        features: [
          'Covers 500+ day-care procedures',
          'No room rent capping',
          'Restore benefit up to 100%',
        ],
        viewLink: '/recommendations',
      },
    },
    {
      id: 3,
      title: 'Claim Approved',
      message: 'Your health claim for ₹42,500 has been approved',
      time: '1 day ago',
      type: 'success',
      unread: false,
      details: {
        claimNumber: 'CLM-2025-1234',
        approvedAmount: '₹42,500',
        hospitalName: 'Apollo Hospitals',
        dateOfService: '2025-02-15',
        status: 'Payment Processing',
        expectedPayout: '2-3 business days',
      },
    },
    {
      id: 4,
      title: 'Policy Anniversary',
      message: 'Your Term Life policy completes 1 year next month',
      time: '2 days ago',
      type: 'primary',
      unread: false,
      details: {
        policyNumber: 'POL-1234',
        anniversaryDate: '2025-03-15',
        benefits: [
          'Increase coverage by 25% without medical tests',
          'Add critical illness rider at special rates',
          'Update nominees and contact details',
        ],
      },
    },
    {
      id: 5,
      title: 'Health Check-up Due',
      message: 'Schedule your free annual health check-up',
      time: '3 days ago',
      type: 'primary',
      unread: false,
      details: {
        benefit: 'Annual Free Health Check-up',
        validity: 'Valid until April 30, 2025',
        coverage: 'Complete body check-up worth ₹5,000',
        partners: ['Apollo Hospitals', 'Max Healthcare', 'Fortis'],
        bookingLink: '#',
      },
    },
  ])

  // Mark notification as read
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification)
    // In a real app, you would make an API call to mark as read
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <p className="text-gray-400 mt-1">
          Stay updated with your insurance activities
        </p>
      </motion.div>

      {/* Main content */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left section - Notifications list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">All Notifications</h2>
            <button className="text-sm text-primary-500 hover:text-primary-400">
              Mark all as read
            </button>
          </div>

          <div className="space-y-2">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedNotification?.id === notification.id
                    ? 'bg-dark-600 border-l-4 border-l-primary-500'
                    : 'bg-dark-800 hover:bg-dark-700'
                } ${notification.unread ? 'border-l-4 border-l-accent-500' : ''}`}
              >
                <div className="flex items-start">
                  <div
                    className={`h-2 w-2 mt-2 rounded-full flex-shrink-0 ${
                      notification.type === 'warning'
                        ? 'bg-warning'
                        : notification.type === 'success'
                        ? 'bg-success'
                        : 'bg-primary-500'
                    }`}
                  ></div>
                  <div className="ml-3">
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right section - Notification details */}
        <div className="lg:col-span-2">
          {selectedNotification ? (
            <div className="card space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedNotification.title}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {selectedNotification.message}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedNotification.type === 'warning'
                      ? 'bg-warning/20 text-warning'
                      : selectedNotification.type === 'success'
                      ? 'bg-success/20 text-success'
                      : 'bg-primary-500/20 text-primary-500'
                  }`}
                >
                  {selectedNotification.type.charAt(0).toUpperCase() +
                    selectedNotification.type.slice(1)}
                </div>
              </div>

              <div className="border-t border-dark-700 pt-6">
                {selectedNotification.type === 'warning' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Policy Number</p>
                        <p className="text-white">
                          {selectedNotification.details.policyNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Due Date</p>
                        <p className="text-white">
                          {new Date(
                            selectedNotification.details.dueDate
                          ).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Amount Due</p>
                        <p className="text-white">
                          {selectedNotification.details.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="btn-primary">Pay Now</button>
                      <button className="btn-outline">Set Up Auto-debit</button>
                    </div>
                  </div>
                )}

                {selectedNotification.type === 'success' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Claim Number</p>
                        <p className="text-white">
                          {selectedNotification.details.claimNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Approved Amount</p>
                        <p className="text-white">
                          {selectedNotification.details.approvedAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Hospital</p>
                        <p className="text-white">
                          {selectedNotification.details.hospitalName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Date of Service</p>
                        <p className="text-white">
                          {new Date(
                            selectedNotification.details.dateOfService
                          ).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                      <p className="text-success font-medium">Payment Status</p>
                      <p className="text-sm text-gray-300 mt-1">
                        {selectedNotification.details.status} - Expected within{' '}
                        {selectedNotification.details.expectedPayout}
                      </p>
                    </div>
                    <button className="btn-primary">Track Payment</button>
                  </div>
                )}

                {selectedNotification.type === 'primary' &&
                  selectedNotification.details.recommendationType && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">
                            Recommended Plan
                          </p>
                          <p className="text-white">
                            {selectedNotification.details.recommendationType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Coverage</p>
                          <p className="text-white">
                            {selectedNotification.details.coverage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Premium</p>
                          <p className="text-white">
                            {selectedNotification.details.premium}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Key Features</p>
                        <ul className="space-y-2">
                          {selectedNotification.details.features.map(
                            (feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-gray-300"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          navigate(selectedNotification.details.viewLink)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  )}

                {selectedNotification.type === 'primary' &&
                  selectedNotification.details.anniversaryDate && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Policy Number</p>
                          <p className="text-white">
                            {selectedNotification.details.policyNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            Anniversary Date
                          </p>
                          <p className="text-white">
                            {new Date(
                              selectedNotification.details.anniversaryDate
                            ).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          Available Benefits
                        </p>
                        <ul className="space-y-2">
                          {selectedNotification.details.benefits.map(
                            (benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-gray-300"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                                {benefit}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="flex space-x-3">
                        <button className="btn-primary">
                          Increase Coverage
                        </button>
                        <button className="btn-outline">Update Details</button>
                      </div>
                    </div>
                  )}

                {selectedNotification.type === 'primary' &&
                  selectedNotification.details.benefit && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Benefit</p>
                          <p className="text-white">
                            {selectedNotification.details.benefit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Valid Until</p>
                          <p className="text-white">
                            {selectedNotification.details.validity}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Coverage</p>
                        <p className="text-white">
                          {selectedNotification.details.coverage}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          Available Partners
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNotification.details.partners.map(
                            (partner, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-dark-700 rounded-full text-sm text-gray-300"
                              >
                                {partner}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <button className="btn-primary">Book Appointment</button>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-dark-700 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-gray-400"
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
              </div>
              <h3 className="text-lg font-medium text-white">
                Select a notification
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Choose a notification from the list to view details
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NotificationsPage