import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  roundTo,
  clamp,
  randomBetween,
  randomFloat,
  formatBytes,
  getPercentage,
  isEven,
  isOdd,
  toOrdinal,
} from '../number'

describe('number utils', () => {
  describe('formatCurrency', () => {
    it('formats USD by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('formats different currencies', () => {
      const result = formatCurrency(1000, 'EUR', 'de-DE')
      expect(result).toContain('1.000')
    })
  })

  describe('formatNumber', () => {
    it('formats with thousands separators', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
    })

    it('handles zero', () => {
      expect(formatNumber(0)).toBe('0')
    })
  })

  describe('formatPercentage', () => {
    it('formats a decimal as percentage', () => {
      expect(formatPercentage(0.75)).toBe('75.0%')
    })

    it('respects decimals parameter', () => {
      expect(formatPercentage(0.1234, 2)).toBe('12.34%')
    })
  })

  describe('roundTo', () => {
    it('rounds to specified decimal places', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14)
    })

    it('rounds to zero decimal places', () => {
      expect(roundTo(3.7, 0)).toBe(4)
    })
  })

  describe('clamp', () => {
    it('clamps below minimum', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('clamps above maximum', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('returns value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })
  })

  describe('randomBetween', () => {
    it('returns a number within range', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomBetween(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })
  })

  describe('randomFloat', () => {
    it('returns a float within range', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomFloat(1.0, 5.0)
        expect(result).toBeGreaterThanOrEqual(1.0)
        expect(result).toBeLessThan(5.0)
      }
    })
  })

  describe('formatBytes', () => {
    it('formats 0 bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
    })

    it('formats bytes', () => {
      expect(formatBytes(500)).toBe('500 Bytes')
    })

    it('formats kilobytes', () => {
      expect(formatBytes(1024)).toBe('1 KB')
    })

    it('formats megabytes', () => {
      expect(formatBytes(1048576)).toBe('1 MB')
    })

    it('formats gigabytes', () => {
      expect(formatBytes(1073741824)).toBe('1 GB')
    })

    it('respects decimals parameter', () => {
      expect(formatBytes(1536, 1)).toBe('1.5 KB')
    })
  })

  describe('getPercentage', () => {
    it('calculates percentage', () => {
      expect(getPercentage(25, 100)).toBe(25)
    })

    it('returns 0 when total is 0', () => {
      expect(getPercentage(5, 0)).toBe(0)
    })
  })

  describe('isEven', () => {
    it('returns true for even numbers', () => {
      expect(isEven(4)).toBe(true)
      expect(isEven(0)).toBe(true)
    })

    it('returns false for odd numbers', () => {
      expect(isEven(3)).toBe(false)
    })
  })

  describe('isOdd', () => {
    it('returns true for odd numbers', () => {
      expect(isOdd(3)).toBe(true)
    })

    it('returns false for even numbers', () => {
      expect(isOdd(4)).toBe(false)
    })
  })

  describe('toOrdinal', () => {
    it('handles 1st', () => {
      expect(toOrdinal(1)).toBe('1st')
    })

    it('handles 2nd', () => {
      expect(toOrdinal(2)).toBe('2nd')
    })

    it('handles 3rd', () => {
      expect(toOrdinal(3)).toBe('3rd')
    })

    it('handles 4th', () => {
      expect(toOrdinal(4)).toBe('4th')
    })

    it('handles 11th, 12th, 13th', () => {
      expect(toOrdinal(11)).toBe('11th')
      expect(toOrdinal(12)).toBe('12th')
      expect(toOrdinal(13)).toBe('13th')
    })

    it('handles 21st, 22nd, 23rd', () => {
      expect(toOrdinal(21)).toBe('21st')
      expect(toOrdinal(22)).toBe('22nd')
      expect(toOrdinal(23)).toBe('23rd')
    })
  })
})
