import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { defaultLocale } from './config/locales.constant'
import { URLS } from './config/urls.config'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export function middleware(req: NextRequest) {
	const {
		url,
		nextUrl: { pathname }
	} = req

	if (pathname === '/') {
		return NextResponse.redirect(new URL('/' + defaultLocale, url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/(ru|en)/:path*']
}
