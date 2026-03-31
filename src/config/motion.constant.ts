import { MotionProps } from 'framer-motion'

export const defaultMotionProps: MotionProps = {
	initial: { opacity: 0, y: '100%' },
	whileInView: { opacity: 1, y: '0%' },
	viewport: { once: true, amount: 0.4, margin: '-20%' },
	transition: { duration: 0.8 }
}
