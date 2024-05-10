import { Element, type Plugin } from '@ttab/textbit'
import { getTextStyles } from '../textStyles'

export const Text = (props: Plugin.ComponentProps): JSX.Element => {
  const { children, element } = props
  const style = getTextStyles({}).find(t => t.type === element?.properties?.type)

  if (style && !style.type) {
    // Regular body text
    return <Element className="py-2 font-serif dark:tracking-wide">{children}</Element>
  }

  switch (style?.type) {
    case 'h1':
      return <Element className="font-sans font-bold text-4xl pt-2 pb-4">{children}</Element>

    case 'h2':
      return <Element className="font-sans font-bold text-xl py-2">{children}</Element>

    case 'preamble':
      return <Element className="font-serif font-semibold py-2 dark:tracking-wide">{children}</Element>

    case 'dateline':
      return <Element className="font-sans font-bold py-1 text-sm uppercase">
        <span className="px-[0.4rem] py-[0.2rem] inline-block bg-slate-300 dark:text-slate-900">{children}</span>
      </Element>

    default:
      return <Element className="font-serif opacity-80 italic line-through px-1 bg-red-200 dark:text-gray-700">{children}</Element>
  }
}
