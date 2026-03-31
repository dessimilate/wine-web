import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		}
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: { not: /\.(css|scss|sass)$/ },
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						icon: true,
						svgo: true
					}
				}
			]
		})
		config.resolve.alias['next/link'] = path.resolve(
			__dirname,
			'./src/components/ui/Link.tsx'
		)
		return config
	}
}
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
