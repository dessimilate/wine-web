import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { MainProvider } from '@/components/providers/MainProvider'
import { OverlayProvider } from '@/components/providers/OverlayProvider'
import { TransitionProvider } from '@/components/providers/TransitionProvider'

import { Locale } from '@/config/locales.constant'
import { SITE_NAME } from '@/config/seo.constant'

import { FlechaM } from '../fonts'

import './../globals.css'
import { routing } from '@/i18n/routing'

interface IProps {
	params: Promise<{
		locale: Locale
	}>
}

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Wine sales website'
}

export default async function LocaleLayout({
	children,
	params
}: Readonly<PropsWithChildren<IProps>>) {
	const { locale } = await params
	setRequestLocale(locale)

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={FlechaM.className}>
				<NextIntlClientProvider
					messages={messages}
					locale={locale}
				>
					<TransitionProvider>
						<OverlayProvider />
						<MainProvider>{children}</MainProvider>
					</TransitionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
