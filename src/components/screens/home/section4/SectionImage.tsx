'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

import { NextComponentType } from '@/types/next-component.type'

interface IProps {
	shift: number
}

const SectionImage: NextComponentType<PropsWithChildren<IProps>> = ({
	shift,
	children
}) => {
	return (
		<div className='relative h-screen w-full overflow-hidden'>
			<motion.div
				animate={{ y: shift }}
				transition={{ ease: 'linear', duration: 0 }}
			>
				<Image
					src='/home/section4/image.webp'
					width={2560}
					height={1772}
					alt='metodo-classico'
					className='h-[120vh] object-cover'
				/>
			</motion.div>
			{children}
		</div>
	)
}

export { SectionImage }
