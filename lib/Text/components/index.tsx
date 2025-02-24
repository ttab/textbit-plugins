import { type TBElement, TextbitElement, type Plugin } from '@ttab/textbit'
import { getTextStyles } from '../textStyles'
import { Node } from 'slate'
import {cn} from '../../cn'

type ClassNameOverridesType = Record<string, string>

// FIXME: excessively deep type instantiation
// @ts-ignore
export const Text = ({ children, element, options, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const style = getTextStyles({}).find(t => t.role === element?.properties?.role)
  const editable = (TextbitElement.isElement(rootNode) && rootNode?.properties?.editable === false) ? false : undefined
  const countCharacters = Array.isArray(options?.countCharacters) ? options.countCharacters as string[] : []
  const classNames = isClassNameOverridesOption(options?.classNames) ? options.classNames : {}
  const className = classNames[style?.role || 'body'] || undefined

  if (style && !style.role) {
    return <div draggable={false} contentEditable={editable} className={cn('py-2 font-serif dark:tracking-wide', className)}>
      {children}
      <CharacterCount element={element} type='body' countTypes={countCharacters} />
    </div>
  }

  switch (style?.role) {
    case 'heading-1':
      return (
        <div draggable={false} contentEditable={editable} className={cn('font-sans font-bold text-4xl pt-2 pb-4', className)}>
          {children}
          <CharacterCount element={element} type='heading-1' countTypes={countCharacters} />
        </div>
      )

    case 'heading-2':
      return <div draggable={false} contentEditable={editable} className={cn('font-sans font-bold text-xl py-2', className)}>
        {children}
        <CharacterCount element={element} type='heading-2' countTypes={countCharacters} />
      </div>

    case 'preamble':
      return <div draggable={false} contentEditable={editable} className={cn('font-serif font-semibold py-2 dark:tracking-wide', className)}>
        {children}
        <CharacterCount element={element} type='preamble' countTypes={countCharacters} />
      </div>

    case 'vignette':
      return <div draggable={false} contentEditable={editable}>
        <span
          className={cn('my-1 px-[0.4rem] py-[0.2rem] font-sans font-bold text-sm uppercase inline-block bg-slate-300 dark:text-slate-900', className)}
        >
          {children}
        </span>
        <CharacterCount element={element} type='vignette' className='normal-case' countTypes={countCharacters} />
      </div>

    default:
      const errorClassName = classNames['error'] || undefined
      return <div draggable={false} contentEditable={editable} className={cn('font-serif opacity-80 italic line-through px-1 bg-red-200 dark:text-gray-700', errorClassName)}>
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

function isClassNameOverridesOption(value: unknown): value is ClassNameOverridesType {
  if (!value || typeof value !== 'object') {
    return false
  }
  
  return !!Object.values(value).filter(v => typeof v === 'string').length
}