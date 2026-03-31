import { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useIsMixNormalStore } from '@/store/isMixNormal'

import { cn } from '@/utils/cn'

import Logo from '&/public/svg/logo.svg'
import Link from '@/components/ui/Link'

const SidebarHomeButton: NextComponentType = () => {
	const isMixNormal = useIsMixNormalStore(state => state.isMixNormal)

	return (
		<Link
			href={URLS.HOME}
			className='w-20'
		>
			<Logo
				className={cn(
					'w-full',
					isMixNormal ? 'hover:text-second/80' : 'hover:text-second-inverted/80'
				)}
			/>
		</Link>
	)
}

export { SidebarHomeButton }
