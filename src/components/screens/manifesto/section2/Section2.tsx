'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Description } from '@/components/ui/Description'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ImagesWithText } from '@/components/ui/ImagesWithText'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { useWindowSize } from '@/hooks/useWindowSize'

const Section2 = () => {
	const t = useTranslations('Manifesto.section2')

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
			className='py-[10svh]'
		>
			<div className='m-auto mb-[10svh] max-w-[80svw]'>
				<HeaderTranslateX
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-scroll * 0.1 + width * 0.02}
					bottomHeaderX={scroll * 0.1 + width * 0.03}
				/>

				<Description
					lines={[
						t('titleDescription1'),
						t('titleDescription2'),
						t('titleDescription3')
					]}
					isNoButton
				/>
			</div>

			<ImagesWithText
				image1Props={{
					src: '/manifesto/section2/image1.webp',
					width: 1107,
					height: 1327,
					alt: 'manifesto-1'
				}}
				image2Props={{
					src: '/manifesto/section2/image2.webp',
					width: 657,
					height: 789,
					alt: 'manifesto-2'
				}}
				scroll={scroll}
				t={t}
			/>
		</section>
	)
}

export { Section2 }
