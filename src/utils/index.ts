// Export all utility modules
export * from './string'
export * from './date'
export * from './number'
export * from './storage'
export * from './error'

// Re-export generateRandomString as generateId for backward compatibility
import { generateRandomString } from './string'
export const generateId = (length = 8): string => generateRandomString(length)

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Deep clone object — delegates to Object.deepClone from core extensions
 */
export const deepClone = <T>(obj: T): T => {
  return Object.deepClone(obj)
}

/**
 * Check if object is empty — delegates to Object.isEmpty from core extensions
 */
export const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) return true
  if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.isEmpty(obj)
  return false
}

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
