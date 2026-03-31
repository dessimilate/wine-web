'use client'

import { motion } from 'framer-motion'

import { NextComponentType } from '@/types/next-component.type'

import { usePageTransition } from './TransitionProvider'

const OverlayProvider: NextComponentType = () => {
	const { phase, onEnterComplete, onExitComplete } = usePageTransition()

	if (phase === 'idle') return null

	return (
		<motion.div
			className='bg-second fixed top-1/2 left-1/2 z-998 h-[150vh] w-[150vw] -translate-x-1/2 -translate-y-1/2'
			style={{ transformOrigin: '50% -200%' }}
			initial={{ rotate: '90deg' }}
			animate={{
				rotate: phase === 'enter' ? '0deg' : '-90deg'
			}}
			transition={{
				duration: 1.2,
				ease: 'easeInOut'
			}}
			onAnimationComplete={() => {
				if (phase === 'enter') onEnterComplete()
				if (phase === 'exit') onExitComplete()
			}}
		/>
	)
}

export { OverlayProvider }
