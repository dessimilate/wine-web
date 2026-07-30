import type { Metadata } from 'next'

export const metadata: Metadata = {}

const NotFound = () => {
	return (
		<div>
			The page does not exist or has not yet been created (this is a practice
			project and does not entail full implementation).
		</div>
	)
}

export default NotFound
