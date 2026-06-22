/**
 * Browser storage utilities with TypeScript support
 */

/**
 * LocalStorage utilities with JSON support
 */
export const localStorage = {
  /**
   * Set item in localStorage with JSON serialization
   */
  setItem: <T>(key: string, value: T): boolean => {
    try {
      const serializedValue = JSON.stringify(value)
      window.localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error('Error setting localStorage item:', error)
      return false
    }
  },

  /**
   * Get item from localStorage with JSON parsing
   */
  getItem: <T>(key: string): T | null => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return null
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Error getting localStorage item:', error)
      return null
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing localStorage item:', error)
      return false
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): boolean => {
    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },

  /**
   * Check if localStorage is available
   */
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__'
      window.localStorage.setItem(test, test)
      window.localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  },
}

/**
 * SessionStorage utilities with JSON support
 */
export const sessionStorage = {
  /**
   * Set item in sessionStorage with JSON serialization
   */
  setItem: <T>(key: string, value: T): boolean => {
    try {
      const serializedValue = JSON.stringify(value)
      window.sessionStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error('Error setting sessionStorage item:', error)
      return false
    }
  },

  /**
   * Get item from sessionStorage with JSON parsing
   */
  getItem: <T>(key: string): T | null => {
    try {
      const item = window.sessionStorage.getItem(key)
      if (item === null) return null
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Error getting sessionStorage item:', error)
      return null
    }
  },

  /**
   * Remove item from sessionStorage
   */
  removeItem: (key: string): boolean => {
    try {
      window.sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing sessionStorage item:', error)
      return false
    }
  },

  /**
   * Clear all sessionStorage
   */
  clear: (): boolean => {
    try {
      window.sessionStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
      return false
    }
  },

  /**
   * Check if sessionStorage is available
   */
  isAvailable: (): boolean => {
    try {
      const test = '__sessionStorage_test__'
      window.sessionStorage.setItem(test, test)
      window.sessionStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  },
}

/**
 * Cookie utilities
 */
export const cookie = {
  /**
   * Set a cookie
   */
  set: (
    name: string,
    value: string,
    options: {
      expires?: Date
      maxAge?: number
      domain?: string
      path?: string
      secure?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
    } = {}
  ): void => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    if (options.path) {
      cookieString += `; path=${options.path}`
    }

    if (options.secure) {
      cookieString += '; secure'
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  },

  /**
   * Get a cookie value
   */
  get: (name: string): string | null => {
    const nameEQ = encodeURIComponent(name) + '='
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(
          cookie.substring(nameEQ.length, cookie.length)
        )
      }
    }

    return null
  },

  /**
   * Remove a cookie
   */
  remove: (
    name: string,
    options: {
      domain?: string
      path?: string
    } = {}
  ): void => {
    cookie.set(name, '', {
      expires: new Date(0),
      domain: options.domain,
      path: options.path,
    })
  },

  /**
   * Check if cookies are enabled
   */
  isEnabled: (): boolean => {
    try {
      const test = '__cookie_test__'
      cookie.set(test, 'test')
      const result = cookie.get(test) === 'test'
      cookie.remove(test)
      return result
    } catch {
      return false
    }
  },
}
