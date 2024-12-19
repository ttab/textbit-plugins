import { type Plugin } from '@ttab/textbit'

export const Figure = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <figure className="flex gap-1 flex-col my-2 min-h-10 group-data-[state='active']:ring-1 ring-offset-4 rounded rounded-sm" draggable={false}>
      {children}
    </figure>
  )
}
