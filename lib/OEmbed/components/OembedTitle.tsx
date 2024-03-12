import { type Plugin } from '@ttab/textbit'

export const OembedTitle = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div
    draggable={false}
    className="p-2 flex rounded rounded-xs text-sm bg-slate-200 dark:bg-slate-800"
  >
    <label contentEditable={false} className="grow-0 w-16 opacity-60">Alt:</label>
    <figcaption className="grow active:bg-slate-100">{children}</figcaption>
  </div >
}
