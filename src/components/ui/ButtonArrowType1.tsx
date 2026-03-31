'use client'

import Link from '@/components/ui/Link'

import { NextComponentType } from '@/types/next-component.type'

import { cn } from '@/utils/cn'

import Arrow from '&/public/svg/arrow.svg'

interface IProps {
	text: string
	href: string
	withoutBg?: boolean
}

const ButtonArrowType1: NextComponentType<IProps> = ({
	href,
	text,
	withoutBg
}) => {
	return (
		<Link
			href={href}
			className='group flex items-center'
		>
			<div
				className={cn(
					'flex h-12 w-20 items-center justify-center rounded-[50%] border-2 transition-colors duration-300',
					!withoutBg && 'group-hover:bg-second'
				)}
			>
				<Arrow className='group-hover:text-main w-8 transition-[color,margin-left] duration-300 group-hover:ml-4' />
			</div>
			<div className='ml-[2svw] uppercase transition-transform duration-300 group-hover:translate-x-2'>
				{text}
			</div>
		</Link>
	)
}

export { ButtonArrowType1 }
