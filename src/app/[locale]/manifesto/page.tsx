import type { Metadata, NextPage } from 'next'

import { Manifesto } from '@/components/screens/manifesto/Manifesto'

export const metadata: Metadata = {}

const ManifestoPage: NextPage = () => {
	return <Manifesto />
}

export default ManifestoPage
