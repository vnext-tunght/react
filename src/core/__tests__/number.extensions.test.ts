import { describe, it, expect } from 'vitest'
import '../number.extensions'

describe('Number extensions', () => {
  describe('round', () => {
    it('rounds to specified decimal places', () => {
      expect((3.14159).round(2)).toBe(3.14)
    })

    it('rounds to zero decimals', () => {
      expect((3.7).round(0)).toBe(4)
    })
  })

  describe('toCurrency', () => {
    it('formats as USD by default', () => {
      expect((1234.56).toCurrency()).toBe('$1,234.56')
    })

    it('formats as different currency', () => {
      const result = (1000).toCurrency('EUR', 'de-DE')
      expect(result).toContain('1.000')
    })
  })

  describe('toPercent', () => {
    it('converts to percentage string', () => {
      expect((0.75).toPercent()).toBe('75.00%')
    })

    it('respects decimal places', () => {
      expect((0.1234).toPercent(1)).toBe('12.3%')
    })
  })

  describe('toFormatted', () => {
    it('formats with thousands separators', () => {
      expect((1234567).toFormatted()).toBe('1,234,567')
    })
  })

  describe('between', () => {
    it('returns true when in range', () => {
      expect((5).between(1, 10)).toBe(true)
    })

    it('includes boundaries', () => {
      expect((1).between(1, 10)).toBe(true)
      expect((10).between(1, 10)).toBe(true)
    })

    it('returns false when out of range', () => {
      expect((15).between(1, 10)).toBe(false)
    })
  })

  describe('clamp', () => {
    it('clamps below minimum', () => {
      expect((-5).clamp(0, 10)).toBe(0)
    })

    it('clamps above maximum', () => {
      expect((15).clamp(0, 10)).toBe(10)
    })

    it('returns value when in range', () => {
      expect((5).clamp(0, 10)).toBe(5)
    })
  })

  describe('isEven / isOdd', () => {
    it('isEven returns true for even numbers', () => {
      expect((4).isEven()).toBe(true)
      expect((0).isEven()).toBe(true)
    })

    it('isEven returns false for odd numbers', () => {
      expect((3).isEven()).toBe(false)
    })

    it('isOdd returns true for odd numbers', () => {
      expect((3).isOdd()).toBe(true)
    })

    it('isOdd returns false for even numbers', () => {
      expect((4).isOdd()).toBe(false)
    })
  })

  describe('isPositive / isNegative / isZero', () => {
    it('isPositive', () => {
      expect((5).isPositive()).toBe(true)
      expect((-1).isPositive()).toBe(false)
      expect((0).isPositive()).toBe(false)
    })

    it('isNegative', () => {
      expect((-5).isNegative()).toBe(true)
      expect((1).isNegative()).toBe(false)
      expect((0).isNegative()).toBe(false)
    })

    it('isZero', () => {
      expect((0).isZero()).toBe(true)
      expect((1).isZero()).toBe(false)
    })
  })

  describe('abs', () => {
    it('returns absolute value', () => {
      expect((-5).abs()).toBe(5)
      expect((5).abs()).toBe(5)
      expect((0).abs()).toBe(0)
    })
  })

  describe('toVND', () => {
    it('formats as Vietnamese currency', () => {
      const result = (1000000).toVND()
      expect(result).toContain('1.000.000')
    })
  })

  describe('toUSD', () => {
    it('formats as US currency', () => {
      expect((1234.56).toUSD()).toBe('$1,234.56')
    })
  })
})
