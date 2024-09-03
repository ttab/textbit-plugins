import { Element, TextbitElement, type Plugin } from '@ttab/textbit'

export const List = ({ element, children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const editable = (TextbitElement.isElement(rootNode) && rootNode?.properties?.editable === false) ? false : undefined

  return (
    <Element draggable={false} contentEditable={editable} className="py-2 font-serif">
      {element.type === 'core/ordered-list'
        ? <ol role="list" className="pl-10 m-0 list-decimal">{children}</ol>
        : <ul role="list" className="pl-10 m-0 list-disc">{children}</ul>
      }
    </Element>
  )
}
