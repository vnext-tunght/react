import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  generateId,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  getInitials,
} from '../index'

describe('utils/index', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('generateId', () => {
    it('generates string of default length 8', () => {
      expect(generateId()).toHaveLength(8)
    })

    it('generates string of specified length', () => {
      expect(generateId(16)).toHaveLength(16)
    })

    it('contains only alphanumeric characters', () => {
      expect(generateId(100)).toMatch(/^[A-Za-z0-9]+$/)
    })
  })

  describe('debounce', () => {
    it('delays function execution', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const debounced = debounce(fn, 200)

      debounced()
      debounced()
      debounced()

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(200)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('resets timer on repeated calls', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced()
      vi.advanceTimersByTime(50)
      debounced()
      vi.advanceTimersByTime(50)

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('calls function immediately then throttles', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled()
      expect(fn).toHaveBeenCalledTimes(1)

      throttled()
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('deepClone', () => {
    it('clones primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(null)).toBeNull()
    })

    it('clones objects deeply', () => {
      const original = { a: 1, b: { c: 2, d: { e: 3 } } }
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
      expect(cloned.b.d).not.toBe(original.b.d)
    })

    it('clones arrays', () => {
      const original = [1, [2, 3], [4, [5]]]
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[1]).not.toBe(original[1])
    })

    it('clones Date objects', () => {
      const original = new Date('2024-01-01')
      const cloned = deepClone(original)

      expect(cloned.getTime()).toBe(original.getTime())
      expect(cloned).not.toBe(original)
    })
  })

  describe('isEmpty', () => {
    it('returns true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('returns true for empty string', () => {
      expect(isEmpty('')).toBe(true)
    })

    it('returns true for empty array', () => {
      expect(isEmpty([])).toBe(true)
    })

    it('returns true for empty object', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('returns false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('returns false for numbers', () => {
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(42)).toBe(false)
    })
  })

  describe('getInitials', () => {
    it('gets initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD')
    })

    it('limits to 2 characters', () => {
      expect(getInitials('John Michael Doe')).toBe('JM')
    })

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J')
    })
  })
})
