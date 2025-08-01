// Common types used throughout the application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}

export interface NavigationItem {
  id: string
  label: string
  path: string
  icon?: React.ComponentType
  children?: NavigationItem[]
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Theme types
export interface CustomTheme {
  mode: 'light' | 'dark'
}

// Router types
export interface RouteHandle {
  crumb?: (data?: unknown) => string
  title?: string
}

export interface RouteData {
  [key: string]: unknown
}
