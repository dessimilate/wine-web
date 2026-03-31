'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { NextComponentType } from '@/types/next-component.type'

import { defaultMotionProps } from '@/config/motion.constant'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/app/fonts'

const Section1: NextComponentType = () => {
	const t = useTranslations('Manifesto.section1')

	const containerRef = useRef<HTMLDivElement>(null)

	const [scroll, setScroll] = useState(0)
	const [windowWidth, setWindowWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		setWindowWidth(window.innerWidth)
		setWindowHeight(window.innerHeight)

		const handleScroll = () => {
			const { top } = container.getBoundingClientRect()
			setScroll(-top)
		}

		handleScroll()

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<section
			ref={containerRef}
			className='relative pt-20'
		>
			<div className='mb-10 text-center'>
				<h1 className={cn('text-9xl uppercase', FlechaBronzeaM.className)}>
					{t('title1')}
				</h1>
				<div className='leading-[1.2]'>
					<p className='uppercase'>{t('description1')}</p>
					<p className='uppercase'>{t('description2')}</p>
					<p className='uppercase'>{t('description3')}</p>
				</div>
			</div>

			<ScrollImage
				shift={-scroll * 0.07 + windowHeight * 0.05}
				imageProps={{
					src: '/manifesto/section1/image.webp',
					width: 2560,
					height: 2000,
					alt: 'manifesto-hero'
				}}
			/>

			<div className='m-auto mt-10 max-w-[80svw] py-[20svw]'>
				<HeaderTranslateX
					defaultMotionProps={defaultMotionProps}
					topHeader={t('title2')}
					bottomHeader={t('title3')}
					topHeaderX={-scroll * 0.1 + windowWidth * 0.12}
					bottomHeaderX={scroll * 0.13 - windowWidth * 0.16}
				/>

				<motion.div
					className='text-center'
					{...defaultMotionProps}
				>
					<p>{t('description4')}</p>
					<p>{t('description5')}</p>
					<p>{t('description6')}</p>
				</motion.div>
			</div>
		</section>
	)
}

export { Section1 }
