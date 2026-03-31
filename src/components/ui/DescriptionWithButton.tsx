'use client'

import { MotionProps, motion } from 'framer-motion'

import { ButtonArrowType1 } from '@/components/ui/ButtonArrowType1'

import { NextComponentType } from '@/types/next-component.type'

import { cn } from '@/utils/cn'

interface DescriptionWithButtonProps {
	defaultMotionProps?: MotionProps
	lines: string[]
	href: string
	buttonText: string
	withoutBg?: boolean
}

const DescriptionWithButton: NextComponentType<DescriptionWithButtonProps> = ({
	defaultMotionProps = {},
	lines,
	href,
	buttonText,
	withoutBg = false
}) => {
	return (
		<motion.div
			{...defaultMotionProps}
			className='flex flex-col items-center text-center text-3xl'
		>
			{lines.map((line, i, arr) => (
				<p
					key={line + buttonText}
					className={cn(i === arr.length - 1 && 'mb-6')}
				>
					{line}
				</p>
			))}

			<ButtonArrowType1
				href={href}
				text={buttonText}
				withoutBg={withoutBg}
			/>
		</motion.div>
	)
}

export { DescriptionWithButton }
