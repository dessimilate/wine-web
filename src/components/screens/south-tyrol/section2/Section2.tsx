'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ImagesWithText } from '@/components/ui/ImagesWithText'

import { useWindowSize } from '@/hooks/useWindowSize'

const Section2 = () => {
	const t = useTranslations('SouthTyrol.section2')

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
			<div className='m-auto mb-[10svw] max-w-[80svw]'>
				<HeaderTranslateX
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-scroll * 0.1 + width * 0.01}
					bottomHeaderX={scroll * 0.13 + width * 0.05}
				/>
			</div>

			<ImagesWithText
				image1Props={{
					src: '/south-tyrol/section2/image1.webp',
					width: 1107,
					height: 1327,
					alt: 'alto-adige-1'
				}}
				image2Props={{
					src: '/south-tyrol/section2/image2.webp',
					width: 657,
					height: 789,
					alt: 'alto-adige-2'
				}}
				scroll={scroll}
				t={t}
			/>
		</section>
	)
}

export { Section2 }
