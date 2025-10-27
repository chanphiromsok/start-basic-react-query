import { createMiddleware } from "@tanstack/react-start"
import { getLocaleFromRequest } from "./i18nserver"
import { dynamicActivate } from "./i18n"


export const linguiMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const locale = getLocaleFromRequest()
    await dynamicActivate(locale)
    return next()
  }
)