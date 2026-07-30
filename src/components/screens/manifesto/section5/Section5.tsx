'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

import Link from '@/components/ui/Link'
import { Links } from '@/components/ui/Links'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { URLS } from '@/config/urls.config'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

import Arrow from '&/public/svg/arrow.svg'

const Section5 = () => {
	const [scroll, setScroll] = useState(0)

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Manifesto.section5')

	const links = useMemo(
		() => [
			{ title: t('link1'), href: URLS.SOUTH_TYROL },
			{ title: t('link2'), href: URLS.TRADITIONAL_METHOD }
		],
		[]
	)

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
			className='mt-[10svh]'
		>
			<ScrollImage
				scroll={scroll}
				heightImpact={0.02}
				scrollImpact={0.05}
				imageProps={{
					src: '/manifesto/section5/image1.webp',
					width: 2560,
					height: 1772,
					alt: 'metodo-classico'
				}}
			/>

			<Links links={links} />
		</section>
	)
}

export { Section5 }
