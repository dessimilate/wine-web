import { PropsWithChildren } from 'react'

import { Footer } from './Footer'
import { Sidebar } from './sidebar/Sidebar'

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Sidebar />

			<main className='z-99'>{children}</main>

			<Footer />
		</>
	)
}

export { Layout }
