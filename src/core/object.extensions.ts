/**
 * Object Extensions
 * Extends the built-in Object with additional utility methods
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface ObjectConstructor {
    /**
     * Checks if object is empty
     */
    isEmpty(obj: object): boolean

    /**
     * Checks if object is not empty
     */
    isNotEmpty(obj: object): boolean

    /**
     * Gets nested property safely
     */
    get(obj: Record<string, any>, path: string, defaultValue?: any): any

    /**
     * Sets nested property safely
     */
    set(obj: Record<string, any>, path: string, value: any): void

    /**
     * Deep clones an object
     */
    deepClone<T>(obj: T): T

    /**
     * Deep merges objects
     */
    deepMerge<T extends object>(...objects: Partial<T>[]): T

    /**
     * Picks specified keys from object
     */
    pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>

    /**
     * Omits specified keys from object
     */
    omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>

    /**
     * Maps object values
     */
    mapValues<T, U>(
      obj: Record<string, T>,
      fn: (value: T, key: string) => U
    ): Record<string, U>

    /**
     * Maps object keys
     */
    mapKeys<T>(
      obj: Record<string, T>,
      fn: (key: string, value: T) => string
    ): Record<string, T>

    /**
     * Converts object to query string
     */
    toQueryString(obj: Record<string, any>): string

    /**
     * Converts query string to object
     */
    fromQueryString(queryString: string): Record<string, string>
  }
}

Object.defineProperty(Object, 'isEmpty', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (obj: object): boolean {
    if (!obj) return true
    return Object.keys(obj).length === 0
  },
})

Object.defineProperty(Object, 'isNotEmpty', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (obj: object): boolean {
    return !Object.isEmpty(obj)
  },
})

Object.defineProperty(Object, 'get', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (obj: any, path: string, defaultValue?: any): any {
    if (!obj || !path) return defaultValue

    const keys = path.split('.')
    let result = obj

    for (const key of keys) {
      if (result == null || !(key in result)) {
        return defaultValue
      }
      result = result[key]
    }

    return result
  },
})

Object.defineProperty(Object, 'set', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (obj: any, path: string, value: any): void {
    if (!obj || !path) return

    const keys = path.split('.')
    let current = obj

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = value
  },
})

Object.defineProperty(Object, 'deepClone', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T
    }

    if (obj instanceof Array) {
      return obj.map(item => Object.deepClone(item)) as unknown as T
    }

    if (typeof obj === 'object') {
      const copy = {} as T
      Object.keys(obj).forEach(key => {
        ;(copy as any)[key] = Object.deepClone((obj as any)[key])
      })
      return copy
    }

    return obj
  },
})

Object.defineProperty(Object, 'deepMerge', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T extends object>(...objects: Partial<T>[]): T {
    if (objects.length === 0) return {} as T
    if (objects.length === 1) return Object.deepClone(objects[0]) as T

    const result = {} as T

    for (const obj of objects) {
      if (!obj) continue

      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          ;(result as any)[key] = Object.deepMerge(
            (result as any)[key] || {},
            value
          )
        } else {
          ;(result as any)[key] = value
        }
      }
    }

    return result
  },
})

Object.defineProperty(Object, 'pick', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> {
    const result = {} as Pick<T, K>
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    return result
  },
})

Object.defineProperty(Object, 'omit', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj } as any
    keys.forEach(key => {
      delete result[key]
    })
    return result
  },
})

Object.defineProperty(Object, 'mapValues', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T, U>(
    obj: Record<string, T>,
    fn: (value: T, key: string) => U
  ): Record<string, U> {
    const result: Record<string, U> = {}
    Object.entries(obj).forEach(([key, value]) => {
      result[key] = fn(value, key)
    })
    return result
  },
})

Object.defineProperty(Object, 'mapKeys', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(
    obj: Record<string, T>,
    fn: (key: string, value: T) => string
  ): Record<string, T> {
    const result: Record<string, T> = {}
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = fn(key, value)
      result[newKey] = value
    })
    return result
  },
})

Object.defineProperty(Object, 'toQueryString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (obj: Record<string, any>): string {
    const params = new URLSearchParams()

    Object.entries(obj).forEach(([key, value]) => {
      if (value != null) {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(key, String(item)))
        } else {
          params.append(key, String(value))
        }
      }
    })

    return params.toString()
  },
})

Object.defineProperty(Object, 'fromQueryString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (queryString: string): Record<string, string> {
    const params = new URLSearchParams(
      queryString.startsWith('?') ? queryString.slice(1) : queryString
    )
    const result: Record<string, string> = {}

    params.forEach((value, key) => {
      result[key] = value
    })

    return result
  },
})

export {}
