'use client'

import { useTranslations } from 'next-intl'

import Link from '@/components/ui/Link'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

import Arrow from '&/public/svg/arrow.svg'

interface ILinksProps {
	links: { title: string; href: string }[]
}

const Links = ({ links }: ILinksProps) => {
	const t = useTranslations('LinksComponent')

	return (
		<div className='hover-scale-wrapper mt-[5svh] flex flex-col items-center'>
			<h2 className='mb-[3svh] text-4xl uppercase'>{t('title')}</h2>

			{links.map((link, i) => (
				<Link
					key={'manifesto-section5-link-' + i}
					className={cn(
						'hover-scale-item group relative flex items-center text-7xl uppercase transition-transform',
						FlechaBronzeaM.className
					)}
					href={link.href}
				>
					{link.title}

					<Arrow className='absolute left-full ml-10 h-6 transition-[margin-left] group-hover:ml-12' />
				</Link>
			))}
		</div>
	)
}

export { Links }
