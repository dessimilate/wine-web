'use client'

import { motion } from 'framer-motion'
import { set } from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { cn } from '@/utils/cn'

const CursorProvider: NextComponentType = () => {
	const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
	const [isHover, setIsHover] = useState(false)
	const [avgSpeed, setAvgSpeed] = useState(0)
	const [avgAngle, setAvgAngle] = useState(0)
	const historyRef = useRef<Array<{ time: number; dx: number; dy: number }>>([])
	const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null)

	useEffect(() => {
		const totalTime = 80

		// Mouse move event
		const handleMouseMove = (e: MouseEvent) => {
			const now = performance.now()
			const x = e.clientX
			const y = e.clientY

			setCursorPosition({ x, y })

			if (lastPosRef.current) {
				const dt = now - lastPosRef.current.time
				if (dt > 0) {
					const dx = x - lastPosRef.current.x
					const dy = y - lastPosRef.current.y

					historyRef.current.push({ time: now, dx, dy })
					historyRef.current = historyRef.current.filter(
						item => now - item.time <= totalTime
					)
				}
			}

			lastPosRef.current = { x, y, time: now }
		}

		// Average speed/angle
		const interval = setInterval(() => {
			const now = performance.now()
			const recent = historyRef.current.filter(
				item => now - item.time <= totalTime
			)

			if (recent.length > 10) {
				const { totalDx, totalDy, totalDistance } = recent.reduce(
					(res, el) => {
						return {
							totalDx: res.totalDx + el.dx,
							totalDy: res.totalDy + el.dy,
							totalDistance:
								res.totalDistance + Math.sqrt(el.dx ** 2 + el.dy ** 2)
						}
					},
					{ totalDx: 0, totalDy: 0, totalDistance: 0 }
				)

				setAvgSpeed(totalDistance / totalTime)

				const avgDx = totalDx / recent.length
				const avgDy = totalDy / recent.length
				let angle = Math.atan2(avgDy, avgDx) * (180 / Math.PI) + 90
				if (angle < 0) angle += 360
				setAvgAngle(angle)
			} else {
				setAvgSpeed(0)
				setAvgAngle(0)
			}
		}, 100)

		// Link/button/svg enter/out events
		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const closed = target.closest('a, button') as HTMLElement
			if (!closed) {
				setIsHover(false)
				return
			}
			const isValidTarget = closed && closed.hasAttribute('data-ignore-hover')
			setIsHover(!isValidTarget)
		}
		const handleMouseOut = () => {
			setIsHover(false)
		}

		window.addEventListener('mouseover', handleMouseOver)
		window.addEventListener('mouseout', handleMouseOut)
		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseover', handleMouseOver)
			window.removeEventListener('mouseout', handleMouseOut)
			clearInterval(interval)
		}
	}, [])

	return (
		<motion.div
			className={cn(
				'pointer-events-none fixed z-999 -translate-x-1/2 -translate-y-1/2 rounded-[100%] transition-[opacity,width,backdrop-filter] duration-200',
				isHover ? 'w-4 bg-amber-200/40' : 'w-5 backdrop-invert',
				cursorPosition.x < 0 ? 'opacity-0' : 'opacity-100'
			)}
			initial={{ aspectRatio: 1 }}
			animate={{
				left: cursorPosition.x,
				top: cursorPosition.y,
				aspectRatio: 1 - Math.min(avgSpeed / 6, 0.3)
			}}
			transition={{ ease: 'linear', duration: 0.02 }}
			style={{ rotate: avgAngle + 'deg' }}
		/>
	)
}

export { CursorProvider }
