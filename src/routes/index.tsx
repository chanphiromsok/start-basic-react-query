import { Trans } from '@lingui/react/macro'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import { serialize } from 'cookie-es';
import { dynamicActivate } from '@/modules/lingui/i18n'
import { changeLocaleIsomorphic } from '@/modules/lingui/i18nserver';

// TODO: now don't know why can't move it ouside routes/** */
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
  });

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <Trans>Welcome Home!!!</Trans>
      <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {
        dynamicActivate("km");
        updateLocale({
          data: "km",
        })
        changeLocaleIsomorphic("km");
      }}>
        KM
      </button>
      <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {
        dynamicActivate("en");
        updateLocale({
          data: "en",
        })
      }}>
        EN
      </button>
    </div>
  )
}
