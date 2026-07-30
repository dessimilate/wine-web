'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Links } from '@/components/ui/Links'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { URLS } from '@/config/urls.config'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

const Section6 = () => {
	const t = useTranslations('SouthTyrol.section6')

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

	const links = useMemo(
		() => [
			{ title: t('link1'), href: URLS.SOUTH_TYROL },
			{ title: t('link2'), href: URLS.TRADITIONAL_METHOD }
		],
		[]
	)

	const descriptions = [t('description2'), t('description3')]
	const titles = [t('title2'), t('title3')]

	return (
		<section ref={containerRef}>
			<ScrollImage
				heightImpact={0.03}
				scroll={scroll}
				imageProps={{
					src: '/south-tyrol/section6/image1.webp',
					width: 2560,
					height: 2000,
					alt: 'alto-adige-hero'
				}}
			/>

			<div className='px-[5svw] py-[13svh]'>
				<div className='mb-[5svh] grid grid-cols-2 justify-between'>
					<h2
						className={cn(
							'w-full text-[7svw] leading-none text-nowrap uppercase',
							FlechaBronzeaM.className
						)}
					>
						{t('title1')}
					</h2>
					<p className='w-full text-[2svw]'>{t('description1')}</p>
				</div>

				<div className='mt-[-7svh] grid grid-cols-2'>
					<div className='w-7/10'>
						<ScrollImage
							sizeWrapper
							appearanceAnimation
							scrollImpact={0.06}
							scroll={scroll}
							imageProps={{
								src: '/south-tyrol/section6/image2.webp',
								width: 2560,
								height: 2000,
								alt: 'alto-adige-hero'
							}}
						/>
					</div>
					<div className='w-full pt-[7svh]'>
						<div>
							{descriptions.map((el, i) => (
								<p
									key={'south-tyrol-section6-description-' + i}
									className='text-[1.3svw] text-nowrap uppercase'
								>
									{el}
								</p>
							))}
						</div>

						<div className='mt-20'>
							{titles.map((el, i) => (
								<h3
									key={'south-tyrol-section6-title-' + i}
									className='text-[2svw] leading-none text-nowrap'
								>
									{el}
								</h3>
							))}

							<button className='mt-5 rounded-full border px-20 py-3 text-[1.3svw] leading-none uppercase'>
								{t('download')}
							</button>
						</div>
					</div>
				</div>
			</div>

			<ScrollImage
				heightImpact={0.2}
				scroll={scroll}
				imageProps={{
					src: '/south-tyrol/section6/image3.webp',
					width: 2560,
					height: 2000,
					alt: 'alto-adige-hero'
				}}
			/>

			<Links links={links} />
		</section>
	)
}

export { Section6 }
