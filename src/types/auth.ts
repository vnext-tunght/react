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
