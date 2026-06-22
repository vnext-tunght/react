/**
 * Utility functions for date manipulation.
 *
 * These delegate to the core Date prototype extensions where possible,
 * providing a functional API on top of the same shared logic.
 */
import '@core'

/**
 * Formats a date to a readable string
 */
export const formatDate = (
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Formats a date to ISO string (YYYY-MM-DD)
 */
export const formatDateISO = (date: Date | string | number): string => {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
    return ''
  }

  return dateObj.toISOString().split('T')[0]
}

/**
 * Gets relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: Date | string | number): string => {
  const now = new Date()
  const dateObj = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

/**
 * Checks if a date is today
 */
export const isToday = (date: Date | string | number): boolean => {
  const dateObj = new Date(date)
  return dateObj.isToday()
}

/**
 * Checks if a date is in the past
 */
export const isPast = (date: Date | string | number): boolean => {
  const dateObj = new Date(date)
  return dateObj.before(new Date())
}

/**
 * Checks if a date is in the future
 */
export const isFuture = (date: Date | string | number): boolean => {
  const dateObj = new Date(date)
  return dateObj.after(new Date())
}

/**
 * Adds days to a date
 */
export const addDays = (date: Date | string | number, days: number): Date => {
  const dateObj = new Date(date)
  return dateObj.addDays(days)
}

/**
 * Subtracts days from a date
 */
export const subtractDays = (
  date: Date | string | number,
  days: number
): Date => {
  return addDays(date, -days)
}

/**
 * Gets the start of day (00:00:00)
 */
export const startOfDay = (date: Date | string | number): Date => {
  const dateObj = new Date(date)
  return dateObj.startOfDay()
}

/**
 * Gets the end of day (23:59:59)
 */
export const endOfDay = (date: Date | string | number): Date => {
  const dateObj = new Date(date)
  return dateObj.endOfDay()
}
