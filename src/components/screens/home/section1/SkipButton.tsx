'use client'

import { motion, useAnimation } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useMemo } from 'react'

import { cn } from '@/utils/cn'

import Arrow from '&/public/svg/arrow.svg'

interface ISkipButtonProps {
	scroll: number
}

const SkipButton = ({ scroll }: ISkipButtonProps) => {
	const controls = useAnimation()
	const lenis = useLenis()

	useEffect(() => {
		let mounted = true

		const animate = async () => {
			while (mounted) {
				await controls.start({
					y: '300%',
					transition: {
						duration: 1.2,
						ease: 'easeInOut'
					}
				})

				if (!mounted) break

				controls.set({ y: '-300%' })

				await controls.start({
					y: 0,
					transition: {
						duration: 1.2,
						ease: 'easeInOut'
					}
				})
			}
		}

		animate()

		return () => {
			mounted = false
			controls.stop()
		}
	}, [controls])

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
