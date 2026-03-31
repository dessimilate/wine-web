import Link from '@/components/ui/Link'

import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { cn } from '@/utils/cn'

import Logo from '&/public/svg/logo.svg'
import { SidebarElement } from './sidebar/SidebarElement'
import { FlechaBronzeaM } from '@/app/fonts'

const Footer: NextComponentType = () => {
	const links = [
		{ text: 'Home', href: URLS.HOME },
		{ text: 'Manifesto', href: URLS.MANIFESTO },
		{ text: 'South Tyrol', href: URLS.SOUTH_TYROL },
		{ text: 'Traditional Method', href: URLS.TRADITIONAL_METHOD },
		{ text: 'Selection', href: URLS.SELECTION },
		{ text: 'Classical', href: URLS.CLASSICAL },
		{ text: 'Experiences', href: URLS.EXPERIENCES },
		{ text: 'Contacts', href: URLS.CONTACTS }
	]

	const privacyRoles = [
		{ text: 'privacy policy', href: URLS.PRIVACY_POLICY },
		{ text: 'cookie policy', href: URLS.COOKIE_POLICY },
		{ text: 'update cookie preferences', href: URLS.UPDATE_COOKIE_PREFERENCES }
	]

	const socialMedia = [
		{ text: 'facebook', href: URLS.FACEBOOK },
		{ text: 'instagram', href: URLS.INSTAGRAM }
	]

	return (
		<footer className='px-[6svw] pt-[11svh] pb-[6svh]'>
			<div className='grid grid-cols-3 items-center gap-5 py-10'>
				<div className='flex h-fit flex-wrap items-center justify-center gap-x-4 gap-y-2'>
					{links.map(el => (
						<SidebarElement
							key={el.text}
							href={el.href}
						>
							{el.text}
						</SidebarElement>
					))}
				</div>

				<div className='flex w-full flex-col items-center gap-5'>
					<Logo className='w-40' />
					<p
						className={cn(
							'text-center text-6xl uppercase',
							FlechaBronzeaM.className
						)}
					>
						Via delle Cantine, 4<br />
						39052 Caldaro (BZ)
						<br />
						italia
					</p>
				</div>

				<div>
					<p>
						Updates and exclusive content from the world of Kettmeir directly to
						your inbox.
					</p>
					<input
						type='email'
						placeholder='Your email address'
					/>
				</div>
			</div>

			<div className='grid grid-cols-3'>
				<div className='flex flex-col items-center'>
					{privacyRoles.map(el => (
						<Link
							key={el.text}
							className='text-sm leading-[1.1] uppercase'
							href={el.href}
						>
							{el.text}
						</Link>
					))}
				</div>

				<div className='text-center text-sm leading-[1.1]'>
					© 2026 KETTMEIR SpA socio unico HERITA MARZOTTO WINES SpA - Sede
					legale FOSSALTA DI PORTOGRUARO (VE) VIA ITA MARZOTTO 8 CAP 30025 -
					Codice fiscale e n.iscr. al Registro Imprese 00717760243 - Partita IVA
					00884040270
				</div>

				<div className='flex flex-col items-center'>
					{socialMedia.map(el => (
						<Link
							key={el.text}
							className='text-sm leading-[1.1] uppercase'
							href={el.href}
						>
							{el.text}
						</Link>
					))}
				</div>
			</div>
		</footer>
	)
}

export { Footer }
