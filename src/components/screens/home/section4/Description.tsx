'use client'

import { MotionProps, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { ButtonArrowType1 } from '@/components/ui/ButtonArrowType1'

import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

interface IProps {
	defaultMotionProps: MotionProps
}

const Description: NextComponentType<IProps> = ({ defaultMotionProps }) => {
	const t = useTranslations('Home.section4')

	return (
		<motion.div
			{...defaultMotionProps}
			className='flex flex-col items-center text-center text-3xl'
		>
			<div>{t('description1')}</div>
			<div>{t('description2')}</div>
			<div className='mb-6'>{t('description3')}</div>

			<ButtonArrowType1
				href={URLS.EXPERIENCES}
				text={t('button')}
				withoutBg={true}
			/>
		</motion.div>
	)
}

export { Description }
