import { useTranslations } from 'next-intl'

import Link from '@/components/ui/Link'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

import Logo from '&/public/svg/logo.svg'
import { LINKS, PRIVACY_ROLES, SOCIAL_MEDIA } from './footer-data'
import { SidebarElement } from './sidebar/SidebarElement'

const Footer = () => {
	const t = useTranslations('Footer')

	return (
		<footer className='px-[6svw] pt-[11svh] pb-[6svh]'>
			<div className='grid grid-cols-3 items-center gap-5 py-10'>
				{/* Links **/}
				<div className='flex h-fit flex-wrap items-center justify-center gap-x-4 gap-y-2'>
					{LINKS.map(el => (
						<SidebarElement
							key={el.labelKey}
							href={el.href}
						>
							{t(el.labelKey)}
						</SidebarElement>
					))}
				</div>

				{/* Address **/}
				<div className='flex w-full flex-col items-center gap-5'>
					<Logo className='w-40' />
					<p
						className={cn(
							'text-center text-6xl uppercase',
							FlechaBronzeaM.className
						)}
					>
						{t('address')}
					</p>
				</div>

				{/* Subscribe **/}
				<div>
					<p>{t('email')}</p>
					<input
						name='subscribe'
						type='email'
						placeholder='Your email address'
					/>
				</div>
			</div>

			<div className='grid grid-cols-3'>
				{/* Privacy **/}
				<div className='flex flex-col items-center'>
					{PRIVACY_ROLES.map(el => (
						<Link
							key={el.labelKey}
							className='text-sm leading-[1.1] uppercase'
							href={el.href}
						>
							{t(el.labelKey)}
						</Link>
					))}
				</div>

				{/* Copyright **/}
				<div className='text-center text-sm leading-[1.1]'>
					{t('copyright')}
				</div>

				{/* Social Media **/}
				<div className='flex flex-col items-center'>
					{SOCIAL_MEDIA.map(el => (
						<Link
							key={el.labelKey}
							className='text-sm leading-[1.1] uppercase'
							href={el.href}
						>
							{t(el.labelKey)}
						</Link>
					))}
				</div>
			</div>
		</footer>
	)
}

export { Footer }
