'use client'

import { motion } from 'framer-motion'
import { set } from 'lodash'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import { NextComponentType } from '@/types/next-component.type'

import { minMax } from '@/utils/funcs/min-max'

interface IDescriptionProps {
	scroll: number
}

interface IImageWrapperProps {
	width: number
	height: number
	alt: string
	imageNumber: number
	imageScroll: number
}

const Description: NextComponentType<IDescriptionProps> = ({ scroll }) => {
	const t = useTranslations('Home')

	const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
		setWindowHeight(window.innerHeight)
	}, [])

	const textScroll = scroll - windowHeight * 1.6
	const imageScroll = scroll - windowHeight * 2.3

	const lines = [
		<>
			<span>{t('section1.description1')}</span>
			<ImageWrapper
				imageScroll={imageScroll}
				imageNumber={1}
				width={238}
				height={131}
				alt='first image'
			/>
			<span>
				<i>{t('section1.description2')}</i>
			</span>
		</>,

		<>
			<span>
				<i>{t('section1.description3')}</i>
			</span>

			<span>{t('section1.description4')}</span>
		</>,

		<>
			<ImageWrapper
				imageScroll={imageScroll}
				imageNumber={2}
				width={300}
				height={164}
				alt='second image'
			/>
			<span>{t('section1.description5')}</span>
			<span>
				<i>{t('section1.description6')}</i>
			</span>
		</>,

		<>
			<span>
				<i>{t('section1.description7')}</i>
			</span>
			<span>{t('section1.description8')}</span>
		</>,

		<>
			<span>
				<i>{t('section1.description9')}</i>
			</span>
			<ImageWrapper
				imageScroll={imageScroll}
				imageNumber={3}
				width={300}
				height={164}
				alt='third image'
			/>
		</>
	]

	return (
		<h3 className='translate-center absolute flex flex-col gap-10 text-8xl font-light'>
			{lines.map((line, i) => (
				<div
					key={'description-line-' + i}
					className=''
				>
					<motion.div
						animate={{
							y: 100 - minMax(textScroll / 4 - 25 * i, 0, 100) + '%',
							opacity: minMax(textScroll / 500 - 0.25 * i, 0, 1)
						}}
						transition={{ ease: 'easeOut' }}
						className='flex items-center justify-center gap-x-4'
					>
						{line}
					</motion.div>
				</div>
			))}
		</h3>
	)
}

const ImageWrapper: NextComponentType<IImageWrapperProps> = ({
	imageNumber,
	imageScroll,
	...props
}) => {
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

export { Description }
