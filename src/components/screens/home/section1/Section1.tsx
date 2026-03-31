'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { Description } from './Description'
import { Header } from './Header'
import { SkipButton } from './SkipButton'

const Section1: NextComponentType = () => {
	const frameCount = 94

	const t = useTranslations('Home')

	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [scroll, setScroll] = useState(0)

	const { setIsMixNormal, getIsMixNormal } = useIsMixNormalStore()

	useEffect(() => {
		let currentFrame: number
		const loadedImages: HTMLImageElement[] = []

		const container = containerRef.current
		const canvas = canvasRef.current
		if (!container || !canvas) return

		const context = canvas.getContext('2d')
		if (!context) return

		// Draw frame on canvas
		const drawFrame = (index: number) => {
			context.clearRect(0, 0, canvas.width, canvas.height)
			const image = loadedImages[index - 1]

			canvas.width = window.innerWidth
			canvas.height = window.innerHeight

			const scale = Math.max(
				canvas.width / image.width,
				canvas.height / image.height
			)
			const w = image.width * scale
			const h = image.height * scale
			const x = (canvas.width - w) / 2
			const y = (canvas.height - h) / 2

			context.drawImage(image, x, y, w, h)
		}

		// Change current frame on scroll
		const handleScroll = (isInit: boolean = false) => {
			const { top, height } = container.getBoundingClientRect()
			const scrollHeight = height - 2 * window.innerHeight

			const progress = Math.max(0, Math.min(1, -top / scrollHeight))

			const lastFrame = currentFrame
			currentFrame = Math.round((frameCount - 1) * progress) + 1

			if (lastFrame !== currentFrame && !isInit) drawFrame(currentFrame)

			setScroll(-top)

			if (!getIsMixNormal() && currentFrame === 94) setIsMixNormal(true)
			if (getIsMixNormal() && currentFrame !== 94) setIsMixNormal(false)
		}

		const scrollHandler = () => handleScroll()

		// Init current frame for preload images
		handleScroll(true)

		// Preload images
		for (let i = 1; i <= frameCount; i++) {
			const img = new Image()
			img.src = `/home/images-sequence/wine-${String(i).padStart(2, '0')}.webp`
			img.onload = () => {
				loadedImages[i - 1] = img
				if (i === currentFrame) drawFrame(currentFrame)
			}
		}

		window.addEventListener('scroll', scrollHandler)

		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<section
			ref={containerRef}
			className='relative h-[400vh]'
		>
			<div className='sticky top-0 h-screen w-full'>
				<div className='relative h-full w-full'>
					<Header scroll={scroll} />
					<Description scroll={scroll} />
					<SkipButton scroll={scroll} />
					<canvas
						ref={canvasRef}
						className='absolute inset-0 h-screen w-full'
					/>
				</div>
			</div>
		</section>
	)
}

export { Section1 }
