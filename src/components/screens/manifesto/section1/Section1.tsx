'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { ScrollImage } from '@/components/ui/ScrollImage'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

const Section1 = () => {
	const t = useTranslations('Manifesto.section1')

	const containerRef = useRef<HTMLDivElement>(null)

	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

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
			className='relative pt-[10svh]'
		>
			<div className='mb-10 text-center'>
				<h1 className={cn('text-9xl uppercase', FlechaBronzeaM.className)}>
					{t('title')}
				</h1>
				<div className='leading-[1.2]'>
					<p className='uppercase'>{t('description1')}</p>
					<p className='uppercase'>{t('description2')}</p>
					<p className='uppercase'>{t('description3')}</p>
				</div>
			</div>

			<ScrollImage
				heightImpact={0.07}
				scroll={scroll}
				imageProps={{
					src: '/manifesto/section1/image1.webp',
					width: 2560,
					height: 2000,
					alt: 'manifesto-hero'
				}}
			/>
		</section>
	)
}

export { Section1 }
