'use client'

import { useEffect } from 'react'

import { URLS } from '@/config/urls.config'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { usePathname } from '@/i18n/routing'

const MixNormalProvider = () => {
	const setIsMixNormal = useIsMixNormalStore(state => state.setIsMixNormal)

	const pathname = usePathname()

	useEffect(() => {
		if (pathname !== URLS.HOME) setIsMixNormal(true)
	}, [pathname, setIsMixNormal])

	return null
}

export { MixNormalProvider }
