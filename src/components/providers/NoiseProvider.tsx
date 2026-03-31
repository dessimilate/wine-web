'use client'

import { NextComponentType } from '@/types/next-component.type'

const NoiseProvider: NextComponentType = () => {
	return (
		<div
			className='animate-noise pointer-events-none fixed top-[-50vh] left-[-50vw] z-1000 h-[200vh] w-[200vw] opacity-10'
			style={{ backgroundImage: 'url("/noise.png")' }}
		/>
	)
}

export { NoiseProvider }
