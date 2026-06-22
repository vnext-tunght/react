import { describe, it, expect } from 'vitest'
import '../string.extensions'

describe('String extensions', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect('hello'.capitalize()).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(''.capitalize()).toBe('')
    })
  })

  describe('toCamelCase', () => {
    it('converts kebab-case', () => {
      expect('hello-world'.toCamelCase()).toBe('helloWorld')
    })

    it('converts snake_case', () => {
      expect('hello_world'.toCamelCase()).toBe('helloWorld')
    })

    it('converts spaces', () => {
      expect('hello world'.toCamelCase()).toBe('helloWorld')
    })
  })

  describe('toPascalCase', () => {
    it('converts to PascalCase', () => {
      expect('hello-world'.toPascalCase()).toBe('HelloWorld')
    })
  })

  describe('toKebabCase', () => {
    it('converts camelCase', () => {
      expect('helloWorld'.toKebabCase()).toBe('hello-world')
    })

    it('converts spaces and underscores', () => {
      expect('hello world_test'.toKebabCase()).toBe('hello-world-test')
    })
  })

  describe('toSnakeCase', () => {
    it('converts camelCase', () => {
      expect('helloWorld'.toSnakeCase()).toBe('hello_world')
    })

    it('converts spaces and hyphens', () => {
      expect('hello world-test'.toSnakeCase()).toBe('hello_world_test')
    })
  })

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect('Hello World'.truncate(8)).toBe('Hello...')
    })

    it('returns original if short enough', () => {
      expect('Hi'.truncate(10)).toBe('Hi')
    })

    it('uses custom suffix', () => {
      expect('Hello World'.truncate(9, '~')).toBe('Hello Wo~')
    })
  })

  describe('removeWhitespace', () => {
    it('removes all whitespace', () => {
      expect('h e l l o'.removeWhitespace()).toBe('hello')
    })
  })

  describe('isNumeric', () => {
    it('returns true for numeric strings', () => {
      expect('12345'.isNumeric()).toBe(true)
    })

    it('returns false for non-numeric strings', () => {
      expect('abc'.isNumeric()).toBe(false)
      expect('12.5'.isNumeric()).toBe(false)
    })
  })

  describe('isEmail', () => {
    it('validates emails', () => {
      expect('test@example.com'.isEmail()).toBe(true)
      expect('invalid'.isEmail()).toBe(false)
    })
  })

  describe('isUrl', () => {
    it('validates URLs', () => {
      expect('https://example.com'.isUrl()).toBe(true)
      expect('not-url'.isUrl()).toBe(false)
    })
  })

  describe('isBlank', () => {
    it('returns true for empty or whitespace', () => {
      expect(''.isBlank()).toBe(true)
      expect('   '.isBlank()).toBe(true)
    })

    it('returns false for non-blank strings', () => {
      expect('hello'.isBlank()).toBe(false)
    })
  })

  describe('reverse', () => {
    it('reverses a string', () => {
      expect('hello'.reverse()).toBe('olleh')
    })
  })

  describe('count', () => {
    it('counts substring occurrences', () => {
      expect('hello world hello'.count('hello')).toBe(2)
    })

    it('returns 0 for empty substring', () => {
      expect('hello'.count('')).toBe(0)
    })
  })

  describe('stripHtml', () => {
    it('removes HTML tags', () => {
      expect('<p>Hello <b>world</b></p>'.stripHtml()).toBe('Hello world')
    })
  })

  describe('escapeHtml', () => {
    it('escapes HTML characters', () => {
      expect('<div class="test">'.escapeHtml()).toBe(
        '&lt;div class=&quot;test&quot;&gt;'
      )
    })

    it('escapes ampersand and quotes', () => {
      expect("Tom & Jerry's".escapeHtml()).toBe('Tom &amp; Jerry&#39;s')
    })
  })

  describe('toTitleCase', () => {
    it('capitalizes each word', () => {
      expect('hello world test'.toTitleCase()).toBe('Hello World Test')
    })
  })

  describe('extractNumbers', () => {
    it('extracts numbers from string', () => {
      expect('abc123def456'.extractNumbers()).toEqual([123, 456])
    })

    it('returns empty array when no numbers', () => {
      expect('abcdef'.extractNumbers()).toEqual([])
    })
  })

  describe('mask', () => {
    it('masks characters except last visible chars', () => {
      expect('1234567890'.mask(4)).toBe('******7890')
    })

    it('returns original for short strings', () => {
      expect('abc'.mask(4)).toBe('abc')
    })

    it('uses custom mask character', () => {
      expect('secret'.mask(2, '#')).toBe('####et')
    })
  })

  describe('toNonAccented', () => {
    it('removes Vietnamese accents', () => {
      expect('Xin chào thế giới'.toNonAccented()).toBe('Xin chao the gioi')
    })

    it('converts accented uppercase', () => {
      expect('Đà Nẵng'.toNonAccented()).toBe('Da Nang')
    })
  })

  describe('toPhoneFormat', () => {
    it('formats 10-digit Vietnamese number', () => {
      expect('0987654321'.toPhoneFormat()).toBe('0987 654 321')
    })

    it('formats 11-digit number starting with 84', () => {
      expect('84987654321'.toPhoneFormat()).toBe('+84 987 654 321')
    })

    it('returns original for non-matching format', () => {
      expect('12345'.toPhoneFormat()).toBe('12345')
    })
  })
})
