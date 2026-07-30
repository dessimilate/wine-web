import { URLS } from '@/config/urls.config'

export const LINKS = [
	{ labelKey: 'links.home', href: URLS.HOME },
	{ labelKey: 'links.manifesto', href: URLS.MANIFESTO },
	{ labelKey: 'links.southTyrol', href: URLS.SOUTH_TYROL },
	{ labelKey: 'links.traditionalMethod', href: URLS.TRADITIONAL_METHOD },
	{ labelKey: 'links.selection', href: URLS.SELECTION },
	{ labelKey: 'links.classical', href: URLS.CLASSICAL },
	{ labelKey: 'links.experiences', href: URLS.EXPERIENCES },
	{ labelKey: 'links.contacts', href: URLS.CONTACTS }
]

export const PRIVACY_ROLES = [
	{ labelKey: 'privacyRoles.privacyPolicy', href: URLS.PRIVACY_POLICY },
	{ labelKey: 'privacyRoles.cookiePolicy', href: URLS.COOKIE_POLICY },
	{
		labelKey: 'privacyRoles.updateCookiePreferences',
		href: URLS.UPDATE_COOKIE_PREFERENCES
	}
]

export const SOCIAL_MEDIA = [
	{ labelKey: 'socialMedia.facebook', href: URLS.FACEBOOK },
	{ labelKey: 'socialMedia.instagram', href: URLS.INSTAGRAM }
]
