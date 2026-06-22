import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidURL,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateRange,
  validateFileSize,
  validateFileType,
  validateCreditCard,
} from '../validation'

describe('validation utils', () => {
  describe('isValidEmail', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
      expect(isValidEmail('test.name@domain.org')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(isValidEmail('not-email')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('accepts valid phone numbers', () => {
      expect(isValidPhone('+1 (555) 123-4567')).toBe(true)
      expect(isValidPhone('0987654321')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(isValidPhone('abc')).toBe(false)
    })
  })

  describe('isValidPassword', () => {
    it('accepts valid passwords', () => {
      expect(isValidPassword('Password1')).toBe(true)
      expect(isValidPassword('Str0ngP@ss')).toBe(true)
    })

    it('rejects weak passwords', () => {
      expect(isValidPassword('password')).toBe(false)
      expect(isValidPassword('12345678')).toBe(false)
      expect(isValidPassword('short')).toBe(false)
    })
  })

  describe('isValidURL', () => {
    it('accepts valid URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true)
      expect(isValidURL('http://localhost:3000')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false)
      expect(isValidURL('ftp://example.com')).toBe(false)
    })
  })

  describe('validateRequired', () => {
    it('returns true for non-empty strings', () => {
      expect(validateRequired('hello')).toBe(true)
    })

    it('returns false for empty or whitespace strings', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
    })

    it('returns false for null/undefined', () => {
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
    })

    it('returns true for non-null values', () => {
      expect(validateRequired(0)).toBe(true)
      expect(validateRequired(false)).toBe(true)
    })
  })

  describe('validateMinLength', () => {
    it('returns true when length meets minimum', () => {
      expect(validateMinLength('hello', 3)).toBe(true)
      expect(validateMinLength('abc', 3)).toBe(true)
    })

    it('returns false when length is below minimum', () => {
      expect(validateMinLength('ab', 3)).toBe(false)
    })
  })

  describe('validateMaxLength', () => {
    it('returns true when length is within max', () => {
      expect(validateMaxLength('hi', 5)).toBe(true)
    })

    it('returns false when length exceeds max', () => {
      expect(validateMaxLength('hello world', 5)).toBe(false)
    })
  })

  describe('validateRange', () => {
    it('returns true for values in range', () => {
      expect(validateRange(5, 1, 10)).toBe(true)
      expect(validateRange(1, 1, 10)).toBe(true)
      expect(validateRange(10, 1, 10)).toBe(true)
    })

    it('returns false for values out of range', () => {
      expect(validateRange(0, 1, 10)).toBe(false)
      expect(validateRange(11, 1, 10)).toBe(false)
    })
  })

  describe('validateFileSize', () => {
    it('returns true for files within size limit', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' })
      Object.defineProperty(file, 'size', { value: 1024 * 1024 })
      expect(validateFileSize(file, 2)).toBe(true)
    })

    it('returns false for files exceeding size limit', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' })
      Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 })
      expect(validateFileSize(file, 2)).toBe(false)
    })
  })

  describe('validateFileType', () => {
    it('returns true for allowed types', () => {
      const file = new File([''], 'test.png', { type: 'image/png' })
      expect(validateFileType(file, ['image/png', 'image/jpeg'])).toBe(true)
    })

    it('returns false for disallowed types', () => {
      const file = new File([''], 'test.exe', {
        type: 'application/octet-stream',
      })
      expect(validateFileType(file, ['image/png'])).toBe(false)
    })
  })

  describe('validateCreditCard', () => {
    it('validates a valid card number (Luhn)', () => {
      expect(validateCreditCard('4111111111111111')).toBe(true)
      expect(validateCreditCard('5500 0000 0000 0004')).toBe(true)
    })

    it('rejects invalid card numbers', () => {
      expect(validateCreditCard('1234567890123456')).toBe(false)
      expect(validateCreditCard('abc')).toBe(false)
    })
  })
})
