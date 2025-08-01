/**
 * Date Extensions
 * Extends the built-in Date object with additional utility methods
 */

declare global {
  interface DateConstructor {
    /**
     * Gets today's date at midnight
     */
    today(): Date

    /**
     * Gets yesterday's date at midnight
     */
    yesterday(): Date

    /**
     * Gets tomorrow's date at midnight
     */
    tomorrow(): Date

    /**
     * Creates a date from ISO string safely
     */
    fromISO(isoString: string): Date | null

    /**
     * Checks if date is before another date
     */
    isBefore(date1: Date, date2: Date): boolean

    /**
     * Checks if date is after another date
     */
    isAfter(date1: Date, date2: Date): boolean

    /**
     * Checks if two dates are on the same day
     */
    isSameDay(date1: Date, date2: Date): boolean
  }

  interface Date {
    /**
     * Formats date to DD/MM/YYYY
     */
    toDateString(): string

    /**
     * Formats date to DD/MM/YYYY HH:mm
     */
    toDateTimeString(): string

    /**
     * Formats date to HH:mm
     */
    toTimeString(): string

    /**
     * Adds days to current date
     */
    addDays(days: number): Date

    /**
     * Adds months to current date
     */
    addMonths(months: number): Date

    /**
     * Adds years to current date
     */
    addYears(years: number): Date

    /**
     * Checks if this date is before another date
     */
    before(other: Date): boolean

    /**
     * Checks if this date is after another date
     */
    after(other: Date): boolean

    /**
     * Checks if this date is today
     */
    isToday(): boolean

    /**
     * Gets the start of day (midnight)
     */
    startOfDay(): Date

    /**
     * Gets the end of day (23:59:59.999)
     */
    endOfDay(): Date
  }
}

// Static methods
Object.defineProperty(Date, 'today', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (): Date {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  },
})

Object.defineProperty(Date, 'yesterday', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (): Date {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)
    return yesterday
  },
})

Object.defineProperty(Date, 'tomorrow', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (): Date {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow
  },
})

Object.defineProperty(Date, 'fromISO', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (isoString: string): Date | null {
    try {
      const date = new Date(isoString)
      return isNaN(date.getTime()) ? null : date
    } catch {
      return null
    }
  },
})

Object.defineProperty(Date, 'isBefore', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime()
  },
})

Object.defineProperty(Date, 'isAfter', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime()
  },
})

Object.defineProperty(Date, 'isSameDay', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  },
})

// Instance methods
Object.defineProperty(Date.prototype, 'toDateString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): string {
    const day = this.getDate().toString().padStart(2, '0')
    const month = (this.getMonth() + 1).toString().padStart(2, '0')
    const year = this.getFullYear()
    return `${day}/${month}/${year}`
  },
})

Object.defineProperty(Date.prototype, 'toDateTimeString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): string {
    const dateStr = this.toDateString()
    const hours = this.getHours().toString().padStart(2, '0')
    const minutes = this.getMinutes().toString().padStart(2, '0')
    return `${dateStr} ${hours}:${minutes}`
  },
})

Object.defineProperty(Date.prototype, 'toTimeString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): string {
    const hours = this.getHours().toString().padStart(2, '0')
    const minutes = this.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  },
})

Object.defineProperty(Date.prototype, 'addDays', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, days: number): Date {
    const result = new Date(this)
    result.setDate(result.getDate() + days)
    return result
  },
})

Object.defineProperty(Date.prototype, 'addMonths', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, months: number): Date {
    const result = new Date(this)
    result.setMonth(result.getMonth() + months)
    return result
  },
})

Object.defineProperty(Date.prototype, 'addYears', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, years: number): Date {
    const result = new Date(this)
    result.setFullYear(result.getFullYear() + years)
    return result
  },
})

Object.defineProperty(Date.prototype, 'before', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, other: Date): boolean {
    return this.getTime() < other.getTime()
  },
})

Object.defineProperty(Date.prototype, 'after', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, other: Date): boolean {
    return this.getTime() > other.getTime()
  },
})

Object.defineProperty(Date.prototype, 'isToday', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): boolean {
    return Date.isSameDay(this, new Date())
  },
})

Object.defineProperty(Date.prototype, 'startOfDay', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): Date {
    const result = new Date(this)
    result.setHours(0, 0, 0, 0)
    return result
  },
})

Object.defineProperty(Date.prototype, 'endOfDay', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date): Date {
    const result = new Date(this)
    result.setHours(23, 59, 59, 999)
    return result
  },
})

Object.defineProperty(Date.prototype, 'between', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: Date,
    begin: Date,
    end: Date,
    option: {
      includeBegin: boolean
      includeEnd: boolean
    } = { includeBegin: true, includeEnd: true }
  ) {
    const { includeBegin = true, includeEnd = true } = option
    const isAfterStart = includeBegin ? this >= begin : this > begin
    const isBeforeEnd = includeEnd ? this <= end : this < end
    return isAfterStart && isBeforeEnd
  },
})

export {}
