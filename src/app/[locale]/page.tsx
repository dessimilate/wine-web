import type { Metadata, NextPage } from 'next'

import { Home } from '@/components/screens/home/Home'

export const metadata: Metadata = {}

const HomePage: NextPage = () => {
	return <Home />
}

export default HomePage
