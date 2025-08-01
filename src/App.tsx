import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@components/layouts/Layout'
import AuthLayout from '@components/layouts/AuthLayout'
import ProtectedRoute from '@components/layouts/ProtectedRoute'
import HomePage from '@pages/HomePage'
import LoginPage from '@pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
