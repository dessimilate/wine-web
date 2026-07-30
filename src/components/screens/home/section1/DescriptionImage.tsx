'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import useMeasure from 'react-use-measure'

import { minMax } from '@/utils/funcs/min-max'

interface IImageProps {
	width: number
	height: number
	alt: string
	imageNumber: number
	imageScroll: number
}

const DescriptionImage = ({
	imageNumber,
	imageScroll,
	...props
}: IImageProps) => {
	const [ref, { width }] = useMeasure()

	return (
		<motion.div
			className='flex justify-center overflow-hidden'
			animate={{
				width: width * minMax((imageScroll - imageNumber * 250) / 300, 0, 1)
			}}
			transition={{ ease: 'easeOut' }}
		>
			<Image
				ref={ref}
				{...props}
				src={`/home/section1/image${imageNumber}.webp`}
				className='mx-auto w-40 min-w-40'
			/>
		</motion.div>
	)
}

export { DescriptionImage }
