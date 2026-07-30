'use client'

import { NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'

import { CursorProvider } from './CursorProvider'
import { LenisProvider } from './LenisProvider'
import { LoadingProvider } from './LoadingProvider'
import { MixNormalProvider } from './MixNormalProvider'
import { NoiseProvider } from './NoiseProvider'
import { OverlayProvider } from './OverlayProvider'
import { TransitionProvider } from './TransitionProvider'
import { WindowSizeProvider } from './WindowSizeProvider'

interface IAppProviderProps {
	messages: Record<string, any>
	locale: string
}

const AppProvider = ({
	children,
	messages,
	locale
}: PropsWithChildren<IAppProviderProps>) => {
	return (
		<NextIntlClientProvider
			messages={messages}
			locale={locale}
			timeZone='Europe/Moscow'
		>
			<TransitionProvider>
				<WindowSizeProvider />
				<LenisProvider />
				<NoiseProvider />
				<LoadingProvider />
				<CursorProvider />
				<OverlayProvider />
				<MixNormalProvider />
				{children}
			</TransitionProvider>
		</NextIntlClientProvider>
	)
}

export { AppProvider }
