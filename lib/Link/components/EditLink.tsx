import { useState, useRef } from 'react'
import { Editor, Element, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { Plugin, TextbitElement, isValidLink } from '@ttab/textbit'
import { Link2OffIcon } from 'lucide-react'

export const EditLink: Plugin.ToolComponent = ({ editor, entry }) => {
  const [node, path] = entry || []

  const [url, seturl] = useState<string>(TextbitElement.isElement(node) && typeof node?.properties?.url === 'string' ? node.properties.url : '')
  const inputRef = useRef<HTMLInputElement>(null)

  if (!TextbitElement.isElement(node)) {
    return <></>
  }


  return <>
    <span
      className="textbit-tool"
      onMouseDown={(e) => {
        e.preventDefault()
        deleteLink(editor)
      }}
    >
      <Link2OffIcon />
    </span>

    <span className="textbit-tool core/link-input">
      <input
        id={node.id}
        ref={inputRef}
        type="text"
        value={url}
        onClick={(e) => { e.currentTarget.focus() }}
        onChange={(e) => {
          seturl(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            e.preventDefault()

            if (url === '') {
              deleteLink(editor)
            }
            ReactEditor.focus(editor)
          }
        }}
        onBlur={() => {
          if (!isValidLink(url || '')) {
            deleteLink(editor)
            return
          }

          Transforms.setNodes(
            editor,
            {
              properties: {
                ...node.properties,
                url: url
              }
            },
            { at: path }
          )
        }}
      />
    </span>

    {/* <span
            className='editor-tool r-less bg-base-hover'
        // FIXME: Handle edit more properties...
        //
        // onMouseDown={(e) => {
        //     e.preventDefault()
        //     action.handler(editor, 2)
        // }}
        ><MdEdit /></span> */}
  </>
}


const deleteLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'core/link',
  })
}
