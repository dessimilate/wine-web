'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { ButtonArrowType1 } from '@/components/ui/ButtonArrowType1'

import { cn } from '@/utils/cn'

interface DescriptionProps {
	lines: string[]
	href?: string
	buttonText?: string
	withoutBg?: boolean
	isNoButton?: boolean
}

const delayIncrement = 0.15

const Description = ({
	isNoButton = false,
	lines,
	href = '#',
	buttonText = '',
	withoutBg = false
}: DescriptionProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	const [isInView, setIsInView] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsInView(true)
						observer.disconnect()
					}
				})
			},
			{ threshold: 0.1, rootMargin: '-30% 0px' }
		)

		observer.observe(containerRef.current as Element)

		return () => observer.disconnect()
	}, [])

	return (
		<motion.div
			ref={containerRef}
			className='flex flex-col items-center text-center text-3xl'
		>
			{lines.map((line, i, arr) => (
				<motion.p
					key={line + buttonText}
					animate={
						isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }
					}
					transition={{
						duration: 0.8,
						ease: 'easeOut',
						delay: delayIncrement * i
					}}
					className={cn(i === arr.length - 1 && 'mb-6')}
				>
					{line}
				</motion.p>
			))}

			<motion.div
				animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
				transition={{
					duration: 0.8,
					ease: 'easeOut',
					delay: delayIncrement * lines.length
				}}
			>
				{!isNoButton && (
					<ButtonArrowType1
						href={href}
						text={buttonText}
						withoutBg={withoutBg}
					/>
				)}
			</motion.div>
		</motion.div>
	)
}

export { Description }
