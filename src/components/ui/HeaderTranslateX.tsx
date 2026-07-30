'use client'

import { MotionProps, motion } from 'framer-motion'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

const defaultMotionProps: MotionProps = {
	initial: { opacity: 0, y: '50%' },
	whileInView: { opacity: 1, y: '0%' },
	viewport: { once: true, amount: 0.4, margin: '-20%' },
	transition: { duration: 0.5, ease: 'easeOut' }
}

interface IHeaderProps {
	topHeaderX: number
	bottomHeaderX: number
	topHeader: string
	bottomHeader: string
}

const HeaderTranslateX = ({
	topHeaderX,
	bottomHeaderX,
	topHeader,
	bottomHeader
}: IHeaderProps) => {
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
