import { useState, useEffect } from 'react'
import { Plugin, isValidLink } from '@ttab/textbit'

export const Link: Plugin.Component = ({ attributes, children, element }) => {
  const url: string = element.properties?.url as string || ''
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (isPressed !== (event.metaKey || event.ctrlKey)) {
        setIsPressed(true)
      }
    }
    window.document.addEventListener('keydown', keyDownListener)

    const keyUpListener = (event: KeyboardEvent) => {
      if (isPressed !== (event.metaKey || event.ctrlKey)) {
        setIsPressed(false)
      }
    }
    window.document.addEventListener('keyup', keyUpListener)

    return () => {
      window.document.removeEventListener('keydown', keyDownListener)
      window.document.removeEventListener('keyup', keyUpListener)
    }
  })

  return (
    <a
      {...attributes}
      href={url}
      onClick={(event) => {
        if (event.ctrlKey === true || event.metaKey === true) {
          window.open(url, '_blank')
        }
      }}
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
      title={`${element.properties?.title || ''}`}
      style={{
        textDecorationStyle: isValidLink(url) ? 'solid' : 'wavy',
        cursor: isHovering && isPressed ? 'pointer' : 'auto'
      }}
    >
      {children}
    </a>
  )
}
