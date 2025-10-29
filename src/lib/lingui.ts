import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import { serialize } from 'cookie-es';
import type { I18n } from '@lingui/core';
import { dynamicActivate } from '@/locales/i18n';

export const updateLocale = createServerFn()
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

export const changeLocaleIsomorphic = (i18n:I18n,locale: string) => {
    updateLocale({ data: locale })
    dynamicActivate(i18n,locale);
}