import { PropsWithChildren } from 'react'

interface ISpanItalicProps {
	isItalic?: boolean
}

export const SpanItalic = ({
	isItalic = false,
	children
}: PropsWithChildren<ISpanItalicProps>) => {
	return isItalic ? (
		<i>
			<span>{children}</span>
		</i>
	) : (
		<span>{children}</span>
	)
}
