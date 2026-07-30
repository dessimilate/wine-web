'use client'

import {
	PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useState
} from 'react'

import { waitForPageReady } from '@/utils/funcs/wait-for-page-ready'

import { useRouter } from '@/i18n/routing'

type TransitionContextType = {
	startTransition: (href: string) => void
	phase: 'idle' | 'enter' | 'exit'
	transitionKey: number
	onEnterComplete: () => void
	onExitComplete: () => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

const TransitionProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter()

	const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle')

	const [nextRoute, setNextRoute] = useState<string | null>(null)
	const [transitionKey, setTransitionKey] = useState(0)
	const isTransitioningRef = useRef(false)

	const startTransition = (href: string) => {
		if (isTransitioningRef.current) return

		isTransitioningRef.current = true
		setNextRoute(href)
		setTransitionKey(key => key + 1)
		setPhase('enter')
	}

	const onEnterComplete = async () => {
		if (!nextRoute) {
			isTransitioningRef.current = false
			setPhase('idle')
			return
		}

		router.push(nextRoute)

		await waitForPageReady()

		setPhase('exit')
	}

	const onExitComplete = () => {
		isTransitioningRef.current = false
		setPhase('idle')
		setNextRoute(null)
	}

	return (
		<TransitionContext.Provider
			value={{
				startTransition,
				phase,
				transitionKey,
				onEnterComplete,
				onExitComplete
			}}
		>
			{children}
		</TransitionContext.Provider>
	)
}

const usePageTransition = () => {
	const ctx = useContext(TransitionContext)
	if (!ctx) throw new Error('Wrap app with TransitionProvider')
	return ctx
}

export { usePageTransition, TransitionProvider }
