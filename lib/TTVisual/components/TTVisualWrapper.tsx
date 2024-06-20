import React from 'react'
import { Element, type Plugin } from '@ttab/textbit'

interface Child {
  props: { children: { props: { element: { type: string } } } }
}

export const TTVisualWrapper = ({ children }: Plugin.ComponentProps): JSX.Element => {
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
    <Element className="py-2 group">
      <figure
        draggable={false}
        className="flex gap-1 flex-col min-h-10 group-data-[state='active']:ring-1 ring-offset-4"
      >
        {imageNode}
        <div className="flex flex-col gap-1">
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
        </div>
      </figure>
    </Element>
  )
}
