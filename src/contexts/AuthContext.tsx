import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { TokenManager } from '@services/http'
import { useLogin, useLogout } from '@hooks/requests'
import { useSuccessMessages, useErrorMessages } from '@hooks/common'
import { extractErrorMessage } from '@utils/error'
import type { User } from '../types'
// import { useCurrentUser } from "@hooks/queries"; // Uncomment when needed

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Get i18n messages
  const successMessages = useSuccessMessages()
  const errorMessages = useErrorMessages()

  const loginMutation = useLogin({
    successMessage: successMessages.login,
    errorMessage: errorMessages.validationError,
  })

  const logoutMutation = useLogout({
    successMessage: successMessages.logout,
  })

  // Uncomment when you want to auto-fetch current user
  // const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();

  // Initialize auth state on mount
  useEffect(() => {
    const token = TokenManager.getAccessToken()
    if (token) {
      // Mock user data if token exists
      setUser({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      })
    }
    setIsInitialized(true)
  }, [])

  // Don't fetch current user automatically for base project
  // const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();

  // Listen for logout events from API interceptor
  useEffect(() => {
    const handleLogout = () => {
      setUser(null)
    }

    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await loginMutation.mutateAsync({ email, password })
      // Transform AuthUser to User
      setUser({
        ...result.user,
        role: (result.user.role as 'admin' | 'user') || 'user',
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) }
    }
  }

  const logout = () => {
    logoutMutation.mutate()
    setUser(null)
  }

  const isLoading = !isInitialized || loginMutation.isPending

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext, useAuth }
