import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoadingScreen from './components/ui/LoadingScreen'
import { useAuth } from './context/AuthContext'


const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'))
const PolicyDetailPage = lazy(() => import('./pages/PolicyDetailPage'))
const AgentDashboardPage = lazy(() => import('./pages/AgentDashboardPage'))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))

function App() {
  const { isInitialized } = useAuth()

  // Show loading screen while auth is initializing
  if (!isInitialized) {
    return <LoadingScreen />
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assistant" element={<ChatPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/policy/:id" element={<PolicyDetailPage />} />
          <Route path="/agent-dashboard" element={<AgentDashboardPage />} />
          <Route path="/feedback/:policyId" element={<FeedbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App