'use client'

import { useTranslations } from 'next-intl'

import { SidebarLangChange } from '@/components/layouts/layout/sidebar/SidebarLangChange'

import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { cn } from '@/utils/cn'

import { SidebarElement } from './SidebarElement'
import { SidebarHomeButton } from './SidebarHome'
import { SidebarSliderMenu } from './SidebarSliderMenu'

const Sidebar: NextComponentType = () => {
	const t = useTranslations('Sidebar')

	const isMixNormal = useIsMixNormalStore(state => state.isMixNormal)

	const linkButtonsLeft = [
		{ title: t('manifesto'), href: URLS.MANIFESTO },
		{ title: t('southTyrol'), href: URLS.SOUTH_TYROL }
	]

	const linkButtonsRight = [
		{ title: t('experiences'), href: URLS.EXPERIENCES },
		{ title: t('contacts'), href: URLS.CONTACTS }
	]

	return (
		<nav
			className={cn(
				'fixed top-0 left-0 isolate z-100 flex h-20 w-full items-center justify-around px-10',
				isMixNormal
					? 'bg-main text-second mix-blend-normal'
					: 'text-second-inverted mix-blend-difference'
			)}
		>
			<SidebarHomeButton />
			<div className='flex items-center gap-6 rounded-lg'>
				{linkButtonsLeft.map(({ title, href }, i) => (
					<SidebarElement
						key={'link-buttons-left-' + i}
						{...{ children: title, href }}
					/>
				))}

				<SidebarSliderMenu />

				{linkButtonsRight.map(({ title, href }, i) => (
					<SidebarElement
						key={'link-buttons-right-' + i}
						{...{ children: title, href }}
					/>
				))}
			</div>
			<SidebarLangChange />
		</nav>
	)
}

export { Sidebar }
