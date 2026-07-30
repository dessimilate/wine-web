'use client'

import {
	AnimatePresence,
	animate,
	motion,
	useMotionTemplate,
	useMotionValue
} from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { cn } from '@/utils/cn'
import { minMax } from '@/utils/funcs/min-max'

import { FlechaBronzeaM } from '@/styles/fonts'

import KettmeirMapIcon from '&/public/svg/kettmeir-map-icon.svg'
import MapIcon from '&/public/svg/map-icon.svg'
import PlusIcon from '&/public/svg/plus.svg'

const Section3 = () => {
	const t = useTranslations('SouthTyrol.section3')

	const originY = useMotionValue(35)

	const [activeIndex, setActiveIndex] = useState(0)
	const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)
	const [xShift, setXShift] = useState(0)

	const mapWidthRef = useRef<HTMLDivElement>(null)
	const sectionRef = useRef<HTMLElement>(null)
	const mouseLeaveRef = useRef(true)
	const prevActiveIndex = useRef(activeIndex)

	const { width, height } = useWindowSize()

	const titles = [t('title1'), t('title2')]
	const descriptions = [t('description1'), t('description2')]
	const buttons = [t('button1'), t('button2'), t('button3'), t('button4')]

	const mapIcons = [
		{ top: 33, left: 70 },
		{ top: 44, left: 66 },
		{ top: 54, left: 68 }
	]

	const additionalMapIcons = [
		{
			title: t('additionalMapIcons.0.title'),
			isIcon: t('additionalMapIcons.0.icon') === 'icon',
			left: 70.5,
			top: 43
		},
		{
			title: t('additionalMapIcons.1.title'),
			isIcon: t('additionalMapIcons.1.icon') === 'icon',
			left: 69.5,
			top: 49
		}
	]

	useEffect(() => {
		if (!mapWidthRef.current) return
		if (!sectionRef.current) return

		const mapWidth = mapWidthRef.current.getBoundingClientRect().width
		const widthDiff = minMax((width - mapWidth) / 5, 0, 150)

		const handleMouseMove = (e: MouseEvent) => {
			if (mouseLeaveRef.current) return

			const x = e.clientX
			const ratio = +(x / width).toFixed(2)
			const xTransform = widthDiff * ratio

			setXShift(xTransform)
		}

		const handleMouseLeave = () => {
			mouseLeaveRef.current = true
			setXShift(0)
		}

		const handleMouseEnter = () => {
			mouseLeaveRef.current = false
		}

		window.addEventListener('mousemove', handleMouseMove)
		sectionRef.current.addEventListener('mouseleave', handleMouseLeave)
		sectionRef.current.addEventListener('mouseenter', handleMouseEnter)

		return () => {
			if (!sectionRef.current) return
			window.removeEventListener('mousemove', handleMouseMove)
			sectionRef.current.removeEventListener('mouseleave', handleMouseLeave)
			sectionRef.current.removeEventListener('mouseenter', handleMouseEnter)
		}
	}, [width])

	useEffect(() => {
		const nextOrigin = activeIndex === 1 ? 55 : 35

		if (prevActiveIndex.current === 0) {
			originY.set(nextOrigin)
		} else {
			animate(originY, nextOrigin, {
				duration: 0.7,
				ease: 'easeOut'
			})
		}

		prevActiveIndex.current = activeIndex
	}, [activeIndex])

	const transformOrigin = useMotionTemplate`72% ${originY}%`

	return (
		<section
			className='bg-alt-main relative flex h-screen w-screen justify-center overflow-hidden'
			ref={sectionRef}
		>
			<div className='absolute top-1/2 left-0 z-100 -translate-y-1/2 px-[6svw]'>
				<h2 className='mb-5'>
					{titles.map((el, i) => (
						<div
							key={'south-tyrol-section3-title-' + i}
							className={cn(
								'text-8xl leading-[0.8] uppercase',
								FlechaBronzeaM.className
							)}
						>
							{el}
						</div>
					))}
				</h2>
				<div className='mb-15'>
					{descriptions.map((el, i) => (
						<p
							className='text-3xl leading-none'
							key={'south-tyrol-section3-description-' + i}
						>
							{el}
						</p>
					))}
				</div>
				<div className='flex flex-col gap-5'>
					{buttons.map((el, i) => (
						<button
							className={cn(
								'rounded-full border px-6 py-2.5 leading-none uppercase transition-colors duration-500',
								activeIndex === i && 'bg-second text-main'
							)}
							key={'south-tyrol-section3-button-' + i}
							onClick={() => setActiveIndex(i)}
						>
							{el}
						</button>
					))}
				</div>
			</div>

			<motion.div
				className={cn(
					'relative aspect-[1.84] mix-blend-multiply transition-[scale] duration-700',
					!activeIndex ? 'scale-100' : 'scale-250',
					height * 1.84 < width ? 'w-full' : 'h-full'
				)}
				style={{ transformOrigin }}
				animate={{ x: -xShift }}
				transition={{ ease: 'easeOut' }}
				ref={mapWidthRef}
			>
				<Image
					src='/south-tyrol/section3/map.webp'
					width={5120}
					height={2776}
					alt='map'
					className='h-full w-full object-cover'
				/>

				<Image
					src='/south-tyrol/section3/map-border.webp'
					width={2560}
					height={1388}
					alt='map-border'
					className={cn(
						'absolute top-0 left-0 h-full object-cover transition-opacity duration-500',
						activeIndex && 'opacity-0'
					)}
				/>

				<div
					className={cn(
						'absolute top-22/100 left-69/100 text-6xl uppercase transition-opacity duration-500',
						activeIndex && 'opacity-0'
					)}
				>
					{t('mapTitle1')}
				</div>

				<div
					className={cn(
						'absolute top-7/10 left-56/100 text-6xl uppercase transition-opacity duration-500',
						activeIndex && 'opacity-0'
					)}
				>
					{t('mapTitle2')}
				</div>

				{mapIcons.map((el, i) => (
					<button
						key={'south-tyrol-section3-map-icon-' + i}
						className={cn(
							'absolute flex flex-col items-center transition-opacity duration-500',
							![0, mapIcons.length - i].includes(activeIndex) && 'opacity-0'
						)}
						style={{ left: el.left + '%', top: el.top + '%' }}
					>
						<MapIcon
							className={cn(
								'mb-2 w-6 transition-opacity duration-500',
								activeIndex && 'opacity-0'
							)}
						/>
						<div
							className={cn(
								'bg-second relative aspect-square w-3.5 rounded-full transition-[width] duration-700',
								activeIndex === mapIcons.length - i && 'w-10'
							)}
							onClick={() => {
								if (activeIndex === mapIcons.length - i) {
									setIsInfoWindowOpen(true)
								}
							}}
						>
							<AnimatePresence>
								{activeIndex === mapIcons.length - i && (
									<motion.div
										key={'south-tyrol-section3-item-' + i}
										initial={{ rotate: 0 }}
										animate={{ rotate: 360 }}
										transition={{ duration: 0.6, ease: 'easeInOut' }}
										className='absolute top-1/2 left-1/2 h-8/10 w-8/10 -translate-x-1/2 -translate-y-1/2'
									>
										<PlusIcon className='text-main w-full' />
									</motion.div>
								)}
							</AnimatePresence>

							<AnimatePresence>
								{activeIndex === mapIcons.length - i && (
									<motion.div
										key={'south-tyrol-section3-item-' + i}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.6, ease: 'easeInOut' }}
										className={cn(
											'absolute leading-none text-nowrap',
											!!+t(`button${mapIcons.length - i + 1}IsTextLeft`)
												? 'right-full mr-2 text-right'
												: 'left-full ml-2 text-left'
										)}
									>
										<div>{t(`button${mapIcons.length - i + 1}Title`)}</div>

										<div className='text-xs uppercase'>
											{t(`button${mapIcons.length - i + 1}Subtitle`)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</button>
				))}

				{additionalMapIcons.map((el, i) => (
					<div
						key={'south-tyrol-section3-button2-map-icon-' + i}
						className={cn(
							'bg-second absolute aspect-square w-1.5 rounded-full transition-opacity duration-500',
							activeIndex === 0 && 'opacity-0'
						)}
						style={{ left: el.left + '%', top: el.top + '%' }}
					>
						<div className='relative h-full w-full'>
							{el.isIcon && (
								<KettmeirMapIcon className='absolute bottom-full left-1/2 mb-1 w-9 -translate-x-1/2' />
							)}
							<div className='absolute top-1/2 ml-3 -translate-y-1/2 text-xs leading-none text-nowrap uppercase'>
								{el.title}
							</div>
						</div>
					</div>
				))}
			</motion.div>

			<AnimatePresence>
				{isInfoWindowOpen && (
					<motion.div
						key='south-tyrol-section3-overlay'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='bg-main/90 fixed top-0 left-0 z-9998 flex h-screen w-screen items-center justify-center'
					>
						<div className='relative grid max-h-[30svh] min-h-80 max-w-[80svw] min-w-150 grid-cols-2 gap-16'>
							<div>
								<Image
									src={t(`button${activeIndex + 1}Image`)}
									width={936}
									height={688}
									className='object-cover'
									alt='overlay-image'
								/>
							</div>

							<div>
								<div className='mb-4'>
									<h2 className='text-5xl'>
										{t(`button${activeIndex + 1}Title`)}
									</h2>
									<h3 className='text-base uppercase'>
										{t(`button${activeIndex + 1}Subtitle`)}
									</h3>
								</div>

								<p className='mb-4'>
									{t(`button${activeIndex + 1}Description`)}
								</p>

								<div className='grid grid-cols-2 gap-12 pr-10 text-xl'>
									<div>
										<div className='border-b'>{t('overlayAltitude')}</div>
										<div>{t(`button${activeIndex + 1}Altitude`)}</div>
									</div>
									<div>
										<div className='border-b'>{t('overlayGrapes')}</div>
										<div>
											{t(`button${activeIndex + 1}Grapes`)
												.split(',')
												.map((el, i) => (
													<div key={'south-tyrol-section3-overlay-grapes-' + i}>
														{el}
													</div>
												))}
										</div>
									</div>
								</div>
							</div>

							<div
								className='group absolute bottom-full left-full aspect-square h-16 rounded-full border p-4'
								onClick={() => setIsInfoWindowOpen(false)}
							>
								<PlusIcon className='text-second w-full rotate-45 transition-[rotate] group-hover:rotate-225' />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	)
}

export { Section3 }
