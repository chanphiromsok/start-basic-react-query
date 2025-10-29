import { Trans } from '@lingui/react/macro';
import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import { changeLocaleIsomorphic } from '@/lib/lingui';
import { BottomSheetExample } from '@/components/BottomSheetExample';
import { Header } from '@/components/Header';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { i18n } = useRouteContext({from:"__root__"});
  return (
    <div className="p-2">
      <Header
        headerRight={<div className="w-8 h-8 bg-red-500 rounded-lg" />}
        showBorder={false}
      />
      <Trans>Welcome Home!!!</Trans>
      <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {
        changeLocaleIsomorphic(i18n,"km");
      }}>
        KM
      </button>
      <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {
        changeLocaleIsomorphic(i18n,"en");
      }}>
        EN
      </button>
      <BottomSheetExample />
    </div>
  )
}
