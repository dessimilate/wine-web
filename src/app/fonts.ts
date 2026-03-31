import localFont from 'next/font/local'

export const FlechaM = localFont({
	src: [
		{
			path: '../../public/fonts/FlechaM-Light.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../../public/fonts/FlechaM-LightItalic.woff2',
			weight: '300',
			style: 'italic'
		},
		{
			path: '../../public/fonts/FlechaM-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/FlechaM-Italic.woff2',
			weight: '400',
			style: 'italic'
		}
	],
	variable: '--font-my',
	display: 'swap'
})

export const FlechaBronzeaM = localFont({
	src: [
		{
			path: '../../public/fonts/FlechaBronzeaM-Regular.woff2',
			weight: '400',
			style: 'normal'
		}
	],
	variable: '--font-my',
	display: 'swap'
})
