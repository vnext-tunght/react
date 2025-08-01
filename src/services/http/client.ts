import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ENV, APP_CONFIG, HTTP_STATUS } from '../../const'

// Types for tokens
export interface TokenData {
  accessToken: string
  refreshToken: string
}

// Create axios instance
export const httpClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token management
export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY =
    APP_CONFIG.STORAGE_KEYS.ACCESS_TOKEN
  private static readonly REFRESH_TOKEN_KEY =
    APP_CONFIG.STORAGE_KEYS.REFRESH_TOKEN

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static setTokens(tokens: TokenData): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }
}

// Request interceptor to add auth header
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenManager.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401/403 errors and refresh token
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async error => {
    const originalRequest = error.config

    // Handle 401 (Unauthorized) or 403 (Forbidden) errors
    if (
      (error.response?.status === HTTP_STATUS.UNAUTHORIZED ||
        error.response?.status === HTTP_STATUS.FORBIDDEN) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const refreshToken = TokenManager.getRefreshToken()

      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await axios.post(`${ENV.API_URL}/auth/refresh`, {
            refreshToken,
          })

          const { accessToken, refreshToken: newRefreshToken } = response.data

          // Update tokens
          TokenManager.setTokens({
            accessToken,
            refreshToken: newRefreshToken,
          })

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return httpClient(originalRequest)
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          TokenManager.clearTokens()
          window.dispatchEvent(new CustomEvent('auth:logout'))
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, clear tokens and redirect to login
        TokenManager.clearTokens()
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    }

    return Promise.reject(error)
  }
)

// Legacy export for backward compatibility
export const apiClient = httpClient
