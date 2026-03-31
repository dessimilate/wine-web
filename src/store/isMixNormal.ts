import { create } from 'zustand'

type Store = {
	isMixNormal: boolean
	setIsMixNormal: (value: boolean) => void
	getIsMixNormal: () => boolean
}

export const useIsMixNormalStore = create<Store>((set, get) => ({
	isMixNormal: false,
	setIsMixNormal: value => set({ isMixNormal: value }),
	getIsMixNormal: () => get().isMixNormal
}))
