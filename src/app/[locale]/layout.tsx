import { hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { Layout } from '@/components/layouts/layout/Layout'
import { AppProvider } from '@/components/providers'

import { Locale } from '@/config/locales.constant'
import { SITE_NAME } from '@/config/seo.constant'

import { FlechaM } from '../../styles/fonts'

import { routing } from '@/i18n/routing'
import '@/styles/globals.css'

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
				<AppProvider
					messages={messages}
					locale={locale}
				>
					<Layout>{children}</Layout>
				</AppProvider>
			</body>
		</html>
	)
}
