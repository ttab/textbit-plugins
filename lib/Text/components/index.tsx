import type { TBComponentProps, TBElement } from '@ttab/textbit'
import type { Element } from 'slate'
import { getTextStyles } from '../textStyles'
import { Node } from 'slate'
import { cn } from '../../cn'

type ClassNameOverridesType = Record<string, string>

export const Text = ({ children, element, options }: TBComponentProps) => {
  const style = getTextStyles({}).find(t => t.role === element?.properties?.role)
  const countCharacters = Array.isArray(options?.countCharacters) ? options.countCharacters as string[] : []
  const classNames = isClassNameOverridesOption(options?.classNames) ? options.classNames : {}
  const className = classNames[style?.role || 'body'] || undefined
  const textContent = (element.children as TBElement & { text: string }[])[0]?.text as string | undefined

  if (style && !style.role) {
    return <div className={cn('py-2 font-serif dark:tracking-wide', className)}>
      {children}
      <CharacterCount element={element} type='body' countTypes={countCharacters} />
    </div>
  }

  switch (style?.role) {
    case 'heading-1':
      return (
        <div className={cn('font-sans font-bold text-4xl pt-2 pb-4', className)}>
          {children}
          <CharacterCount element={element} type='heading-1' countTypes={countCharacters} />
        </div>
      )

    case 'heading-2':
      return <div className={cn('font-sans font-bold text-xl py-2', className)}>
        {children}
        <CharacterCount element={element} type='heading-2' countTypes={countCharacters} />
      </div>

    case 'preamble':
      return <div className={cn('font-serif font-semibold py-2 dark:tracking-wide', className)}>
        {children}
        <CharacterCount element={element} type='preamble' countTypes={countCharacters} />
      </div>

    case 'vignette':
      return <div>
        <span
          className={cn(textContent && textContent.length > 0 ? 'bg-slate-300 dark:text-slate-900 inline-block px-[0.4rem]' : 'block dark:text-slate-400 px-0', 'my-1 py-[0.2rem] font-sans font-bold text-sm', className)}
        >
          {children}
        </span>
        <CharacterCount element={element} type='vignette' className='normal-case' countTypes={countCharacters} />
      </div>

    default:
      return <div className={cn('font-serif opacity-80 italic line-through px-1 bg-red-200 dark:text-gray-700', classNames['error'] || undefined)}>
        {children}
        <CharacterCount element={element} type='default' countTypes={countCharacters} />
      </div>
  }
}

export const CharacterCount = ({ element, className, type, countTypes }: {
  element: Element
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
