'use client'

import { motion, useAnimation } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { cn } from '@/utils/cn'

import Arrow from '&/public/svg/arrow.svg'

interface IProps {
	scroll: number
}

const SkipButton: NextComponentType<IProps> = ({ scroll }) => {
	const controls = useAnimation()
	const lenis = useLenis()

	useEffect(() => {
		const animate = async () => {
			while (true) {
				await controls.start({
					y: '300%',
					transition: { duration: 1.2, ease: 'easeInOut' }
				})

				controls.set({ y: '-300%' })

				await controls.start({
					y: 0,
					transition: { duration: 1.2, ease: 'easeInOut' }
				})
			}
		}

		animate()
	}, [])

	const isHidden = scroll > 300

	return (
		<button
			onClick={() => {
				lenis?.scrollTo('#section2', {
					duration: 1.5
				})
			}}
			className={cn(
				'hover:bg-second hover:text-main absolute right-20 bottom-20 z-10 flex h-12 w-20 items-center justify-center overflow-hidden rounded-[50%] border-2 transition-colors duration-300',
				isHidden && 'hidden'
			)}
		>
			<motion.div animate={controls}>
				<Arrow className='w-8 rotate-90 transition-colors' />
			</motion.div>
		</button>
	)
}

export { SkipButton }
