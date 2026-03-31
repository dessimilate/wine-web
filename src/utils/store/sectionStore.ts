import { create } from 'zustand'

type SectionRefs = Record<string, HTMLElement | null>

type SectionStore = {
	refs: SectionRefs
	setRef: (id: string, el: HTMLElement | null) => void
}

export const useSectionStore = create<SectionStore>(set => ({
	refs: {},
	setRef: (id, el) =>
		set(state => {
			if (state.refs[id] === el || !el) return state
			return {
				refs: {
					...state.refs,
					[id]: el
				}
			}
		})
}))
