import { createIsomorphicFn, createServerFn } from '@tanstack/react-start'
import {
  getRequestHeaders,
  setResponseHeader,
} from '@tanstack/react-start/server'
import { serialize } from 'cookie-es'

export const getIsomorphicHeaders = createIsomorphicFn()
  .server(() => {
    return getRequestHeaders()
  })
  .client(() => {
    return {}
  })

export const updateLocale = createServerFn({ method: 'POST' })
  .inputValidator((locale: string) => locale)
  .handler(({ data }) => {
    setResponseHeader(
      'Set-Cookie',
      serialize('locale', data, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      }),
    )
  })
