/**
 * Utility functions for number formatting and manipulation
 */

/**
 * Formats a number as currency
 */
export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Formats a number with commas as thousands separators
 */
export const formatNumber = (num: number, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Formats a number as percentage
 */
export const formatPercentage = (
  value: number,
  decimals = 1,
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Rounds a number to specified decimal places
 */
export const roundTo = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

/**
 * Clamps a number between min and max values
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}

/**
 * Generates a random number between min and max (inclusive)
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a random float between min and max
 */
export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

/**
 * Converts bytes to human readable format
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Calculates percentage of value from total
 */
export const getPercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Checks if a number is even
 */
export const isEven = (num: number): boolean => {
  return num % 2 === 0
}

/**
 * Checks if a number is odd
 */
export const isOdd = (num: number): boolean => {
  return num % 2 !== 0
}

/**
 * Converts a number to ordinal string (1st, 2nd, 3rd, etc.)
 */
export const toOrdinal = (num: number): string => {
  const suffix = ['th', 'st', 'nd', 'rd']
  const value = num % 100
  return num + (suffix[(value - 20) % 10] || suffix[value] || suffix[0])
}
