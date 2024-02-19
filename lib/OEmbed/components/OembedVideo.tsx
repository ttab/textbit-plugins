import { type Plugin } from '@ttab/textbit'
import { useEffect, useState } from 'react'
import { Element } from 'slate'

export const OembedVideo = ({ children, attributes, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src = properties?.src || ''
  const html = properties?.html || ''
  const h = properties?.height as number ?? 1
  const w = properties?.width as number ?? 1

  const [classes, setClasses] = useState('appear-transitions appear-dimmed')
  const [heightRatio, setHeightRatio] = useState(0)

  useEffect(() => {
    setClasses('appear-transitions')
    setHeightRatio(Math.ceil((h / w) * 100))
  }, [])

  return (
    <div contentEditable={false} {...attributes}>
      <div className={classes} style={{ position: 'relative' }}>
        {!src && html &&
          <div dangerouslySetInnerHTML={{ __html: html as string }} />
        }

        {src &&
          <div style={{
            padding: `${heightRatio || 50}% 0 0 0`,
            position: 'relative'
          }}>
            <iframe
              src={`${src}?title=0&byline=0&portrait=0`}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: 0
              }}
            />
          </div>
        }

        {!src && !html &&
          <div style={{ textAlign: 'center', margin: '0 auto', position: 'relative', backgroundColor: '#eee' }}>
            <div className="rounded" style={{ position: 'absolute', top: '10px', left: '10px', background: '#000', opacity: '0.5', padding: '2px 8px' }}>
              <a
                href={properties?.original_url as string}
                style={{ color: '#eee' }}
                className="no-underline"
                target="_blank"
                rel="noreferrer"
              >
                {properties?.provider_name}
                <span className="material-icons-round text-xs" style={{ paddingLeft: '6px' }}>open_in_new</span>
              </a>
            </div>
            <img src={properties?.thumbnail_url as string} style={{ maxHeight: '400px' }} />
          </div>
        }
      </div>
      {children}
    </div>
  )
}
