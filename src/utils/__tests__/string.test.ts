import { describe, it, expect } from 'vitest'
import {
  capitalize,
  toKebabCase,
  toCamelCase,
  truncate,
  stripHtml,
  generateRandomString,
  formatPhoneNumber,
} from '../string'
import { isValidEmail } from '../validation'

describe('string utils', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('lowercases the rest', () => {
      expect(capitalize('hELLO')).toBe('Hello')
    })

    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('toKebabCase', () => {
    it('converts camelCase', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world')
    })

    it('converts spaces', () => {
      expect(toKebabCase('hello world')).toBe('hello-world')
    })

    it('converts underscores', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world')
    })
  })

  describe('toCamelCase', () => {
    it('converts space-separated words', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld')
    })

    it('converts PascalCase', () => {
      expect(toCamelCase('Hello World')).toBe('helloWorld')
    })
  })

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...')
    })

    it('does not truncate short strings', () => {
      expect(truncate('Hi', 10)).toBe('Hi')
    })

    it('uses custom suffix', () => {
      expect(truncate('Hello World', 9, '~')).toBe('Hello Wo~')
    })
  })

  describe('stripHtml', () => {
    it('removes HTML tags', () => {
      expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world')
    })

    it('returns plain text unchanged', () => {
      expect(stripHtml('plain text')).toBe('plain text')
    })
  })

  describe('isValidEmail', () => {
    it('returns true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('returns false for invalid emails', () => {
      expect(isValidEmail('not-an-email')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
    })
  })

  describe('generateRandomString', () => {
    it('generates string of specified length', () => {
      expect(generateRandomString(10)).toHaveLength(10)
      expect(generateRandomString(0)).toHaveLength(0)
    })

    it('contains only alphanumeric characters', () => {
      const result = generateRandomString(100)
      expect(result).toMatch(/^[A-Za-z0-9]+$/)
    })
  })

  describe('formatPhoneNumber', () => {
    it('formats a 10-digit number', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
    })

    it('returns original for non-matching input', () => {
      expect(formatPhoneNumber('123')).toBe('123')
    })
  })
})
