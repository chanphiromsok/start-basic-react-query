import { createMiddleware } from "@tanstack/react-start"
import { setupI18n } from "@lingui/core"
import { getLocaleFromRequest } from "./i18nserver"
import { dynamicActivate } from "./i18n"


export const linguiMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const locale = getLocaleFromRequest()
    const i18n = setupI18n({})
    await dynamicActivate(locale)
    return next({
      context: { i18n },
    })
  }
)