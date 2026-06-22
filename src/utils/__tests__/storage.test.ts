import { describe, it, expect, beforeEach } from 'vitest'
import {
  localStorage as ls,
  sessionStorage as ss,
  cookie,
} from '../storage'

describe('storage utils', () => {
  describe('localStorage', () => {
    beforeEach(() => {
      window.localStorage.clear()
    })

    it('setItem and getItem with JSON serialization', () => {
      ls.setItem('test', { name: 'John', age: 30 })
      const result = ls.getItem<{ name: string; age: number }>('test')
      expect(result).toEqual({ name: 'John', age: 30 })
    })

    it('getItem returns null for missing key', () => {
      expect(ls.getItem('nonexistent')).toBeNull()
    })

    it('removeItem removes the key', () => {
      ls.setItem('key', 'value')
      ls.removeItem('key')
      expect(ls.getItem('key')).toBeNull()
    })

    it('clear removes all items', () => {
      ls.setItem('a', 1)
      ls.setItem('b', 2)
      ls.clear()
      expect(ls.getItem('a')).toBeNull()
      expect(ls.getItem('b')).toBeNull()
    })

    it('isAvailable returns true in jsdom', () => {
      expect(ls.isAvailable()).toBe(true)
    })

    it('handles primitive values', () => {
      ls.setItem('str', 'hello')
      expect(ls.getItem<string>('str')).toBe('hello')

      ls.setItem('num', 42)
      expect(ls.getItem<number>('num')).toBe(42)

      ls.setItem('bool', true)
      expect(ls.getItem<boolean>('bool')).toBe(true)
    })

    it('handles arrays', () => {
      ls.setItem('arr', [1, 2, 3])
      expect(ls.getItem<number[]>('arr')).toEqual([1, 2, 3])
    })
  })

  describe('sessionStorage', () => {
    beforeEach(() => {
      window.sessionStorage.clear()
    })

    it('setItem and getItem with JSON serialization', () => {
      ss.setItem('test', { key: 'value' })
      expect(ss.getItem<{ key: string }>('test')).toEqual({ key: 'value' })
    })

    it('getItem returns null for missing key', () => {
      expect(ss.getItem('nonexistent')).toBeNull()
    })

    it('removeItem removes the key', () => {
      ss.setItem('key', 'value')
      ss.removeItem('key')
      expect(ss.getItem('key')).toBeNull()
    })

    it('clear removes all items', () => {
      ss.setItem('a', 1)
      ss.setItem('b', 2)
      ss.clear()
      expect(ss.getItem('a')).toBeNull()
      expect(ss.getItem('b')).toBeNull()
    })

    it('isAvailable returns true in jsdom', () => {
      expect(ss.isAvailable()).toBe(true)
    })
  })

  describe('cookie', () => {
    beforeEach(() => {
      document.cookie.split(';').forEach(c => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date(0).toUTCString())
      })
    })

    it('set and get a cookie', () => {
      cookie.set('test', 'value')
      expect(cookie.get('test')).toBe('value')
    })

    it('get returns null for missing cookie', () => {
      expect(cookie.get('nonexistent')).toBeNull()
    })

    it('remove deletes a cookie', () => {
      cookie.set('temp', 'data')
      cookie.remove('temp')
      expect(cookie.get('temp')).toBeNull()
    })

    it('set with options', () => {
      cookie.set('opts', 'data', {
        path: '/',
        maxAge: 3600,
        expires: new Date('2099-01-01'),
      })
      expect(cookie.get('opts')).toBe('data')
    })
  })
})
