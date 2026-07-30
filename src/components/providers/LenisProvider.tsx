'use client'

import { ReactLenis } from 'lenis/react'

import { LENIS_CONFIG } from '@/config/lenis.config'

const LenisProvider = () => {
	return (
		<ReactLenis
			root
			options={LENIS_CONFIG}
		/>
	)
}

export { LenisProvider }
