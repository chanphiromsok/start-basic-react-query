import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createRouter as createReactRouter } from '@tanstack/react-router'
import { setupI18n } from '@lingui/core'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { routerWithLingui } from './locales/router-plugin'
import { dynamicActivate } from './locales/i18n'
import { getLocaleIsomorphic } from './locales/i18n-utils'


export async function getRouter() {
  const locale = getLocaleIsomorphic()
  const i18n = setupI18n({})
  await dynamicActivate(i18n, locale)
  const queryClient = new QueryClient()
  const router = routerWithLingui(
    createReactRouter({
      routeTree,
      context: { queryClient, i18n },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      scrollRestoration: true,
      defaultPreload: 'intent',
    }),
    i18n,
  )
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
