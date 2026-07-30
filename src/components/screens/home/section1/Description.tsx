'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { minMax } from '@/utils/funcs/min-max'

import { DescriptionImage } from './DescriptionImage'

interface IDescriptionProps {
	scroll: number
}

const Description = ({ scroll }: IDescriptionProps) => {
	const t = useTranslations('Home.section1')

	const { height } = useWindowSize()

	const textScroll = scroll - height * 1.6
	const imageScroll = scroll - height * 2.3

	const lines = useMemo(() => {
		return [
			<>
				<span>{t('description1')}</span>
				<DescriptionImage
					imageScroll={imageScroll}
					imageNumber={1}
					width={238}
					height={131}
					alt='first image'
				/>
				<span>
					<i>{t('description2')}</i>
				</span>
			</>,

			<>
				<span>
					<i>{t('description3')}</i>
				</span>

				<span>{t('description4')}</span>
			</>,

			<>
				<DescriptionImage
					imageScroll={imageScroll}
					imageNumber={2}
					width={300}
					height={164}
					alt='second image'
				/>
				<span>{t('description5')}</span>
				<span>
					<i>{t('description6')}</i>
				</span>
			</>,

			<>
				<span>
					<i>{t('description7')}</i>
				</span>
				<span>{t('description8')}</span>
			</>,

			<>
				<span>
					<i>{t('description9')}</i>
				</span>
				<DescriptionImage
					imageScroll={imageScroll}
					imageNumber={3}
					width={300}
					height={164}
					alt='third image'
				/>
			</>
		]
	}, [imageScroll])

	return (
		<h3 className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-10 text-8xl font-light w-full'>
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

export { Description }
