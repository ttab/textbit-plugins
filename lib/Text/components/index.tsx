import { Element, type Plugin } from '@ttab/textbit'
import { getTextStyles } from '../textStyles'

export const Text = ({ children, element, options }: Plugin.ComponentProps): JSX.Element => {
  const style = getTextStyles({}).find(t => t.role === element?.properties?.role)

  if (style && !style.role) {
    // Regular body text
    if (options?.inputStyle) {
      return <Element draggable={false} className="font-sans dark:tracking-wide">{children}</Element>
    }

    return <Element draggable={false} className="py-2 font-serif dark:tracking-wide">{children}</Element>
  }

  switch (style?.role) {
    case 'heading-1':
      return <Element draggable={false} className="font-sans font-bold text-4xl pt-2 pb-4">{children}</Element>

    case 'heading-2':
      return <Element draggable={false} className="font-sans font-bold text-xl py-2">{children}</Element>

    case 'preamble':
      return <Element draggable={false} className="font-serif font-semibold py-2 dark:tracking-wide">{children}</Element>

    case 'vignette':
      return <Element draggable={false} className="font-sans font-bold py-1 text-sm uppercase">
        <span className="px-[0.4rem] py-[0.2rem] inline-block bg-slate-300 dark:text-slate-900">{children}</span>
      </Element>

    default:
      return <Element draggable={false} className="font-serif opacity-80 italic line-through px-1 bg-red-200 dark:text-gray-700">{children}</Element>
  }
}
