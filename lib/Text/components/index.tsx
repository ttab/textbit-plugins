import { type TBElement, TextbitElement, type Plugin } from '@ttab/textbit'
import { getTextStyles } from '../textStyles'
import { Node } from 'slate'

// FIXME: excessively deep type instantiation
// @ts-ignore
export const Text = ({ children, element, options, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const style = getTextStyles({}).find(t => t.role === element?.properties?.role)
  const editable = (TextbitElement.isElement(rootNode) && rootNode?.properties?.editable === false) ? false : undefined
  const countCharacters = Array.isArray(options?.countCharacters) ? options.countCharacters as string[] : []

  if (style && !style.role) {
    // Regular body text
    if (options?.inputStyle) {
      return (
        <div draggable={false} contentEditable={editable} className="font-sans dark:tracking-wide">
          {children}
          <CharacterCount element={element} type='body' countTypes={countCharacters} />
        </div>
      )
    }

    return <div draggable={false} contentEditable={editable} className="py-2 font-serif dark:tracking-wide">
      {children}
      <CharacterCount element={element} type='body' countTypes={countCharacters} />
    </div>
  }

  switch (style?.role) {
    case 'heading-1':
      return (
        <div draggable={false} contentEditable={editable} className="font-sans font-bold text-4xl pt-2 pb-4">
          {children}
          <CharacterCount element={element} type='heading-1' countTypes={countCharacters} />
        </div>
      )

    case 'heading-2':
      return <div draggable={false} contentEditable={editable} className="font-sans font-bold text-xl py-2">
        {children}
        <CharacterCount element={element} type='heading-2' countTypes={countCharacters} />
      </div>

    case 'preamble':
      return <div draggable={false} contentEditable={editable} className="font-serif font-semibold py-2 dark:tracking-wide">
        {children}
        <CharacterCount element={element} type='preamble' countTypes={countCharacters} />
      </div>

    case 'vignette':
      return <div draggable={false} contentEditable={editable} className="font-sans font-bold py-1 text-sm uppercase">
        <span className="px-[0.4rem] py-[0.2rem] inline-block bg-slate-300 dark:text-slate-900">{children}</span>
        <CharacterCount element={element} type='vignette' className='normal-case' countTypes={countCharacters} />
      </div>

    default:
      return <div draggable={false} contentEditable={editable} className="font-serif opacity-80 italic line-through px-1 bg-red-200 dark:text-gray-700">
        {children}
        <CharacterCount element={element} type='default' countTypes={countCharacters} />
      </div>
  }
}

export const CharacterCount = ({ element, className, type, countTypes }: {
  element: TBElement
  type: string
  countTypes: string[]
  className?: string
}) => {
  const textLength = Node.string(element).length
  if (countTypes.every(itm => typeof itm === 'string')
    && countTypes?.includes(type)
    && textLength > 0) {
    return (
      <div
        contentEditable={false}
        className={['select-none text-xs text-gray-500 w-fit font-normal font-sans', className].join(' ')}
      >{`Antal tecken: ${textLength}`}
      </div>
  )
  }
  return <></>
}
