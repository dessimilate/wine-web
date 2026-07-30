'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Description } from '@/components/ui/Description'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { URLS } from '@/config/urls.config'

import { useWindowSize } from '@/hooks/useWindowSize'

const Section4 = () => {
	const [scroll, setScroll] = useState(0)
	const { width } = useWindowSize()

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Home.section4')

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
			className='drop-shadow-2xl'
		>
			<ScrollImage
				scroll={scroll}
				imageProps={{
					src: '/home/section4/image1.webp',
					width: 2560,
					height: 1772,
					alt: 'metodo-classico'
				}}
			>
				<div className='text-main absolute top-1/2 left-1/2 max-w-[80svw] -translate-x-1/2 -translate-y-1/2 text-nowrap'>
					<HeaderTranslateX
						topHeader={t('title1')}
						bottomHeader={t('title2')}
						topHeaderX={-scroll * 0.1 + width * 0.01}
						bottomHeaderX={scroll * 0.13 - width * 0.01}
					/>

					<Description
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
