'use client'

import { PropsWithChildren, useEffect } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { Layout } from '../layouts/layout/Layout'

import { CursorProvider } from './CursorProvider'
import { LenisProvider } from './LenisProvider'
import { LoadingProvider } from './LoadingProvider'
import { NoiseProvider } from './NoiseProvider'
import { usePathname } from '@/i18n/routing'

const MainProvider: NextComponentType<PropsWithChildren> = ({ children }) => {
	const { setIsMixNormal, isMixNormal } = useIsMixNormalStore()

	const pathname = usePathname()

	useEffect(() => {
		if (pathname !== URLS.HOME) setIsMixNormal(true)
	}, [pathname])

	return (
		<LenisProvider>
			<NoiseProvider />
			<LoadingProvider />
			<CursorProvider />
			<Layout>{children}</Layout>
		</LenisProvider>
	)
}

export { MainProvider }
