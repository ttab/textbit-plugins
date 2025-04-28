import { TextbitElement, type Plugin } from '@ttab/textbit'

export const FactboxBody = ({ children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const editable = (TextbitElement.isElement(rootNode) && rootNode?.properties?.editable === false) ? false : undefined

  return <div
    draggable={false}
    contentEditable={editable === false ? false : undefined}
    className="pt-2 font-sans text-slate-700 dark:text-slate-300"
  >
    {children}
  </div>
}
