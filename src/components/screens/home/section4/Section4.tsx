'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { DescriptionWithButton } from '@/components/ui/DescriptionWithButton'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { NextComponentType } from '@/types/next-component.type'

import { defaultMotionProps } from '@/config/motion.constant'
import { URLS } from '@/config/urls.config'

const Section4: NextComponentType = () => {
	const [scroll, setScroll] = useState(0)
	const [windowWidth, setWindowWidth] = useState(0)

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Home.section4')

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
		<section ref={containerRef}>
			<ScrollImage
				shift={-scroll * 0.07}
				imageProps={{
					src: '/home/section4/image.webp',
					width: 2560,
					height: 1772,
					alt: 'metodo-classico'
				}}
			>
				<div className='text-main absolute top-1/2 left-1/2 max-w-[80svw] -translate-x-1/2 -translate-y-1/2 text-nowrap'>
					<HeaderTranslateX
						defaultMotionProps={defaultMotionProps}
						topHeader={t('title1')}
						bottomHeader={t('title2')}
						topHeaderX={-scroll * 0.1 + windowWidth * 0.01}
						bottomHeaderX={scroll * 0.13 - windowWidth * 0.01}
					/>

					<DescriptionWithButton
						defaultMotionProps={defaultMotionProps}
						lines={[t('description1'), t('description2'), t('description3')]}
						href={URLS.EXPERIENCES}
						buttonText={t('button')}
						withoutBg={true}
					/>
				</div>
			</ScrollImage>
		</section>
	)
}

export { Section4 }
