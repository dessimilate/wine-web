'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { NextComponentType } from '@/types/next-component.type'

import { minMax } from '@/utils/funcs/min-max'

interface IProps {
	scroll: number
}

const Header: NextComponentType<IProps> = ({ scroll }) => {
	const t = useTranslations('Home')

	return (
		<h2 className='translate-x-center absolute top-30 flex w-9/10 max-w-full flex-wrap justify-center gap-x-10 text-[11rem] leading-[10rem]'>
			{t('section1.title')
				.split(' ')
				.map((el, i, { length }) => {
					const titleDelay = 45 * (length - 1 - i)
					const titleY = scroll * 0.6 - titleDelay
					const titleOpacity = scroll * 0.8 - titleDelay

					return (
						<div
							key={'home-section1-title-word-' + i}
							className=''
						>
							<motion.div
								animate={{
									y: minMax(titleY, 0, 100) + '%',
									opacity: 1 - minMax(titleOpacity / 100, 0, 1)
								}}
								transition={{ ease: 'easeOut' }}
							>
								{el}
							</motion.div>
						</div>
					)
				})}
		</h2>
	)
}

export { Header }
