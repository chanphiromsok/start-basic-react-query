import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createRouter as createReactRouter } from '@tanstack/react-router'
import { i18n } from '@lingui/core'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { routerWithLingui } from './modules/lingui/router-plugin'

export function getRouter() {
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
