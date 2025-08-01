import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

interface UseI18nReturn {
  t: TFunction<'translation'>
  changeLanguage: (lng: string) => Promise<TFunction>
  currentLanguage: string
  isRTL: boolean
  ready: boolean
}

/**
 * Custom hook for internationalization
 * Provides translation function and language utilities
 */
export const useI18n = (): UseI18nReturn => {
  const { t, i18n, ready } = useTranslation()

  const changeLanguage = async (lng: string): Promise<TFunction> => {
    return await i18n.changeLanguage(lng)
  }

  const currentLanguage = i18n.language

  // RTL languages (add more as needed)
  const rtlLanguages = ['ar', 'he', 'fa']
  const isRTL = rtlLanguages.includes(currentLanguage)

  return {
    t,
    changeLanguage,
    currentLanguage,
    isRTL,
    ready,
  }
}

/**
 * Hook specifically for common translations
 */
export const useCommonTranslations = () => {
  const { t } = useI18n()

  return {
    loading: t('common.loading'),
    error: t('common.error'),
    success: t('common.success'),
    confirm: t('common.confirm'),
    cancel: t('common.cancel'),
    ok: t('common.ok'),
    yes: t('common.yes'),
    no: t('common.no'),
    save: t('common.save'),
    delete: t('common.delete'),
    edit: t('common.edit'),
    back: t('common.back'),
    next: t('common.next'),
    previous: t('common.previous'),
    close: t('common.close'),
  }
}

/**
 * Hook for error messages with i18n support
 */
export const useErrorMessages = () => {
  const { t } = useI18n()

  return {
    networkError: t('errors.networkError'),
    unauthorized: t('errors.unauthorized'),
    forbidden: t('errors.forbidden'),
    notFound: t('errors.notFound'),
    serverError: t('errors.serverError'),
    validationError: t('errors.validationError'),
    unknownError: t('errors.unknownError'),
  }
}

/**
 * Hook for success messages with i18n support
 */
export const useSuccessMessages = () => {
  const { t } = useI18n()

  return {
    login: t('success.login'),
    logout: t('success.logout'),
    save: t('success.save'),
    delete: t('success.delete'),
    create: t('success.create'),
    update: t('success.update'),
  }
}
