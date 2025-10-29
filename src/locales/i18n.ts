import type { I18n } from '@lingui/core'

export const locales = {
  en: 'English',
  km: 'Khmer',
  zh: "Chinese",
}

export const isLocaleValid = (locale: string) =>
  Object.keys(locales).includes(locale)

export const defaultLocale = 'en'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(i18n: I18n, locale: string) {
  const { messages } = await import(`./${locale}/messages.po`)
  i18n.loadAndActivate({ locale, messages })
}