'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { DescriptionWithButton } from '@/components/ui/DescriptionWithButton'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { NextComponentType } from '@/types/next-component.type'

import { defaultMotionProps } from '@/config/motion.constant'
import { URLS } from '@/config/urls.config'

const Section2: NextComponentType = () => {
	const [scroll, setScroll] = useState(0)
	const [windowWidth, setWindowWidth] = useState(0)

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Home.section2')

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		setWindowWidth(window.innerWidth)

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
			id='section2'
			className='relative'
		>
			<ScrollImage
				shift={-scroll * 0.09}
				imageProps={{
					src: '/home/section2/image.webp',
					width: 2560,
					height: 1772,
					alt: 'metodo-classico'
				}}
			/>

			<div className='m-auto max-w-[80svw] py-[20svw]'>
				<HeaderTranslateX
					defaultMotionProps={defaultMotionProps}
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-scroll * 0.1 + windowWidth * 0.08}
					bottomHeaderX={scroll * 0.13 - windowWidth * 0.04}
				/>

				<DescriptionWithButton
					defaultMotionProps={defaultMotionProps}
					lines={[t('description1'), t('description2'), t('description3')]}
					href={URLS.TRADITIONAL_METHOD}
					buttonText={t('button')}
				/>
			</div>
		</section>
	)
}

export { Section2 }
