import { describe, it, expect } from 'vitest'
import '../object.extensions'

describe('Object extensions', () => {
  describe('isEmpty / isNotEmpty', () => {
    it('isEmpty returns true for empty object', () => {
      expect(Object.isEmpty({})).toBe(true)
    })

    it('isEmpty returns true for null', () => {
      expect(Object.isEmpty(null as unknown as object)).toBe(true)
    })

    it('isEmpty returns false for non-empty object', () => {
      expect(Object.isEmpty({ a: 1 })).toBe(false)
    })

    it('isNotEmpty returns true for non-empty object', () => {
      expect(Object.isNotEmpty({ a: 1 })).toBe(true)
    })

    it('isNotEmpty returns false for empty object', () => {
      expect(Object.isNotEmpty({})).toBe(false)
    })
  })

  describe('get', () => {
    const obj = { a: { b: { c: 42 } }, d: 'hello' }

    it('gets nested property', () => {
      expect(Object.get(obj, 'a.b.c')).toBe(42)
    })

    it('gets top-level property', () => {
      expect(Object.get(obj, 'd')).toBe('hello')
    })

    it('returns default for missing path', () => {
      expect(Object.get(obj, 'a.x.y', 'default')).toBe('default')
    })

    it('returns default for null/undefined obj', () => {
      expect(Object.get(null as unknown as Record<string, unknown>, 'a', 'def')).toBe('def')
    })

    it('returns default for empty path', () => {
      expect(Object.get(obj, '', 'def')).toBe('def')
    })
  })

  describe('set', () => {
    it('sets a nested property', () => {
      const obj: Record<string, unknown> = {}
      Object.set(obj, 'a.b.c', 42)
      expect((obj as { a: { b: { c: number } } }).a.b.c).toBe(42)
    })

    it('overwrites existing non-object intermediate', () => {
      const obj: Record<string, unknown> = { a: 'string' }
      Object.set(obj, 'a.b', 42)
      expect((obj as { a: { b: number } }).a.b).toBe(42)
    })

    it('does nothing for null obj', () => {
      expect(() =>
        Object.set(null as unknown as Record<string, unknown>, 'a', 1)
      ).not.toThrow()
    })

    it('does nothing for empty path', () => {
      const obj = { a: 1 }
      Object.set(obj, '', 2)
      expect(obj.a).toBe(1)
    })
  })

  describe('deepClone', () => {
    it('clones primitives', () => {
      expect(Object.deepClone(42)).toBe(42)
      expect(Object.deepClone(null)).toBeNull()
    })

    it('deep clones objects', () => {
      const original = { a: { b: 1 } }
      const cloned = Object.deepClone(original)
      expect(cloned).toEqual(original)
      expect(cloned.a).not.toBe(original.a)
    })

    it('clones Date instances', () => {
      const date = new Date('2024-01-01')
      const cloned = Object.deepClone(date)
      expect(cloned.getTime()).toBe(date.getTime())
      expect(cloned).not.toBe(date)
    })

    it('clones arrays', () => {
      const arr = [1, [2, 3]]
      const cloned = Object.deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned[1]).not.toBe(arr[1])
    })
  })

  describe('deepMerge', () => {
    it('merges objects deeply', () => {
      const result = Object.deepMerge<Record<string, unknown>>(
        { a: 1, b: { c: 2 } },
        { b: { d: 3 }, e: 4 }
      )
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
    })

    it('returns empty object for no args', () => {
      expect(Object.deepMerge()).toEqual({})
    })

    it('clones single object', () => {
      const original = { a: { b: 1 } }
      const result = Object.deepMerge(original)
      expect(result).toEqual(original)
      expect(result).not.toBe(original)
    })

    it('skips null entries', () => {
      const result = Object.deepMerge<Record<string, unknown>>(
        { a: 1 },
        null as unknown as Partial<Record<string, unknown>>,
        { b: 2 }
      )
      expect(result).toEqual({ a: 1, b: 2 })
    })
  })

  describe('pick', () => {
    it('picks specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(Object.pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('ignores missing keys', () => {
      const obj = { a: 1 }
      expect(Object.pick(obj, ['a', 'b' as keyof typeof obj])).toEqual({
        a: 1,
      })
    })
  })

  describe('omit', () => {
    it('omits specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(Object.omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
    })
  })

  describe('mapValues', () => {
    it('maps object values', () => {
      const result = Object.mapValues({ a: 1, b: 2 }, v => v * 2)
      expect(result).toEqual({ a: 2, b: 4 })
    })
  })

  describe('mapKeys', () => {
    it('maps object keys', () => {
      const result = Object.mapKeys({ a: 1, b: 2 }, k => k.toUpperCase())
      expect(result).toEqual({ A: 1, B: 2 })
    })
  })

  describe('toQueryString', () => {
    it('converts object to query string', () => {
      const result = Object.toQueryString({ name: 'John', age: 30 })
      expect(result).toContain('name=John')
      expect(result).toContain('age=30')
    })

    it('handles arrays', () => {
      const result = Object.toQueryString({ ids: [1, 2, 3] })
      expect(result).toContain('ids=1')
      expect(result).toContain('ids=2')
      expect(result).toContain('ids=3')
    })

    it('skips null/undefined values', () => {
      const result = Object.toQueryString({ a: 1, b: null, c: undefined })
      expect(result).toBe('a=1')
    })
  })

  describe('fromQueryString', () => {
    it('parses query string to object', () => {
      const result = Object.fromQueryString('name=John&age=30')
      expect(result).toEqual({ name: 'John', age: '30' })
    })

    it('handles leading ?', () => {
      const result = Object.fromQueryString('?foo=bar')
      expect(result).toEqual({ foo: 'bar' })
    })
  })
})
