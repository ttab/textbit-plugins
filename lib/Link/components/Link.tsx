import { useState } from 'react'
import type { TBComponentProps } from '@ttab/textbit'
import { isValidLink } from '../../shared/isValidLink'

export const Link = ({ children, element }: TBComponentProps) => {
  const url: string = element.properties?.url as string || ''
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <a
      className={`underline decoration-2 underline-offset-4 ${isValidLink(url) ? 'decoration-blue-300' : 'decoration-wavy decoration-red-400'}`}
      href={url}
      onClick={(event) => {
        event.preventDefault()
        const message = `Open link in a new tab?\n${url}\nContinue only if you trust the source.`

        if (window.confirm(message)) {
          window.open(url, '_blank', 'noopener,noreferrer')
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
