import { httpClient } from '../http/client'

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface MessageResponse {
  message: string
}

// Auth Service
export const authService = {
  /**
   * Login user with email and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await httpClient.get<User>('/auth/me')
    return response.data
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    })
    return response.data
  },

  /**
   * Send forgot password email
   */
  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<MessageResponse> => {
    const response = await httpClient.post<MessageResponse>(
      '/auth/forgot-password',
      data
    )
    return response.data
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<MessageResponse> => {
    const response = await httpClient.post<MessageResponse>(
      '/auth/reset-password',
      data
    )
    return response.data
  },

  /**
   * Change password for authenticated user
   */
  changePassword: async (data: {
    currentPassword: string
    newPassword: string
  }): Promise<MessageResponse> => {
    const response = await httpClient.post<MessageResponse>(
      '/auth/change-password',
      data
    )
    return response.data
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<Omit<User, 'id'>>): Promise<User> => {
    const response = await httpClient.put<User>('/auth/profile', data)
    return response.data
  },
}
