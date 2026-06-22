import { AxiosError } from 'axios'

interface ApiErrorData {
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

/**
 * Extract a human-readable error message from an unknown error.
 * Handles Axios errors (with response body), native Errors, and unknown types.
 */
export function extractErrorMessage(
  error: unknown,
  fallback = 'An unexpected error occurred'
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorData | undefined
    if (data?.message) return data.message
    if (data?.error) return data.error
    if (error.message) return error.message
    return fallback
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  if (typeof error === 'string') {
    return error
  }

  return fallback
}
