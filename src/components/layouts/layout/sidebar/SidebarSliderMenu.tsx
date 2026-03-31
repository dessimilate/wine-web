'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { cn } from '@/utils/cn'

import Arrow from '&/public/svg/arrow.svg'
import { SidebarElement } from './SidebarElement'

const SidebarSliderMenu: NextComponentType = () => {
	const t = useTranslations('Sidebar')

	const [isOpen, setIsOpen] = useState(false)

	const isMixNormal = useIsMixNormalStore(state => state.isMixNormal)

	const links = [
		{ href: URLS.TRADITIONAL_METHOD, label: t('sliderMenu.traditionalMethod') },
		{ href: URLS.SELECTION, label: t('sliderMenu.selection') },
		{ href: URLS.CLASSICAL, label: t('sliderMenu.classical') }
	]

	return (
		<div className='relative'>
			<SidebarElement forceHide={isOpen}>
				<button onClick={() => setIsOpen(currentState => !currentState)}>
					<div className='flex items-center'>
						{t('sliderMenu.title')}
						<Arrow
							className={cn(
								'w-4 transition-transform',
								isOpen ? '-rotate-90' : 'rotate-90'
							)}
						/>
					</div>
				</button>
			</SidebarElement>

			<div
				className={cn(
					'absolute top-11/10 left-1/2 -translate-x-1/2 overflow-hidden p-4'
				)}
			>
				<nav
					className={cn(
						'flex items-center gap-6 rounded-br-2xl rounded-bl-2xl px-4 pb-2 transition-transform',
						isOpen ? 'translate-y-0' : '-translate-y-20/10',
						isMixNormal && 'bg-main'
					)}
				>
					{links.map((link, i) => (
						<SidebarElement
							href={link.href}
							key={'link-button-slider-' + i}
						>
							{link.label}
						</SidebarElement>
					))}
				</nav>
			</div>
		</div>
	)
}

export { SidebarSliderMenu }
