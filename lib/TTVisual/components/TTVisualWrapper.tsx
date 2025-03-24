import React from 'react'
import type { Plugin } from '@ttab/textbit'
import { X } from 'lucide-react'
import { cn } from '../../cn'
import { type Descendant, Transforms } from 'slate'

interface Child {
  props: { children: { props: { element: { type: string } } } }
}

export const TTVisualWrapper = ({ children, element, editor }: Plugin.ComponentProps): JSX.Element => {
  const getType = (child: Child): string => {
    if (child?.props?.children?.props?.element?.type) {
      return child.props.children.props.element.type
    }
    return ''
  }

  const textNode: React.ReactNode[] = []
  const bylineNode: React.ReactNode[] = []
  const imageNode: React.ReactNode[] = []

  children.forEach((child: React.ReactElement) => {
    const type: string = getType(child)
    if (type.includes('text')) {
      textNode.push(child)
    } else if (type.includes('byline')) {
      bylineNode.push(child)
    } else {
      imageNode.push(child)
    }
  })

  return (
    <figure
      draggable={false}
      className='relative group flex gap-1 flex-col my-2 min-h-10 group-data-[state="active"]:ring-1 rounded-sm ring-offset-4'
    >
      <div contentEditable={false} className='absolute hidden -right-1 top-2 size-8  text-slate-900 justify-between items-center group-hover:flex'>
        <div
          className={cn('p-1 rounded opacity-70 bg-slate-200 hover:opacity-100 hover:bg-slate-300')}
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const n = editor.children.findIndex((child: Descendant) => child.id === element.id)

            if (n > -1) {
              Transforms.removeNodes(editor, { at: [n] })
            }
          }}

        >
          <X size={15} />
        </div>
      </div>

      {imageNode}

      {textNode.map((child, index) => (
        <div key={index}>
          {child}
        </div>
      ))}
      {bylineNode.map((child, index) => (
        <div key={index}>
          {child}
        </div>
      ))}
    </figure>
  )
}
