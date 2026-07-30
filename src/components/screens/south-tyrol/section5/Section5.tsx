'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { base } from 'framer-motion/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { slowOut } from '@/config/motion.config'

import { useWindowSize } from '@/hooks/useWindowSize'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

const slideCount = 4

const Section5 = () => {
	const t = useTranslations('SouthTyrol.section5')

	const fullWidth = -100 * slideCount

	const initialSlide = 0
	const initialOffset = fullWidth
	const baseX = useMotionValue(initialOffset)

	const [slide, setSlide] = useState(initialSlide)
	const [baseXCurrent, setBaseXCurrent] = useState(initialOffset)

	const { width, height } = useWindowSize()
	const circleSize = useMemo(
		() => Math.min(width, height) * 1.5,
		[width, height]
	)

	const buttons = useMemo(
		() => [
			{ title: t('slideTitle1'), condition: slide > 1, onClickSlide: 0 },
			{ title: t('slideTitle2'), condition: slide <= 1, onClickSlide: 2 }
		],
		[slide]
	)

	// Next Slide
	const next = () => {
		if (slideCount - slide <= 2 && baseXCurrent < fullWidth) {
			baseX.set(baseXCurrent - fullWidth)

			animate(baseX, baseXCurrent - fullWidth - 100, {
				duration: 0.4,
				ease: slowOut
			})

			setBaseXCurrent(baseXCurrent - fullWidth - 100)
		} else {
			animate(baseX, baseXCurrent - 100, {
				duration: 0.4,
				ease: slowOut
			})
			setBaseXCurrent(baseXCurrent - 100)
		}

		setSlide(prev => (prev + 1) % slideCount)
	}

	// Previous Slide
	const prev = () => {
		if (slide <= 1 && baseXCurrent > fullWidth) {
			baseX.set(baseXCurrent + fullWidth)

			animate(baseX, baseXCurrent + fullWidth + 100, {
				duration: 0.4,
				ease: slowOut
			})

			setBaseXCurrent(baseXCurrent + fullWidth + 100)
		} else {
			animate(baseX, baseXCurrent + 100, {
				duration: 0.4,
				ease: slowOut
			})
			setBaseXCurrent(baseXCurrent + 100)
		}

		setSlide(prev => (prev - 1 + slideCount) % slideCount)
	}

	// To Target Slide
	const toTargetSlide = (targetSlide: number) => {
		const right = (targetSlide - slide + slideCount) % slideCount
		const left = (slide - targetSlide + slideCount) % slideCount

		if (right < left) {
			// Go Right
			if (
				(slideCount - 1 - targetSlide <= 2 || targetSlide < slide) &&
				baseXCurrent < fullWidth
			) {
				baseX.set(baseXCurrent - fullWidth)

				animate(baseX, baseXCurrent - fullWidth - 100 * right, {
					duration: 0.4,
					ease: slowOut
				})

				setBaseXCurrent(baseXCurrent - fullWidth - 100 * right)
			} else {
				animate(baseX, baseXCurrent - 100 * right, {
					duration: 0.4,
					ease: slowOut
				})

				setBaseXCurrent(baseXCurrent - 100 * right)
			}
		} else {
			// Go Left
			if (
				(targetSlide <= 2 || targetSlide > slide) &&
				baseXCurrent > fullWidth
			) {
				baseX.set(baseXCurrent + fullWidth)

				animate(baseX, baseXCurrent + fullWidth + 100 * left, {
					duration: 0.4,
					ease: slowOut
				})

				setBaseXCurrent(baseXCurrent + fullWidth + 100 * left)
			} else {
				animate(baseX, baseXCurrent + 100 * left, {
					duration: 0.4,
					ease: slowOut
				})
				setBaseXCurrent(baseXCurrent + 100 * left)
			}
		}

		setSlide(targetSlide)
	}

	const x = useTransform(baseX, value => `${value}%`)

	return (
		<section className='bg-alt-main px-[6svw] py-[10svw]'>
			<h2
				className={cn(
					'text-center text-[10svw] leading-none uppercase',
					FlechaBronzeaM.className
				)}
			>
				{t('title')}
			</h2>
			<div
				className={cn(
					'mb-[6svh] flex justify-center gap-10 text-center text-[7svw] leading-none',
					FlechaBronzeaM.className
				)}
			>
				{buttons.map((button, i) => (
					<button
						key={'south-tyrol-section5-button-' + i}
						className={cn(
							'hover:text-second uppercase transition-colors duration-500',
							button.condition && 'text-second/20'
						)}
						onClick={() => toTargetSlide(button.onClickSlide)}
					>
						{button.title}
					</button>
				))}
			</div>

			<div className='relative'>
				<div
					className='absolute top-1/2 z-100 -translate-x-99/100 -translate-y-1/2 rounded-full bg-gray-500 opacity-0 blur-2xl transition-opacity duration-500 hover:opacity-100'
					style={{ width: circleSize + 'px', height: circleSize + 'px' }}
					onClick={() => prev()}
				/>

				<motion.div className='flex h-100 w-full overflow-hidden'>
					{[...new Array(slideCount * 2)].map((_, i) => (
						<motion.div
							key={'south-tyrol-section5-slide-' + i}
							className='grid h-full w-full shrink-0 grid-cols-2'
							style={{ x }}
						>
							<div className='relative flex h-full w-full items-center justify-center p-4'>
								<Image
									src={`/south-tyrol/section5/image${(i % slideCount) + 1}.webp`}
									fill
									alt={`sostenibilità-${(i % slideCount) + 1}`}
									className='object-cover'
								/>
							</div>
							<div className='h-full w-full p-4 pl-10'>
								<h3 className='text-[4svw] uppercase'>
									{t(`slides.${i % slideCount}.title`)}
								</h3>
								<p>{t(`slides.${i % slideCount}.description`)}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				<div
					className='absolute top-1/2 right-0 z-100 translate-x-99/100 -translate-y-1/2 rounded-full bg-gray-500 opacity-0 blur-2xl transition-opacity duration-500 hover:opacity-100'
					style={{ width: circleSize + 'px', height: circleSize + 'px' }}
					onClick={() => next()}
				/>
			</div>
		</section>
	)
}

export { Section5 }
