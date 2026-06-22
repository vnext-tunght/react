import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  formatDate,
  formatDateISO,
  getRelativeTime,
  isToday,
  isPast,
  isFuture,
  addDays,
  subtractDays,
  startOfDay,
  endOfDay,
} from '../date'

describe('date utils', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('formatDate', () => {
    it('formats a Date object', () => {
      const result = formatDate(new Date('2024-01-15'))
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('formats a date string', () => {
      const result = formatDate('2024-06-01')
      expect(result).toContain('Jun')
      expect(result).toContain('2024')
    })

    it('formats a timestamp number', () => {
      const ts = new Date('2024-03-10').getTime()
      const result = formatDate(ts)
      expect(result).toContain('Mar')
      expect(result).toContain('2024')
    })

    it('returns "Invalid Date" for invalid input', () => {
      expect(formatDate('not-a-date')).toBe('Invalid Date')
    })

    it('accepts custom options', () => {
      const result = formatDate(new Date('2024-01-15'), {
        weekday: 'long',
      })
      expect(result).toContain('Monday')
    })
  })

  describe('formatDateISO', () => {
    it('formats a date to YYYY-MM-DD', () => {
      expect(formatDateISO(new Date('2024-07-04T12:00:00Z'))).toBe('2024-07-04')
    })

    it('returns empty string for invalid date', () => {
      expect(formatDateISO('invalid')).toBe('')
    })
  })

  describe('getRelativeTime', () => {
    it('returns "just now" for dates less than 60 seconds ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-01T12:00:30'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe('just now')
    })

    it('returns minutes ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-01T12:05:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '5 minutes ago'
      )
    })

    it('returns singular minute', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-01T12:01:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '1 minute ago'
      )
    })

    it('returns hours ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-01T15:00:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '3 hours ago'
      )
    })

    it('returns singular hour', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-01T13:00:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '1 hour ago'
      )
    })

    it('returns days ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-05T12:00:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '4 days ago'
      )
    })

    it('returns months ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-09-01T12:00:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '3 months ago'
      )
    })

    it('returns years ago', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-06-01T12:00:00'))
      expect(getRelativeTime(new Date('2024-06-01T12:00:00'))).toBe(
        '2 years ago'
      )
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isPast', () => {
    it('returns true for past dates', () => {
      expect(isPast(new Date('2020-01-01'))).toBe(true)
    })

    it('returns false for future dates', () => {
      expect(isPast(new Date('2099-01-01'))).toBe(false)
    })
  })

  describe('isFuture', () => {
    it('returns true for future dates', () => {
      expect(isFuture(new Date('2099-01-01'))).toBe(true)
    })

    it('returns false for past dates', () => {
      expect(isFuture(new Date('2020-01-01'))).toBe(false)
    })
  })

  describe('addDays', () => {
    it('adds days to a date', () => {
      const date = new Date('2024-01-01T00:00:00Z')
      const result = addDays(date, 5)
      expect(result.getUTCDate()).toBe(6)
    })

    it('handles negative days', () => {
      const date = new Date('2024-01-10T00:00:00Z')
      const result = addDays(date, -3)
      expect(result.getUTCDate()).toBe(7)
    })
  })

  describe('subtractDays', () => {
    it('subtracts days from a date', () => {
      const date = new Date('2024-01-10T00:00:00Z')
      const result = subtractDays(date, 5)
      expect(result.getUTCDate()).toBe(5)
    })
  })

  describe('startOfDay', () => {
    it('sets time to 00:00:00.000', () => {
      const result = startOfDay(new Date('2024-06-15T14:30:00'))
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
    })
  })

  describe('endOfDay', () => {
    it('sets time to 23:59:59.999', () => {
      const result = endOfDay(new Date('2024-06-15T14:30:00'))
      expect(result.getHours()).toBe(23)
      expect(result.getMinutes()).toBe(59)
      expect(result.getSeconds()).toBe(59)
      expect(result.getMilliseconds()).toBe(999)
    })
  })
})
