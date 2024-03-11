import { Element, type Plugin } from '@ttab/textbit'

export const List = ({ element, children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <Element className="py-2 font-serif">
      {element.type === 'core/number-list'
        ? <ol role="list" className="pl-12 m-0 list-decimal">{children}</ol>
        : <ul role="list" className="pl-12 m-0 list-disc">{children}</ul>
      }
    </Element>
  )
}
