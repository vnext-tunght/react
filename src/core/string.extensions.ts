/**
 * String Extensions
 * Extends the built-in String object with additional utility methods
 */

declare global {
  interface String {
    /**
     * Capitalizes first letter of string
     */
    capitalize(): string

    /**
     * Converts string to camelCase
     */
    toCamelCase(): string

    /**
     * Converts string to PascalCase
     */
    toPascalCase(): string

    /**
     * Converts string to kebab-case
     */
    toKebabCase(): string

    /**
     * Converts string to snake_case
     */
    toSnakeCase(): string

    /**
     * Truncates string to specified length with ellipsis
     */
    truncate(length: number, suffix?: string): string

    /**
     * Removes all whitespace
     */
    removeWhitespace(): string

    /**
     * Checks if string contains only digits
     */
    isNumeric(): boolean

    /**
     * Checks if string is a valid email
     */
    isEmail(): boolean

    /**
     * Checks if string is a valid URL
     */
    isUrl(): boolean

    /**
     * Checks if string is empty or only whitespace
     */
    isBlank(): boolean

    /**
     * Reverses the string
     */
    reverse(): string

    /**
     * Counts occurrences of substring
     */
    count(substring: string): number

    /**
     * Removes HTML tags
     */
    stripHtml(): string

    /**
     * Escapes HTML characters
     */
    escapeHtml(): string

    /**
     * Converts to title case
     */
    toTitleCase(): string

    /**
     * Extracts numbers from string
     */
    extractNumbers(): number[]

    /**
     * Masks string with specified character
     */
    mask(visibleChars?: number, maskChar?: string): string

    /**
     * Converts Vietnamese text to non-accented
     */
    toNonAccented(): string

    /**
     * Formats as Vietnamese phone number
     */
    toPhoneFormat(): string
  }
}

Object.defineProperty(String.prototype, 'capitalize', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    if (!this) return this
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
  },
})

Object.defineProperty(String.prototype, 'toCamelCase', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(/[-_\s]+(.)?/g, (_, char) =>
      char ? char.toUpperCase() : ''
    )
  },
})

Object.defineProperty(String.prototype, 'toPascalCase', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    const camelCase = this.toCamelCase()
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
  },
})

Object.defineProperty(String.prototype, 'toKebabCase', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  },
})

Object.defineProperty(String.prototype, 'toSnakeCase', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase()
  },
})

Object.defineProperty(String.prototype, 'truncate', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: string,
    length: number,
    suffix: string = '...'
  ): string {
    if (this.length <= length) return this
    return this.slice(0, length - suffix.length) + suffix
  },
})

Object.defineProperty(String.prototype, 'removeWhitespace', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(/\s/g, '')
  },
})

Object.defineProperty(String.prototype, 'isNumeric', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): boolean {
    return /^\d+$/.test(this)
  },
})

Object.defineProperty(String.prototype, 'isEmail', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this)
  },
})

Object.defineProperty(String.prototype, 'isUrl', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): boolean {
    try {
      new URL(this)
      return true
    } catch {
      return false
    }
  },
})

Object.defineProperty(String.prototype, 'isBlank', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): boolean {
    return !this || this.trim() === ''
  },
})

Object.defineProperty(String.prototype, 'reverse', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.split('').reverse().join('')
  },
})

Object.defineProperty(String.prototype, 'count', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string, substring: string): number {
    if (!substring) return 0
    return (this.match(new RegExp(substring, 'g')) || []).length
  },
})

Object.defineProperty(String.prototype, 'stripHtml', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(/<[^>]*>/g, '')
  },
})

Object.defineProperty(String.prototype, 'escapeHtml', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return this.replace(/[&<>"']/g, char => map[char])
  },
})

Object.defineProperty(String.prototype, 'toTitleCase', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    return this.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  },
})

Object.defineProperty(String.prototype, 'extractNumbers', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): number[] {
    const matches = this.match(/\d+/g)
    return matches ? matches.map(Number) : []
  },
})

Object.defineProperty(String.prototype, 'mask', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: string,
    visibleChars: number = 4,
    maskChar: string = '*'
  ): string {
    if (this.length <= visibleChars) return this
    const visiblePart = this.slice(-visibleChars)
    const maskedPart = maskChar.repeat(this.length - visibleChars)
    return maskedPart + visiblePart
  },
})

Object.defineProperty(String.prototype, 'toNonAccented', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    const accents: Record<string, string> = {
      'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ': 'a',
      'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ': 'e',
      'ì|í|ị|ỉ|ĩ': 'i',
      'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ': 'o',
      'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ': 'u',
      'ỳ|ý|ỵ|ỷ|ỹ': 'y',
      đ: 'd',
      'À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ': 'A',
      'È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ': 'E',
      'Ì|Í|Ị|Ỉ|Ĩ': 'I',
      'Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ': 'O',
      'Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ': 'U',
      'Ỳ|Ý|Ỵ|Ỷ|Ỹ': 'Y',
      Đ: 'D',
    }

    return Object.entries(accents).reduce((text, [accented, plain]) => {
      return text.replace(new RegExp(accented, 'g'), plain)
    }, this)
  },
})

Object.defineProperty(String.prototype, 'toPhoneFormat', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string): string {
    const cleaned = this.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
    }
    if (cleaned.length === 11 && cleaned.startsWith('84')) {
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4')
    }
    return this
  },
})

export {}
