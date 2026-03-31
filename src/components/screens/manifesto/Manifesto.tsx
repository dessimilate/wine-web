'use client'

import { NextComponentType } from '@/types/next-component.type'

import { Section1 } from './section1/Section1'
import { Section2 } from './section2/Section2'

const Manifesto: NextComponentType = () => {
	return (
		<>
			<Section1 />
			<Section2 />
		</>
	)
}

export { Manifesto }
