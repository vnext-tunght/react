import { REGEX_PATTERNS } from '../const'

/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE.test(phone)
}

export const isValidPassword = (password: string): boolean => {
  return REGEX_PATTERNS.PASSWORD.test(password)
}

export const isValidURL = (url: string): boolean => {
  return REGEX_PATTERNS.URL.test(url)
}

/**
 * Form validation helpers
 */
export const validateRequired = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value != null && value !== ''
}

export const validateMinLength = (
  value: string,
  minLength: number
): boolean => {
  return value.length >= minLength
}

export const validateMaxLength = (
  value: string,
  maxLength: number
): boolean => {
  return value.length <= maxLength
}

export const validateRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max
}

/**
 * File validation
 */
export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

export const validateFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type)
}

/**
 * Credit card validation (basic Luhn algorithm)
 */
export const validateCreditCard = (cardNumber: string): boolean => {
  const num = cardNumber.replace(/\s/g, '')
  if (!/^\d+$/.test(num)) return false

  let sum = 0
  let shouldDouble = false

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}
