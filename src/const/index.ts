// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Legacy support

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'React Base App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',

  // Authentication
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || 'dev-secret-key',

  // Features
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW === 'true',

  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',

  // Environment
  NODE_ENV: import.meta.env.MODE,
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const

// Validate required environment variables in production
if (ENV.IS_PRODUCTION) {
  const requiredVars = ['API_BASE_URL', 'JWT_SECRET'] as const

  requiredVars.forEach(varName => {
    if (!ENV[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`)
    }
  })
}

// App configuration
export const APP_CONFIG = {
  // API
  API_TIMEOUT: 10000,

  // Cache times (in milliseconds)
  CACHE_TIME: {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 15 * 60 * 1000, // 15 minutes
    LONG: 60 * 60 * 1000, // 1 hour
  },

  // Local storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PREFERENCES: 'user_preferences',
  },

  // Routes
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    PROFILE: '/profile',
    SETTINGS: '/settings',
  },

  // UI Settings
  UI: {
    SIDEBAR_WIDTH: 240,
    HEADER_HEIGHT: 64,
    MOBILE_BREAKPOINT: 'sm',
  },
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

// Common regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[\d\s\-()]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/.+/,
} as const

// Error messages
// @deprecated Use useErrorMessages() hook from @hooks/common instead for i18n support
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const

// Success messages
// @deprecated Use useSuccessMessages() hook from @hooks/common instead for i18n support
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  LOGOUT: 'Successfully logged out!',
  SAVE: 'Changes saved successfully!',
  DELETE: 'Item deleted successfully!',
  CREATE: 'Item created successfully!',
  UPDATE: 'Item updated successfully!',
} as const
