import { useState, useRef, useEffect } from 'react'
import { Editor, Element, Transforms } from 'slate'
import {
  type Plugin,
  TextbitElement
} from '@ttab/textbit'
import { Link2OffIcon, LinkIcon, UnlinkIcon } from 'lucide-react'
import { isValidLink } from '../../shared/isValidLink'

// FIXME: excessively deep type instantiation
// @ts-ignore
export const EditLink = ({ editor, entry }: Plugin.ToolComponentProps): JSX.Element => {
  const [node, path] = entry || []

  const [url, seturl] = useState<string>(TextbitElement.isElement(node) && typeof node?.properties?.url === 'string' ? node.properties.url : '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isValidLink(url, true)) {
      inputRef.current?.focus()
    }
  }, [])

  if (!TextbitElement.isElement(node)) {
    return <></>
  }

  return <div className="flex -ml-1 select-none content-center gap-x-1">
    <div
      className="p-2 w-8 h-8 select-none flex place-items-center rounded border border-white hover:bg-gray-100 hover:border-gray-200 pointer data-[state='active']:bg-gray-100 data-[state='active']:border-gray-200 dark:border-gray-900 dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:data-[state='active']:bg-gray-800 dark:data-[state='active']:border-slate-800 dark:hover:data-[state='active']:border-slate-700"
      onMouseDown={(e) => {
        e.preventDefault()
        deleteLink(editor)
      }}
    >
      <Link2OffIcon />
    </div>

    <input
      className="pl-2 pr-8 text-sm border justify-center select-none rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
      id={node.id}
      ref={inputRef}
      type="text"
      value={url}
      onMouseDownCapture={(e) => {
        e.stopPropagation()
        e.preventDefault()
        e.currentTarget.focus()
      }}
      // onClick={(e) => { e.currentTarget.focus() }}
      onChange={(e) => {
        seturl(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          e.preventDefault()

          if (url === '') {
            deleteLink(editor)
          }
        }
      }}
      onBlur={() => {
        if (url === '') {
          deleteLink(editor)
        } else {
          Transforms.setNodes(
            editor,
            { properties: { ...node.properties, url } },
            { at: path }
          )
        }
      }}
    />

    <div
      className="p-2 w-8 h-8 -ml-9 select-none flex place-items-center"
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {isValidLink(url, true)
        ? <LinkIcon className="text-green-600" />
        : <UnlinkIcon className="text-red-600" />
      }
    </div>
  </div >
}


const deleteLink = (editor: Editor): void => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'core/link'
  })
}
