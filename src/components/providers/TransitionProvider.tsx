'use client'

import {
	PropsWithChildren,
	ReactNode,
	createContext,
	useContext,
	useState
} from 'react'

import { NextComponentType } from '@/types/next-component.type'

import { waitForPageReady } from '@/utils/funcs/wait-for-page-ready'

import { useRouter } from '@/i18n/routing'

type TransitionContextType = {
	startTransition: (href: string) => void
	phase: 'idle' | 'enter' | 'exit'
	onEnterComplete: () => void
	onExitComplete: () => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

const TransitionProvider: NextComponentType<PropsWithChildren> = ({
	children
}) => {
	const router = useRouter()

	const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle')

	const [nextRoute, setNextRoute] = useState<string | null>(null)

	const startTransition = (href: string) => {
		setNextRoute(href)
		setPhase('enter')
	}

	const onEnterComplete = async () => {
		if (!nextRoute) return
		router.push(nextRoute)

		await waitForPageReady()

		setPhase('exit')
	}

	const onExitComplete = () => {
		setPhase('idle')
		setNextRoute(null)
	}

	return (
		<TransitionContext.Provider
			value={{
				startTransition,
				phase,
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
