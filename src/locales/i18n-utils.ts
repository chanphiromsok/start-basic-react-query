import { createIsomorphicFn } from '@tanstack/react-start'
import { getLocaleFromRequest } from './i18nserver'
import { getLanguage } from '@/lib/user-agent'


export const getLocaleIsomorphic = createIsomorphicFn()
  .server(() => getLocaleFromRequest())
  .client(() => {
    const userAgent = navigator.userAgent
    return getLanguage(userAgent)
  })
