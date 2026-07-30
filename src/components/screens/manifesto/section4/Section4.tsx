'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ImagesWithText } from '@/components/ui/ImagesWithText'

import { useWindowSize } from '@/hooks/useWindowSize'

const Section4 = () => {
	const t = useTranslations('Manifesto.section4')

	const containerRef = useRef<HTMLDivElement>(null)

	const [scroll, setScroll] = useState(0)
	const { width } = useWindowSize()

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
			className='py-[10svw]'
		>
			<div className='mx-auto mb-[10svh]'>
				<HeaderTranslateX
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-scroll * 0.1 - width * 0.03}
					bottomHeaderX={scroll * 0.1 + width * 0.03}
				/>
			</div>

			<ImagesWithText
				isFirstImageRight
				image1Props={{
					src: '/manifesto/section4/image1.webp',
					width: 1107,
					height: 1327,
					alt: 'manifesto-3'
				}}
				image2Props={{
					src: '/manifesto/section4/image2.webp',
					width: 657,
					height: 789,
					alt: 'manifesto-4'
				}}
				scroll={scroll}
				t={t}
			/>
		</section>
	)
}

export { Section4 }
