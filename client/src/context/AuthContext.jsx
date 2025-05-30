import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('smartlife_user')
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Failed to parse stored user', err)
        localStorage.removeItem('smartlife_user')
      }
    }
    setIsInitialized(true)
    setLoading(false)
  }, [])

  // Login function
  const login = async (credentials, method) => {
    setLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = {
        id: '123456',
        name: 'Amitabh Desai',
        email: credentials.email || 'amitabhdesai@gmail.com',
        phone: credentials.phone || '+91 9876543210',
        policyNumbers: ['SBI-LIFE-1234', 'SBI-LIFE-5678'],
        role: 'customer',
        profilePicture: 'https://media.licdn.com/dms/image/v2/D5603AQHOoQ1adxtM3g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1677605929219?e=2147483647&v=beta&t=ZapgjVyCubCvs276DRgMh-ODSHJ79BCK36iqS0imiD8',
        authMethod: method,
      }
      
      setCurrentUser(user)
      localStorage.setItem('smartlife_user', JSON.stringify(user))
      return user
    } catch (err) {
      setError(err.message || 'Failed to login')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('smartlife_user')
  }

  const value = {
    currentUser,
    isInitialized,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!currentUser,
    isAgent: currentUser?.role === 'agent',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}