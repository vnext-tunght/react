import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useI18n } from '@hooks/common/useI18n'

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
    ready: true,
  }),
}))

describe('useI18n', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useI18n())

    expect(result.current.t).toBeDefined()
    expect(typeof result.current.t).toBe('function')
  })

  it('returns language utilities', () => {
    const { result } = renderHook(() => useI18n())

    expect(result.current.changeLanguage).toBeDefined()
    expect(typeof result.current.changeLanguage).toBe('function')
    expect(result.current.currentLanguage).toBeDefined()
    expect(result.current.isRTL).toBeDefined()
    expect(result.current.ready).toBeDefined()
  })

  it('translates keys correctly', () => {
    const { result } = renderHook(() => useI18n())

    const translated = result.current.t('common.loading')
    expect(translated).toBe('common.loading')
  })
})
