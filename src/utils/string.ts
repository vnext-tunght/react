/**
 * Utility functions for string manipulation.
 *
 * These delegate to the core String prototype extensions where possible,
 * providing a functional API on top of the same shared logic.
 */
import '@core'

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.capitalize()
}

/**
 * Converts a string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str.toKebabCase()
}

/**
 * Converts a string to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Truncates a string to a specified length
 */
export const truncate = (
  str: string,
  length: number,
  suffix = '...'
): string => {
  return str.truncate(length, suffix)
}

/**
 * Removes HTML tags from a string
 */
export const stripHtml = (html: string): string => {
  return html.stripHtml()
}

/**
 * Generates a random string of specified length
 */
export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Formats a phone number (US format)
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}
