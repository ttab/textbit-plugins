import { type Plugin } from '@ttab/textbit'
import { getTextStyles } from '../textStyles'
import { cn } from '../../cn'
import { isClassNameOverridesOption } from '../../Text/components'
import type { PropsWithChildren } from 'react'

export const PrintText = ({ children, element, options }: Plugin.ComponentProps & PropsWithChildren): JSX.Element => {
  const style = getTextStyles({}).find(t => t.role === element?.properties?.role)

  const classNames = isClassNameOverridesOption(options?.classNames) ? options.classNames : {}
  const className = classNames[style?.role || 'body'] || undefined

  return (
    <>
      <div draggable={false} className={cn('border rounded p-1 py-2 font-serif', className)}>
        {children}
      </div>
    </>
  )
}
