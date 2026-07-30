'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Description } from '@/components/ui/Description'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { URLS } from '@/config/urls.config'

import { useWindowSize } from '@/hooks/useWindowSize'

const Section2 = () => {
	const [scroll, setScroll] = useState(0)

	const { height } = useWindowSize()

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Home.section2')

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
			id='section2'
			className='relative'
		>
			<ScrollImage
				scroll={scroll}
				imageProps={{
					src: '/home/section2/image1.webp',
					width: 2560,
					height: 1772,
					alt: 'metodo-classico'
				}}
			/>

			<div className='m-auto max-w-[80svw] py-[20svw]'>
				<HeaderTranslateX
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-scroll * 0.1 + height * 0.08}
					bottomHeaderX={scroll * 0.13 - height * 0.04}
				/>

				<Description
					lines={[t('description1'), t('description2'), t('description3')]}
					href={URLS.TRADITIONAL_METHOD}
					buttonText={t('button')}
				/>
			</div>
		</section>
	)
}

export { Section2 }
