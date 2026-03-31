'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import Logo from '&/public/svg/logo-with-title.svg'

const LoadingProvider: NextComponentType = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = new Promise(resolve => setTimeout(resolve, 2000))

		const pageLoaded = new Promise(resolve => {
			if (document.readyState === 'complete') {
				resolve(null)
			} else {
				window.addEventListener('load', () => resolve(null))
			}
		})

		Promise.all([timer, pageLoaded]).then(() => {
			setIsLoading(false)
		})
	}, [])

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					key='loader'
					initial={{ y: '0%' }}
					exit={{ y: '-100%' }}
					transition={{ duration: 0.6, ease: 'easeInOut' }}
					className='bg-second text-main fixed inset-0 z-998 flex items-center justify-center'
				>
					<Logo className='fill-main animate-fade-in-500' />
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export { LoadingProvider }
