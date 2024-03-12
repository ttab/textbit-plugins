import { Element, type Plugin } from '@ttab/textbit'

export const Figure = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <Element className="py-2 group">
      <figure className="flex gap-1 flex-col min-h-10 group-data-[state='active']:ring-1 ring-offset-4 rounded rounded-sm" draggable={false}>
        {children}
      </figure>
    </Element>
  )
}
