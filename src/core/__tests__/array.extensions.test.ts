import { describe, it, expect } from 'vitest'
import '../array.extensions'

describe('Array extensions', () => {
  describe('unique', () => {
    it('removes duplicates', () => {
      expect([1, 2, 2, 3, 3].unique()).toEqual([1, 2, 3])
    })

    it('handles empty array', () => {
      expect([].unique()).toEqual([])
    })

    it('handles strings', () => {
      expect(['a', 'b', 'a'].unique()).toEqual(['a', 'b'])
    })
  })

  describe('groupBy', () => {
    it('groups by key function', () => {
      const items = [
        { type: 'a', value: 1 },
        { type: 'b', value: 2 },
        { type: 'a', value: 3 },
      ]
      const result = items.groupBy(item => item.type)
      expect(result).toEqual({
        a: [
          { type: 'a', value: 1 },
          { type: 'a', value: 3 },
        ],
        b: [{ type: 'b', value: 2 }],
      })
    })
  })

  describe('random', () => {
    it('returns undefined for empty array', () => {
      expect([].random()).toBeUndefined()
    })

    it('returns an element from the array', () => {
      const arr = [1, 2, 3]
      expect(arr).toContain(arr.random())
    })
  })

  describe('shuffle', () => {
    it('returns an array with the same elements', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = arr.shuffle()
      expect(shuffled.sort()).toEqual(arr.sort())
    })

    it('does not mutate the original array', () => {
      const arr = [1, 2, 3]
      const original = [...arr]
      arr.shuffle()
      expect(arr).toEqual(original)
    })
  })

  describe('chunk', () => {
    it('chunks array into smaller arrays', () => {
      expect([1, 2, 3, 4, 5].chunk(2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('handles exact divisions', () => {
      expect([1, 2, 3, 4].chunk(2)).toEqual([
        [1, 2],
        [3, 4],
      ])
    })

    it('handles empty array', () => {
      expect([].chunk(3)).toEqual([])
    })
  })

  describe('compact', () => {
    it('removes falsy values', () => {
      expect([0, 1, false, 2, '', 3, null, undefined].compact()).toEqual([
        1, 2, 3,
      ])
    })
  })

  describe('flatten', () => {
    it('flattens nested arrays', () => {
      expect(
        [
          [1, 2],
          [3, [4, 5]],
        ].flatten()
      ).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('first / last', () => {
    it('first returns first element', () => {
      expect([10, 20, 30].first()).toBe(10)
    })

    it('first returns undefined for empty array', () => {
      expect([].first()).toBeUndefined()
    })

    it('last returns last element', () => {
      expect([10, 20, 30].last()).toBe(30)
    })

    it('last returns undefined for empty array', () => {
      expect([].last()).toBeUndefined()
    })
  })

  describe('removeAt', () => {
    it('removes element at index', () => {
      expect([1, 2, 3].removeAt(1)).toEqual([1, 3])
    })
  })

  describe('remove', () => {
    it('removes all occurrences of a value', () => {
      expect([1, 2, 3, 2].remove(2)).toEqual([1, 3])
    })
  })

  describe('insertAt', () => {
    it('inserts element at index', () => {
      expect([1, 3, 4].insertAt(1, 2)).toEqual([1, 2, 3, 4])
    })
  })

  describe('isEmpty / isNotEmpty', () => {
    it('isEmpty returns true for empty array', () => {
      expect([].isEmpty()).toBe(true)
    })

    it('isEmpty returns false for non-empty array', () => {
      expect([1].isEmpty()).toBe(false)
    })

    it('isNotEmpty returns true for non-empty array', () => {
      expect([1].isNotEmpty()).toBe(true)
    })

    it('isNotEmpty returns false for empty array', () => {
      expect([].isNotEmpty()).toBe(false)
    })
  })

  describe('sum / average', () => {
    it('sum calculates total', () => {
      expect([1, 2, 3, 4].sum()).toBe(10)
    })

    it('sum returns 0 for empty array', () => {
      expect(([] as number[]).sum()).toBe(0)
    })

    it('average calculates mean', () => {
      expect([2, 4, 6].average()).toBe(4)
    })

    it('average returns 0 for empty array', () => {
      expect(([] as number[]).average()).toBe(0)
    })
  })

  describe('min / max', () => {
    it('min returns smallest value', () => {
      expect([3, 1, 4, 1, 5].min()).toBe(1)
    })

    it('max returns largest value', () => {
      expect([3, 1, 4, 1, 5].max()).toBe(5)
    })

    it('returns undefined for empty array', () => {
      expect([].min()).toBeUndefined()
      expect([].max()).toBeUndefined()
    })
  })

  describe('count', () => {
    it('counts occurrences', () => {
      expect(['a', 'b', 'a', 'c', 'b', 'a'].count()).toEqual({
        a: 3,
        b: 2,
        c: 1,
      })
    })
  })

  describe('take / skip', () => {
    it('take returns first n elements', () => {
      expect([1, 2, 3, 4, 5].take(3)).toEqual([1, 2, 3])
    })

    it('skip returns elements after first n', () => {
      expect([1, 2, 3, 4, 5].skip(2)).toEqual([3, 4, 5])
    })
  })

  describe('partition', () => {
    it('splits array by predicate', () => {
      const [evens, odds] = [1, 2, 3, 4, 5].partition(n => n % 2 === 0)
      expect(evens).toEqual([2, 4])
      expect(odds).toEqual([1, 3, 5])
    })
  })

  describe('intersect', () => {
    it('returns common elements', () => {
      expect([1, 2, 3, 4].intersect([2, 4, 6])).toEqual([2, 4])
    })
  })

  describe('difference', () => {
    it('returns elements not in other array', () => {
      expect([1, 2, 3, 4].difference([2, 4])).toEqual([1, 3])
    })
  })

  describe('union', () => {
    it('returns unique combined elements', () => {
      expect([1, 2, 3].union([2, 3, 4])).toEqual([1, 2, 3, 4])
    })
  })
})
