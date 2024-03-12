import { Element, type Plugin } from '@ttab/textbit'

export const OembedWrapper = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <Element className="py-2 group">
    <div
      draggable={false}
      className="flex gap-1 flex-col min-h-10 group-data-[state='active']:ring-1 ring-offset-4 rounded rounded-sm"
    >
      {children}
    </div>
  </Element>
}
