'use client'

import { motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { PropsWithChildren } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { minMax } from '@/utils/funcs/min-max'

interface ScrollImageProps {
	shift: number
	imageProps: ImageProps
}

const ScrollImage: NextComponentType<PropsWithChildren<ScrollImageProps>> = ({
	shift,
	imageProps,
	children
}) => {
	shift = minMax(shift / 10, -8.3, 8.3)

	return (
		<div className='relative flex h-screen w-full items-center overflow-hidden'>
			<motion.div
				animate={{ y: shift + '%' }}
				transition={{ ease: 'linear', duration: 0 }}
			>
				<Image
					{...imageProps}
					className='h-[120vh] object-cover'
				/>
			</motion.div>
			{children && children}
		</div>
	)
}

export { ScrollImage }
