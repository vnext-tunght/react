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
import { extractErrorMessage } from '@utils/error'
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
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)

      // Call custom error handler
      customOnError?.(error)
    },
  })
}

interface UseRegisterOptions {
  onSuccess?: (response: AuthResponse) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
}

export const useRegister = (options?: UseRegisterOptions) => {
  const queryClient = useQueryClient()
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    successMessage = 'Account created successfully!',
    errorMessage = 'Failed to create account',
  } = options || {}

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
      notifications.success(successMessage)

      // Call custom success handler
      customOnSuccess?.(response)
    },
    onError: (error: Error) => {
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)

      // Call custom error handler
      customOnError?.(error)
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
      // Even if logout fails, clear tokens and cache
      TokenManager.clearTokens()
      queryClient.clear()

      const message = extractErrorMessage(error, 'Logout failed, but local session was cleared.')
      notifications.warning(message)

      // Call custom error handler
      customOnError?.(error)
    },
  })
}

interface UseForgotPasswordOptions {
  onSuccess?: (response: MessageResponse) => void
  onError?: (error: Error) => void
  errorMessage?: string
}

export const useForgotPassword = (options?: UseForgotPasswordOptions) => {
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    errorMessage = 'Failed to send password reset email',
  } = options || {}

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(response.message || 'Password reset email sent!')
      customOnSuccess?.(response)
    },
    onError: (error: Error) => {
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)
      customOnError?.(error)
    },
  })
}

interface UseResetPasswordOptions {
  onSuccess?: (response: MessageResponse) => void
  onError?: (error: Error) => void
  errorMessage?: string
}

export const useResetPassword = (options?: UseResetPasswordOptions) => {
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    errorMessage = 'Failed to reset password',
  } = options || {}

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(response.message || 'Password reset successfully!')
      customOnSuccess?.(response)
    },
    onError: (error: Error) => {
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)
      customOnError?.(error)
    },
  })
}

interface UseChangePasswordOptions {
  onSuccess?: (response: MessageResponse) => void
  onError?: (error: Error) => void
  errorMessage?: string
}

export const useChangePassword = (options?: UseChangePasswordOptions) => {
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    errorMessage = 'Failed to change password',
  } = options || {}

  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(data),
    onSuccess: (response: MessageResponse) => {
      notifications.success(
        response.message || 'Password changed successfully!'
      )
      customOnSuccess?.(response)
    },
    onError: (error: Error) => {
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)
      customOnError?.(error)
    },
  })
}

interface UseUpdateProfileOptions {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
}

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  const queryClient = useQueryClient()
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    successMessage = 'Profile updated successfully!',
    errorMessage = 'Failed to update profile',
  } = options || {}

  return useMutation({
    mutationFn: (data: Partial<Omit<User, 'id'>>) =>
      authService.updateProfile(data),
    onSuccess: (updatedUser: User) => {
      // Update user in cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, updatedUser)

      notifications.success(successMessage)
      customOnSuccess?.(updatedUser)
    },
    onError: (error: Error) => {
      const message = extractErrorMessage(error, errorMessage)
      notifications.error(message)
      customOnError?.(error)
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
