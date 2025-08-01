/**
 * Array Extensions
 * Extends the built-in Array object with additional utility methods
 */

declare global {
  interface Array<T> {
    /**
     * Removes duplicates from array
     */
    unique(): T[]

    /**
     * Groups array elements by a key function
     */
    groupBy<K extends string | number>(keyFn: (item: T) => K): Record<K, T[]>

    /**
     * Gets random element from array
     */
    random(): T | undefined

    /**
     * Shuffles array elements randomly
     */
    shuffle(): T[]

    /**
     * Chunks array into smaller arrays of specified size
     */
    chunk(size: number): T[][]

    /**
     * Removes falsy values from array
     */
    compact(): T[]

    /**
     * Flattens nested arrays
     */
    flatten(): T[]

    /**
     * Gets first element or undefined
     */
    first(): T | undefined

    /**
     * Gets last element or undefined
     */
    last(): T | undefined

    /**
     * Removes element at index and returns new array
     */
    removeAt(index: number): T[]

    /**
     * Removes all occurrences of value
     */
    remove(value: T): T[]

    /**
     * Inserts element at specified index
     */
    insertAt(index: number, value: T): T[]

    /**
     * Checks if array is empty
     */
    isEmpty(): boolean

    /**
     * Checks if array is not empty
     */
    isNotEmpty(): boolean

    /**
     * Gets sum of numeric values
     */
    sum(): number

    /**
     * Gets average of numeric values
     */
    average(): number

    /**
     * Gets minimum value
     */
    min(): T | undefined

    /**
     * Gets maximum value
     */
    max(): T | undefined

    /**
     * Counts occurrences of each element
     */
    count(): Record<string, number>

    /**
     * Takes first n elements
     */
    take(count: number): T[]

    /**
     * Skips first n elements
     */
    skip(count: number): T[]

    /**
     * Partitions array into two arrays based on predicate
     */
    partition(predicate: (item: T) => boolean): [T[], T[]]

    /**
     * Intersects with another array
     */
    intersect(other: T[]): T[]

    /**
     * Gets difference with another array
     */
    difference(other: T[]): T[]

    /**
     * Gets union with another array
     */
    union(other: T[]): T[]
  }
}

Object.defineProperty(Array.prototype, 'unique', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T[] {
    return [...new Set(this)]
  },
})

Object.defineProperty(Array.prototype, 'groupBy', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T, K extends string | number>(
    this: T[],
    keyFn: (item: T) => K
  ): Record<K, T[]> {
    return this.reduce(
      (groups, item) => {
        const key = keyFn(item)
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(item)
        return groups
      },
      {} as Record<K, T[]>
    )
  },
})

Object.defineProperty(Array.prototype, 'random', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T | undefined {
    return this.length > 0
      ? this[Math.floor(Math.random() * this.length)]
      : undefined
  },
})

Object.defineProperty(Array.prototype, 'shuffle', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T[] {
    const result = [...this]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  },
})

Object.defineProperty(Array.prototype, 'chunk', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < this.length; i += size) {
      chunks.push(this.slice(i, i + size))
    }
    return chunks
  },
})

Object.defineProperty(Array.prototype, 'compact', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T[] {
    return this.filter(Boolean)
  },
})

Object.defineProperty(Array.prototype, 'flatten', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T[] {
    return this.flat(Infinity) as T[]
  },
})

Object.defineProperty(Array.prototype, 'first', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T | undefined {
    return this[0]
  },
})

Object.defineProperty(Array.prototype, 'last', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T | undefined {
    return this[this.length - 1]
  },
})

Object.defineProperty(Array.prototype, 'removeAt', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], index: number): T[] {
    return this.filter((_, i) => i !== index)
  },
})

Object.defineProperty(Array.prototype, 'remove', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], value: T): T[] {
    return this.filter(item => item !== value)
  },
})

Object.defineProperty(Array.prototype, 'insertAt', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], index: number, value: T): T[] {
    const result = [...this]
    result.splice(index, 0, value)
    return result
  },
})

Object.defineProperty(Array.prototype, 'isEmpty', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): boolean {
    return this.length === 0
  },
})

Object.defineProperty(Array.prototype, 'isNotEmpty', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): boolean {
    return this.length > 0
  },
})

Object.defineProperty(Array.prototype, 'sum', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number[]): number {
    return this.reduce((sum, num) => sum + (num || 0), 0)
  },
})

Object.defineProperty(Array.prototype, 'average', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: number[]): number {
    return this.length > 0 ? this.sum() / this.length : 0
  },
})

Object.defineProperty(Array.prototype, 'min', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T | undefined {
    return this.length > 0
      ? (Math.min(...(this as number[])) as unknown as T)
      : undefined
  },
})

Object.defineProperty(Array.prototype, 'max', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): T | undefined {
    return this.length > 0
      ? (Math.max(...(this as number[])) as unknown as T)
      : undefined
  },
})

Object.defineProperty(Array.prototype, 'count', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[]): Record<string, number> {
    return this.reduce(
      (counts, item) => {
        const key = String(item)
        counts[key] = (counts[key] || 0) + 1
        return counts
      },
      {} as Record<string, number>
    )
  },
})

Object.defineProperty(Array.prototype, 'take', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], count: number): T[] {
    return this.slice(0, count)
  },
})

Object.defineProperty(Array.prototype, 'skip', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], count: number): T[] {
    return this.slice(count)
  },
})

Object.defineProperty(Array.prototype, 'partition', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], predicate: (item: T) => boolean): [T[], T[]] {
    const truthy: T[] = []
    const falsy: T[] = []

    this.forEach(item => {
      if (predicate(item)) {
        truthy.push(item)
      } else {
        falsy.push(item)
      }
    })

    return [truthy, falsy]
  },
})

Object.defineProperty(Array.prototype, 'intersect', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], other: T[]): T[] {
    const otherSet = new Set(other)
    return this.filter(item => otherSet.has(item))
  },
})

Object.defineProperty(Array.prototype, 'difference', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], other: T[]): T[] {
    const otherSet = new Set(other)
    return this.filter(item => !otherSet.has(item))
  },
})

Object.defineProperty(Array.prototype, 'union', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function <T>(this: T[], other: T[]): T[] {
    return [...new Set([...this, ...other])]
  },
})

export {}
