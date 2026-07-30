const config = {
	trailingComma: 'none',
	tabWidth: 2,
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'^@/components/(.*)$',
		'^@/constants/(.*)$',
		'^@/types/(.*)$',
		'^@/config/(.*)$',
		'^@/store/(.*)$',
		'^@/hooks/(.*)$',
		'^@/utils/(.*)$',
		'^@/styles/(.*)$',
		'^../(.*)',
		'^./(.*)',
		'(.scss)$'
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss'
	],
	tailwindFunctions: ['clsx'],
	overrides: [
		{
			files: '*.svg',
			options: {
				parser: 'html'
			}
		}
	]
}

export default config
