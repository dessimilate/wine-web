import { create } from 'zustand'

type WindowStore = {
	width: number
	height: number
	setSize: (width: number, height: number) => void
}

export const useWindowSizeStore = create<WindowStore>(set => ({
	width: 0,
	height: 0,
	setSize: (width, height) => set({ width, height })
}))
