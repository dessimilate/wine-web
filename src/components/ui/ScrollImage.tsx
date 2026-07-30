'use client'

import { motion, useInView } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { PropsWithChildren, useMemo, useRef } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { cn } from '@/utils/cn'
import { minMax } from '@/utils/funcs/min-max'

interface ScrollImageProps {
	isMoveUp?: boolean
	scrollImpact?: number
	scroll: number
	heightImpact?: number
	imageProps: ImageProps
	sizeWrapper?: boolean
	appearanceAnimation?: boolean
}

const ScrollImage = ({
	scroll,
	heightImpact = 0.01,
	scrollImpact = 0.12,
	sizeWrapper = false,
	appearanceAnimation = false,
	isMoveUp = true,
	imageProps,
	children
}: PropsWithChildren<ScrollImageProps>) => {
	const { height } = useWindowSize()

	const ref = useRef(null)

	const shift = useMemo(() => {
		const fullScroll = (isMoveUp ? -1 : 1) * scroll * scrollImpact
		const fullHeight = height * heightImpact
		const baseShift = minMax((fullScroll + fullHeight) / 10, -8.3, 8.3)
		return baseShift
	}, [scroll, height])

	const inView = useInView(ref, { once: true, margin: '-20%', amount: 0.1 })

	return (
		<div
			ref={ref}
			className={cn('relative w-full', sizeWrapper ? 'h-full' : 'h-screen')}
		>
			<motion.div
				className='flex h-full w-full items-center overflow-hidden'
				initial={
					appearanceAnimation ? { clipPath: 'inset(0 0 100% 0)' } : undefined
				}
				animate={
					appearanceAnimation
						? inView
							? { clipPath: 'inset(0 0 0% 0)' }
							: { clipPath: 'inset(0 0 100% 0)' }
						: undefined
				}
				transition={{ duration: 0.7, ease: 'easeOut' }}
			>
				<motion.div
					animate={{ y: shift + '%' }}
					transition={{ ease: 'linear', duration: 0 }}
					className='h-12/10 w-full'
				>
					<Image
						{...imageProps}
						className='h-full object-cover'
					/>
				</motion.div>
				{children && children}
			</motion.div>
		</div>
	)
}

export { ScrollImage }
