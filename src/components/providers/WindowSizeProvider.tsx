'use client'

import { useEffect } from 'react'

import { useWindowSizeStore } from '@/store/windowSize'

const WindowSizeProvider = () => {
	const setSize = useWindowSizeStore(state => state.setSize)

	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth, window.innerHeight)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [setSize])

	return null
}

export { WindowSizeProvider }
