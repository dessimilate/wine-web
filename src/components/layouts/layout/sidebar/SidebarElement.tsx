'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

import Link from '@/components/ui/Link'

import { NextComponentType } from '@/types/next-component.type'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { cn } from '@/utils/cn'

import { usePathname } from '@/i18n/routing'

interface SidebarElementProps {
	children: ReactNode
	href?: string
	forceHide?: boolean
}

const SidebarElement: NextComponentType<SidebarElementProps> = ({
	children,
	href,
	forceHide
}) => {
	const lineOutDuration = 200 //ms
	const lineAnimationDuration = 0.2 //s

	const [isHover, setIsHover] = useState(false)
	const timer = useRef<NodeJS.Timeout | null>(null)

	const pathname = usePathname()

	const isMixNormal = useIsMixNormalStore(state => state.isMixNormal)

	const Tag = href ? Link : 'div'

	useEffect(() => {
		if (pathname === href) {
			setIsHover(true)
		} else {
			setIsHover(false)
		}
	}, [pathname])

	return (
		<Tag
			href={href || '#'}
			className='relative'
			onMouseEnter={() => {
				if (timer.current) clearTimeout(timer.current)
				setIsHover(true)
			}}
			onMouseLeave={() => {
				if (pathname === href) return
				timer.current = setTimeout(() => setIsHover(false), lineOutDuration)
			}}
		>
			<li className='leading-none text-nowrap'>{children}</li>
			<motion.div
				className={cn(
					'absolute top-full h-0.25',
					isMixNormal ? 'bg-second' : 'bg-second-inverted'
				)}
				animate={{ width: isHover && !forceHide ? '100%' : '0%' }}
				transition={{ ease: 'easeOut', duration: lineAnimationDuration }}
			/>
		</Tag>
	)
}

export { SidebarElement }
