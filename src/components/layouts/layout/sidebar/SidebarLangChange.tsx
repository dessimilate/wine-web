'use client'

import { useLocale } from 'next-intl'
import { useState, useTransition } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { locales } from '@/config/locales.constant'

import { cn } from '@/utils/cn'

import Arrow from '&/public/svg/arrow.svg'
import { SidebarElement } from './SidebarElement'
import { usePathname, useRouter } from '@/i18n/routing'

const SidebarLangChange: NextComponentType = ({}) => {
	const currentLocale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)

	function onSelectChange(nextLocale: string) {
		setIsOpen(false)
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale })
			router.refresh()
		})
	}

	return (
		<div className='relative flex w-20 justify-center'>
			<SidebarElement forceHide={isOpen}>
				<button
					onClick={() => setIsOpen(currentState => !currentState)}
					className='flex items-center'
				>
					<span className='mr-1'>{currentLocale.toUpperCase()}</span>
					<Arrow
						className={cn(
							'w-4 transition-transform',
							isOpen ? '-rotate-90' : 'rotate-90'
						)}
					/>
				</button>
			</SidebarElement>

			<div className='absolute top-full overflow-hidden'>
				<nav
					className={cn(
						'flex flex-col items-start transition-transform',
						isOpen ? 'translate-y-0' : '-translate-y-full'
					)}
				>
					{locales
						.filter(lang => lang !== currentLocale)
						.map(lang => (
							<button
								key={'lang-change-button-' + lang}
								onClick={() => onSelectChange(lang)}
								disabled={isPending}
							>
								{lang.toUpperCase()}
							</button>
						))}
				</nav>
			</div>
		</div>
	)
}

export { SidebarLangChange }
