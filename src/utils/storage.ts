/**
 * Browser storage utilities with TypeScript support
 */

interface StorageAdapter {
  setItem: <T>(key: string, value: T) => boolean
  getItem: <T>(key: string) => T | null
  removeItem: (key: string) => boolean
  clear: () => boolean
  isAvailable: () => boolean
}

/**
 * Factory function that creates a typed storage adapter for a given Storage backend.
 * Eliminates duplication between localStorage and sessionStorage utilities.
 */
function createStorageAdapter(storage: Storage, label: string): StorageAdapter {
  return {
    setItem: <T>(key: string, value: T): boolean => {
      try {
        const serializedValue = JSON.stringify(value)
        storage.setItem(key, serializedValue)
        return true
      } catch (error) {
        console.error(`Error setting ${label} item:`, error)
        return false
      }
    },

    getItem: <T>(key: string): T | null => {
      try {
        const item = storage.getItem(key)
        if (item === null) return null
        return JSON.parse(item) as T
      } catch (error) {
        console.error(`Error getting ${label} item:`, error)
        return null
      }
    },

    removeItem: (key: string): boolean => {
      try {
        storage.removeItem(key)
        return true
      } catch (error) {
        console.error(`Error removing ${label} item:`, error)
        return false
      }
    },

    clear: (): boolean => {
      try {
        storage.clear()
        return true
      } catch (error) {
        console.error(`Error clearing ${label}:`, error)
        return false
      }
    },

    isAvailable: (): boolean => {
      try {
        const test = `__${label}_test__`
        storage.setItem(test, test)
        storage.removeItem(test)
        return true
      } catch {
        return false
      }
    },
  }
}

/**
 * LocalStorage utilities with JSON support
 */
export const localStorage = createStorageAdapter(
  window.localStorage,
  'localStorage'
)

/**
 * SessionStorage utilities with JSON support
 */
export const sessionStorage = createStorageAdapter(
  window.sessionStorage,
  'sessionStorage'
)

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
