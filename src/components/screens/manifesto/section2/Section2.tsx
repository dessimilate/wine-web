'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { HeaderTranslateX } from '@/components/ui/HeaderTranslateX'
import { ScrollImage } from '@/components/ui/ScrollImage'

import { NextComponentType } from '@/types/next-component.type'

import { defaultMotionProps } from '@/config/motion.constant'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/app/fonts'

const Section2: NextComponentType = () => {
	const t = useTranslations('Manifesto.section2')

	const containerRef = useRef<HTMLDivElement>(null)

	const [scroll, setScroll] = useState(0)
	const [windowWidth, setWindowWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		setWindowWidth(window.innerWidth)
		setWindowHeight(window.innerHeight)

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
			className='my-[30svh]'
		>
			<div className='px-[6svw]'>
				<div className='flex'>
					<div className='w-1/2'>
						<Image
							src='/manifesto/section2/image1.webp'
							width={1107}
							height={1327}
							className='object-cover'
							alt='manifesto-hero'
						/>
					</div>
					<div className='w-1/2 pl-[5svw]'>{t('description1')}</div>
				</div>
				<div className='mt-[-15%] flex items-end'>
					<div className='w-1/2'>{t('description2')}</div>
					<div className='ml-[15%] w-7/20'>
						<Image
							src='/manifesto/section2/image2.webp'
							width={657}
							height={789}
							className='object-cover'
							alt='manifesto-hero'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export { Section2 }
