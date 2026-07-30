'use client'

import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn'

import { FlechaBronzeaM } from '@/styles/fonts'

import Arrow from '&/public/svg/arrow.svg'

const milestonesCount = 6
const milestones = [...new Array(milestonesCount)]

const widthChangeDuration = 0.6

const firstActiveElement = 0

const Section3 = () => {
	const widthCalcRef = useRef<HTMLDivElement>(null)

	const textControls = milestones.map(_ => useAnimation())

	const t = useTranslations('Manifesto.section3')

	const [activeIndex, setActiveIndex] = useState(firstActiveElement)
	const [descriptionWidth, setDescriptionWidth] = useState<number>()

	const onMilestoneClick = async (index: number) => {
		if (index === activeIndex) return

		await textControls[activeIndex].start({
			opacity: 0,
			translateY: '50%',
			transition: { duration: 0.5, ease: 'easeOut' }
		})

		setActiveIndex(index)

		textControls[index].set({
			opacity: 1,
			translateY: '0%'
		})
	}

	useEffect(() => {
		if (!widthCalcRef.current) return

		const { width } = widthCalcRef.current.getBoundingClientRect()

		setDescriptionWidth(width)
	}, [])

	return (
		<section className='bg-alt-main pt-[20svh] pb-[10svh]'>
			<div className='w-full px-[6svh]'>
				<h2
					className={cn(
						'text-center text-[12svw] leading-none uppercase',
						FlechaBronzeaM.className
					)}
				>
					{t('title1')}
				</h2>

				<div className='mt-[7svh] flex'>
					{milestones.map((_, i) => (
						<motion.article
							animate={{ flexGrow: activeIndex === i ? 1 : 0 }}
							key={'section3-milestone-' + i}
							onClick={_ => onMilestoneClick(i)}
							className='border-second group flex border-r px-[1svw] py-[2svh] first:border-l'
						>
							<div
								className={cn(
									'flex h-[50svh] max-h-150 flex-col items-center justify-between transition-transform duration-500',
									activeIndex !== i && 'group-hover:-translate-x-2'
								)}
							>
								<div
									className={cn(
										'rotate-90 text-[8svw] leading-none',
										FlechaBronzeaM.className
									)}
								>
									{t(`milestones.${i}.date`)}
								</div>

								<Arrow
									className={cn(
										'w-8 transition-transform duration-500',
										activeIndex === i && 'rotate-180'
									)}
								/>
							</div>

							<motion.div
								ref={firstActiveElement === i ? widthCalcRef : null}
								initial={false}
								animate={{ width: activeIndex === i ? 'auto' : 0 }}
								className='flex h-full grow items-center overflow-hidden'
								transition={{ duration: widthChangeDuration, ease: 'easeOut' }}
							>
								<motion.div
									className='shrink-0 pl-4'
									style={{ width: descriptionWidth || '100%' }}
									animate={textControls[i]}
								>
									{t(`milestones.${i}.description`)}
								</motion.div>
							</motion.div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	)
}

export { Section3 }
