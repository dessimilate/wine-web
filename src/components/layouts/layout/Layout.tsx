import { PropsWithChildren } from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { Footer } from './Footer'
import { Sidebar } from './sidebar/Sidebar'

const Layout: NextComponentType<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Sidebar />

			<main className='z-99'>{children}</main>

			<Footer />
		</>
	)
}

export { Layout }
