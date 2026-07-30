import { useTranslations } from 'next-intl'
import { ImageProps } from 'next/image'

import { cn } from '@/utils/cn'

import { ScrollImage } from './ScrollImage'
import { SpanItalic } from './SpanItalic'

type TFunction = ReturnType<typeof useTranslations>

interface ImagesWithTextProps {
	image1Props: ImageProps
	image2Props: ImageProps
	scroll: number
	t: TFunction
	isFirstImageRight?: boolean
}

interface TextComponentProps {
	types: string
	spanProp: string
	classNameWrapper?: string
	srcKey: string
}

const ImagesWithText = ({
	scroll,
	t,
	image1Props,
	image2Props,
	isFirstImageRight = false
}: ImagesWithTextProps) => {
	const TextComponent = ({
		classNameWrapper,
		spanProp,
		srcKey,
		types
	}: TextComponentProps) => {
		return (
			<p className={cn(classNameWrapper, 'text-[2svw]')}>
				{t(types)
					.split(',')
					.map((type, i) => (
						<SpanItalic
							key={srcKey + i}
							isItalic={type === 'i'}
						>
							{t(`${spanProp}.${i}`)}
						</SpanItalic>
					))}
			</p>
		)
	}

	return (
		<div className='px-[6svw]'>
			<div className='grid grid-cols-2'>
				{isFirstImageRight && (
					<TextComponent
						classNameWrapper='pr-[5svw]'
						spanProp='description1'
						srcKey={image1Props.src.toString()}
						types='description1types'
					/>
				)}

				<ScrollImage
					sizeWrapper
					appearanceAnimation
					scrollImpact={0.06}
					scroll={scroll}
					imageProps={image1Props}
				/>

				{!isFirstImageRight && (
					<TextComponent
						classNameWrapper='pl-[5svw]'
						spanProp='description1'
						srcKey={image1Props.src.toString()}
						types='description1types'
					/>
				)}
			</div>
			<div className='mt-[-15%] grid grid-cols-2'>
				{!isFirstImageRight && (
					<TextComponent
						classNameWrapper='mt-auto'
						spanProp='description2'
						srcKey={image2Props.src.toString()}
						types='description2types'
					/>
				)}

				<div className={cn('w-7/10', !isFirstImageRight && 'ml-auto')}>
					<ScrollImage
						sizeWrapper
						appearanceAnimation
						scrollImpact={0.06}
						scroll={scroll}
						imageProps={image2Props}
					/>
				</div>

				{isFirstImageRight && (
					<TextComponent
						classNameWrapper='mt-auto'
						spanProp='description2'
						srcKey={image2Props.src.toString()}
						types='description2types'
					/>
				)}
			</div>
		</div>
	)
}

export { ImagesWithText }
