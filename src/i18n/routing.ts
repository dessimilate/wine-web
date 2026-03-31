import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import type { ComponentProps } from 'react'

import { defaultLocale, locales } from '@/config/locales.constant'

export const routing = defineRouting({
	locales,
	defaultLocale
})

export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing)

export type LinkProps = ComponentProps<typeof Link>
