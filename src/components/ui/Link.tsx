'use client'

import { usePageTransition } from '../providers/TransitionProvider'

import {
	Link as I18nLink,
	type LinkProps as I18nLinkProps
} from '@/i18n/routing'

export default function Link({
	href,
	onClick,
	...props
}: I18nLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const { startTransition } = usePageTransition()
	return (
		<I18nLink
			{...props}
			href={href}
			onClick={e => {
				if (
					e.metaKey ||
					e.ctrlKey ||
					e.shiftKey ||
					e.altKey ||
					e.button !== 0
				) {
					return
				}

				onClick?.(e)
				if (e.defaultPrevented) return

				e.preventDefault()
				startTransition(String(href))
			}}
		/>
	)
}
