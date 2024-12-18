import { TextbitElement, type Plugin } from '@ttab/textbit'

export const List = ({ element, children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const editable = (TextbitElement.isElement(rootNode) && rootNode?.properties?.editable === false) ? false : undefined

  return (
    <>
      {element.type === 'core/ordered-list'
        ? <ol role="list" contentEditable={editable} className="pl-10 m-0 py-2 font-serif list-decimal">{children}</ol>
        : <ul role="list" contentEditable={editable} className="pl-10 m-0 py-2 font-serif list-disc">{children}</ul>
      }
    </>
  )
}
