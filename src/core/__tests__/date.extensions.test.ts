import { describe, it, expect, vi, afterEach } from 'vitest'
import '../date.extensions'

describe('Date extensions', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Date.today', () => {
    it('returns today at midnight', () => {
      const today = Date.today()
      const now = new Date()
      expect(today.getFullYear()).toBe(now.getFullYear())
      expect(today.getMonth()).toBe(now.getMonth())
      expect(today.getDate()).toBe(now.getDate())
      expect(today.getHours()).toBe(0)
      expect(today.getMinutes()).toBe(0)
    })
  })

  describe('Date.yesterday', () => {
    it('returns yesterday at midnight', () => {
      const yesterday = Date.yesterday()
      const expected = new Date()
      expected.setDate(expected.getDate() - 1)
      expect(yesterday.getDate()).toBe(expected.getDate())
      expect(yesterday.getHours()).toBe(0)
    })
  })

  describe('Date.tomorrow', () => {
    it('returns tomorrow at midnight', () => {
      const tomorrow = Date.tomorrow()
      const expected = new Date()
      expected.setDate(expected.getDate() + 1)
      expect(tomorrow.getDate()).toBe(expected.getDate())
      expect(tomorrow.getHours()).toBe(0)
    })
  })

  describe('Date.fromISO', () => {
    it('parses valid ISO string', () => {
      const date = Date.fromISO('2024-06-15T12:00:00Z')
      expect(date).toBeInstanceOf(Date)
      expect(date!.getUTCFullYear()).toBe(2024)
    })

    it('returns null for invalid string', () => {
      expect(Date.fromISO('not-a-date')).toBeNull()
    })
  })

  describe('Date.isBefore / Date.isAfter', () => {
    const earlier = new Date('2024-01-01')
    const later = new Date('2024-12-31')

    it('isBefore returns true when first date is earlier', () => {
      expect(Date.isBefore(earlier, later)).toBe(true)
    })

    it('isBefore returns false when first date is later', () => {
      expect(Date.isBefore(later, earlier)).toBe(false)
    })

    it('isAfter returns true when first date is later', () => {
      expect(Date.isAfter(later, earlier)).toBe(true)
    })

    it('isAfter returns false when first date is earlier', () => {
      expect(Date.isAfter(earlier, later)).toBe(false)
    })
  })

  describe('Date.isSameDay', () => {
    it('returns true for same day', () => {
      const d1 = new Date('2024-06-15T08:00:00')
      const d2 = new Date('2024-06-15T20:00:00')
      expect(Date.isSameDay(d1, d2)).toBe(true)
    })

    it('returns false for different days', () => {
      const d1 = new Date('2024-06-15')
      const d2 = new Date('2024-06-16')
      expect(Date.isSameDay(d1, d2)).toBe(false)
    })
  })

  describe('toDateString', () => {
    it('formats as DD/MM/YYYY', () => {
      const date = new Date(2024, 0, 5)
      expect(date.toDateString()).toBe('05/01/2024')
    })
  })

  describe('toDateTimeString', () => {
    it('formats as DD/MM/YYYY HH:mm', () => {
      const date = new Date(2024, 5, 15, 14, 30)
      expect(date.toDateTimeString()).toBe('15/06/2024 14:30')
    })
  })

  describe('toTimeString', () => {
    it('formats as HH:mm', () => {
      const date = new Date(2024, 0, 1, 9, 5)
      expect(date.toTimeString()).toBe('09:05')
    })
  })

  describe('addDays', () => {
    it('adds days', () => {
      const date = new Date(2024, 0, 1)
      const result = date.addDays(5)
      expect(result.getDate()).toBe(6)
    })

    it('does not mutate original', () => {
      const date = new Date(2024, 0, 1)
      date.addDays(5)
      expect(date.getDate()).toBe(1)
    })
  })

  describe('addMonths', () => {
    it('adds months', () => {
      const date = new Date(2024, 0, 15)
      const result = date.addMonths(3)
      expect(result.getMonth()).toBe(3)
    })
  })

  describe('addYears', () => {
    it('adds years', () => {
      const date = new Date(2024, 0, 15)
      const result = date.addYears(2)
      expect(result.getFullYear()).toBe(2026)
    })
  })

  describe('before / after', () => {
    const earlier = new Date('2024-01-01')
    const later = new Date('2024-12-31')

    it('before returns true when date is earlier', () => {
      expect(earlier.before(later)).toBe(true)
    })

    it('after returns true when date is later', () => {
      expect(later.after(earlier)).toBe(true)
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(new Date().isToday()).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(yesterday.isToday()).toBe(false)
    })
  })

  describe('startOfDay / endOfDay', () => {
    it('startOfDay sets to midnight', () => {
      const date = new Date(2024, 5, 15, 14, 30)
      const result = date.startOfDay()
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
    })

    it('endOfDay sets to 23:59:59.999', () => {
      const date = new Date(2024, 5, 15, 14, 30)
      const result = date.endOfDay()
      expect(result.getHours()).toBe(23)
      expect(result.getMinutes()).toBe(59)
      expect(result.getSeconds()).toBe(59)
      expect(result.getMilliseconds()).toBe(999)
    })

    it('does not mutate original', () => {
      const date = new Date(2024, 5, 15, 14, 30)
      date.startOfDay()
      expect(date.getHours()).toBe(14)
    })
  })

  describe('between', () => {
    it('returns true when date is between (inclusive)', () => {
      const date = new Date('2024-06-15')
      const begin = new Date('2024-06-01')
      const end = new Date('2024-06-30')
      expect(date.between(begin, end)).toBe(true)
    })

    it('includes boundaries by default', () => {
      const date = new Date('2024-06-01')
      const begin = new Date('2024-06-01')
      const end = new Date('2024-06-30')
      expect(date.between(begin, end)).toBe(true)
    })

    it('excludes boundaries when configured', () => {
      const date = new Date('2024-06-01')
      const begin = new Date('2024-06-01')
      const end = new Date('2024-06-30')
      expect(
        date.between(begin, end, {
          includeBegin: false,
          includeEnd: true,
        })
      ).toBe(false)
    })

    it('returns false when date is outside range', () => {
      const date = new Date('2024-07-15')
      const begin = new Date('2024-06-01')
      const end = new Date('2024-06-30')
      expect(date.between(begin, end)).toBe(false)
    })
  })
})
