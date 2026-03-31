'use client'

import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { DescriptionWithButton } from '@/components/ui/DescriptionWithButton'
import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'

import { NextComponentType } from '@/types/next-component.type'

import { defaultMotionProps } from '@/config/motion.constant'
import { URLS } from '@/config/urls.config'

import { minMax } from '@/utils/funcs/min-max'

const Section3: NextComponentType = () => {
	const text =
		'POCHI DI SALORNO 46°24′47″N - 11°14′46″E CASTELVECCHIO 46°30′00″N - 11°21′00″E SOPRABOLZANO 46°31′40″N - 11°24′20″E'

	const controls = useAnimation()

	const [scroll, setScroll] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)
	const [windowWidth, setWindowWidth] = useState(0)

	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('Home.section3')

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		setWindowHeight(window.innerHeight)
		setWindowWidth(window.innerWidth)

		const handleScroll = () => {
			const { top } = container.getBoundingClientRect()
			setScroll(-top)
		}

		handleScroll()

		window.addEventListener('scroll', handleScroll)

		const animate = async () => {
			controls.set({ translateX: '-50%' })

			while (true) {
				await controls.start({
					translateX: '-25%',
					transition: { duration: 20, ease: 'linear' }
				})

				controls.set({ translateX: '-50%' })
			}
		}

		animate()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	// windowHeight multiplier - (sticky container height(vh) - 100)/100
	const imageScroll = minMax(scroll / (windowHeight * 1.5), 0, 1.2)

	return (
		<section ref={containerRef}>
			<div className='relative h-[250vh]'>
				<div className='sticky top-0 h-screen'>
					<Image
						src='/home/section3/image.webp'
						width={2560}
						height={1700}
						alt='home-territorio'
						className='h-full object-cover'
						style={{
							scale: 60 + 40 * imageScroll + '%',
							clipPath:
								`polygon(` +
								`${30 - 30 * imageScroll}% 0%, ` +
								`${70 + 30 * imageScroll}% 0%, ` +
								`${70 + 30 * imageScroll}% 100%, ` +
								`${30 - 30 * imageScroll}% 100%` +
								`)`
						}}
					/>

					<motion.div
						animate={controls}
						style={{ opacity: 250 * imageScroll + '%' }}
						className='text-main absolute top-1/2 left-1/2 flex -translate-y-1/2 text-4xl text-nowrap'
					>
						<div className='mx-2'>{text}</div>
						<div className='mx-2'>{text}</div>
						<div className='mx-2'>{text}</div>
						<div className='mx-2'>{text}</div>
					</motion.div>
				</div>
			</div>

			<div className='m-auto max-w-[80svw] py-[20svw]'>
				<HeaderTranslateX
					defaultMotionProps={defaultMotionProps}
					topHeader={t('title1')}
					bottomHeader={t('title2')}
					topHeaderX={-(scroll - windowHeight * 2) * 0.1 + windowWidth * 0.02}
					bottomHeaderX={
						(scroll - windowHeight * 2) * 0.13 - windowWidth * 0.04
					}
				/>

				<DescriptionWithButton
					defaultMotionProps={defaultMotionProps}
					lines={[t('description1'), t('description2'), t('description3')]}
					href={URLS.SOUTH_TYROL}
					buttonText={t('button')}
				/>
			</div>
		</section>
	)
}

export { Section3 }
