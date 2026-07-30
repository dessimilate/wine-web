import { LenisOptions } from 'lenis'

const LENIS_CONFIG: LenisOptions = {
	duration: 0.8,
	easing: (t: number) => 1 - Math.pow(1 - t, 3),
	smoothWheel: true,
	anchors: true
}

export { LENIS_CONFIG }
