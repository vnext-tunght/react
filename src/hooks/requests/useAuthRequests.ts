import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '@services/api'
import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  ResetPasswordRequest,
} from '@/types/auth'
import { TokenManager } from '@services/http'
import { notifications } from '@utils/notifications'
import { User } from '@/types'

// Query Keys
export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  profile: ['auth', 'profile'] as const,
} as const

interface UseLoginOptions {
  onSuccess?: (response: AuthResponse) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
}

export const useLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient()
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    successMessage = 'Successfully logged in!',
    errorMessage = 'Login failed. Please try again.',
  } = options || {}

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response: AuthResponse) => {
      // Store tokens
      TokenManager.setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      })

      // Set current user in cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, response.user)

      // Show success notification
      notifications.success(successMessage)

      // Call custom success handler
      customOnSuccess?.(response)
    },
    onError: (error: Error) => {
      console.error('Login error:', error)
      notifications.error(errorMessage)

      // Call custom error handler
      customOnError?.(error)
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response: AuthResponse) => {
      // Store tokens
      TokenManager.setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      })

      // Set current user in cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, response.user)

      // Show success notification
      notifications.success('Account created successfully!')
    },
    onError: error => {
      console.error('Register error:', error)
      notifications.error('Failed to create account')
    },
  })
}

interface UseLogoutOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  successMessage?: string
}

export const useLogout = (options?: UseLogoutOptions) => {
  const queryClient = useQueryClient()
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    successMessage = 'Successfully logged out!',
  } = options || {}

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear tokens
      TokenManager.clearTokens()

      // Clear all queries from cache
      queryClient.clear()

      // Show success notification
      notifications.success(successMessage)

      // Call custom success handler
      customOnSuccess?.()
    },
    onError: (error: Error) => {
      console.error('Logout error:', error)

      // Even if logout fails, clear tokens and cache
      TokenManager.clearTokens()
      queryClient.clear()

      notifications.success(successMessage)

      // Call custom error handler
      customOnError?.(error)
    },
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(response.message || 'Password reset email sent!')
    },
    onError: error => {
      console.error('Forgot password error:', error)
      notifications.error('Failed to send password reset email')
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(response.message || 'Password reset successfully!')
    },
    onError: error => {
      console.error('Reset password error:', error)
      notifications.error('Failed to reset password')
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(
        response.message || 'Password changed successfully!'
      )
    },
    onError: error => {
      console.error('Change password error:', error)
      notifications.error('Failed to change password')
    },
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Omit<User, 'id'>>) =>
      authService.updateProfile(data),
    onSuccess: (updatedUser: User) => {
      // Update user in cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, updatedUser)

      notifications.success('Profile updated successfully!')
    },
    onError: error => {
      console.error('Update profile error:', error)
      notifications.error('Failed to update profile')
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: () => authService.getCurrentUser(),
    retry: false, // Don't retry if user is not authenticated
    enabled: !!TokenManager.getAccessToken(), // Only run if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useCurrentUser()
  const hasToken = !!TokenManager.getAccessToken()

  return {
    isAuthenticated: !!user && hasToken,
    isLoading,
    user,
  }
}
