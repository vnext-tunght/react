// Main services export
export * from './api'
export * from './http'

// Backward compatibility exports
export { httpClient as apiClient } from './http/client'
export { authService as authApi } from './api/authApi'
