'use client'

import { MotionProps, motion } from 'framer-motion'

import { NextComponentType } from '@/types/next-component.type'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/app/fonts'

interface IProps {
	defaultMotionProps?: MotionProps
	topHeaderX: number
	bottomHeaderX: number
	topHeader: string
	bottomHeader: string
}

const HeaderTranslateX: NextComponentType<IProps> = ({
	defaultMotionProps = {},
	topHeaderX,
	bottomHeaderX,
	topHeader,
	bottomHeader
}) => {
	return (
		<div className={cn('mb-8 text-9xl uppercase', FlechaBronzeaM.className)}>
			<motion.div
				{...defaultMotionProps}
				className='flex items-start justify-center'
			>
				<motion.div
					animate={{ x: topHeaderX }}
					transition={{ duration: 0, ease: 'linear' }}
				>
					{topHeader}
				</motion.div>
			</motion.div>

			<motion.div
				{...defaultMotionProps}
				className='flex items-start justify-center'
			>
				<motion.div
					animate={{ x: bottomHeaderX }}
					transition={{ duration: 0, ease: 'linear' }}
				>
					{bottomHeader}
				</motion.div>
			</motion.div>
		</div>
	)
}

export { HeaderTranslateX }
