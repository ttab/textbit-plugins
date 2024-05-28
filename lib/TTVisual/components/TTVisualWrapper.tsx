import { Element, type Plugin } from '@ttab/textbit'

export const TTVisualWrapper = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <Element className="py-2 group">
      <figure
        draggable={false}
        className="flex gap-1 flex-col min-h-10 group-data-[state='active']:ring-1 ring-offset-4"
        >
        {children}
      </figure>
    </Element>
  )
}
