/**
 * Number Extensions
 * Extends the built-in Number object with additional utility methods
 */

declare global {
  interface Number {
    /**
     * Rounds number to specified decimal places
     */
    round(decimalPoint: number): number

    /**
     * Converts number to currency format
     */
    toCurrency(currency?: string, locale?: string): string

    /**
     * Converts number to percentage format
     */
    toPercent(decimalPlaces?: number): string

    /**
     * Converts number to formatted string with thousand separators
     */
    toFormatted(locale?: string): string

    /**
     * Checks if number is between min and max (inclusive)
     */
    between(min: number, max: number): boolean

    /**
     * Clamps number between min and max values
     */
    clamp(min: number, max: number): number

    /**
     * Checks if number is even
     */
    isEven(): boolean

    /**
     * Checks if number is odd
     */
    isOdd(): boolean

    /**
     * Checks if number is positive
     */
    isPositive(): boolean

    /**
     * Checks if number is negative
     */
    isNegative(): boolean

    /**
     * Checks if number is zero
     */
    isZero(): boolean

    /**
     * Gets absolute value
     */
    abs(): number

    /**
     * Converts to Vietnamese currency format
     */
    toVND(): string

    /**
     * Converts to US currency format
     */
    toUSD(): string
  }
}

Object.defineProperty(Number.prototype, 'round', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number, decimalPoint: number): number {
    if (!this && this !== 0) return 0
    return Number(this.toFixed(decimalPoint))
  },
})

Object.defineProperty(Number.prototype, 'toCurrency', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(this)
  },
})

Object.defineProperty(Number.prototype, 'toPercent', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number, decimalPlaces: number = 2): string {
    return `${(this * 100).toFixed(decimalPlaces)}%`
  },
})

Object.defineProperty(Number.prototype, 'toFormatted', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale).format(this)
  },
})

Object.defineProperty(Number.prototype, 'between', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number, min: number, max: number): boolean {
    return this >= min && this <= max
  },
})

Object.defineProperty(Number.prototype, 'clamp', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number, min: number, max: number): number {
    return Math.min(Math.max(this, min), max)
  },
})

Object.defineProperty(Number.prototype, 'isEven', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): boolean {
    return this % 2 === 0
  },
})

Object.defineProperty(Number.prototype, 'isOdd', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): boolean {
    return this % 2 !== 0
  },
})

Object.defineProperty(Number.prototype, 'isPositive', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): boolean {
    return this > 0
  },
})

Object.defineProperty(Number.prototype, 'isNegative', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): boolean {
    return this < 0
  },
})

Object.defineProperty(Number.prototype, 'isZero', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): boolean {
    return this === 0
  },
})

Object.defineProperty(Number.prototype, 'abs', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): number {
    return Math.abs(this)
  },
})

Object.defineProperty(Number.prototype, 'toVND', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(this)
  },
})

Object.defineProperty(Number.prototype, 'toUSD', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this)
  },
})

export {}
