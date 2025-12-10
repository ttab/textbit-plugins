import type { TBComponentProps } from '@ttab/textbit'
import { useEffect, useState } from 'react'
import { Element } from 'slate'

export const OembedVideo = ({ children, rootNode }: TBComponentProps) => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src = properties?.src || ''
  const html = properties?.html || ''
  const h = properties?.height as number ?? 1
  const w = properties?.width as number ?? 1
  const [heightRatio, setHeightRatio] = useState(0)

  useEffect(() => {
    setHeightRatio(Math.ceil((h / w) * 100))
  }, [h, w])

  return (
    <div contentEditable={false}>
      <div className="transtion-all ease-out duration-150" style={{ position: 'relative' }}>
        {!src && html &&
          <div dangerouslySetInnerHTML={{ __html: html as string }} />
        }

        {src &&
          <div className="relative" style={{
            padding: `${heightRatio || 50}% 0 0 0`
          }}>
            <iframe
              src={`${src}?title=0&byline=0&portrait=0`}
              className="absolute top-0 left-0 w-full h-full border-none"
            />
          </div>
        }

        {!src && !html &&
          <div
            className="center my-0 mx-auto relative"
          // style={{ textAlign: 'center', margin: '0 auto', position: 'relative', backgroundColor: '#eee' }}
          >
            <div
              className="rounded absolute top-[10px] left-[10px] bg-black opacity.50 px-1 py-2"
            // style={{ position: 'absolute', top: '10px', left: '10px', background: '#000', opacity: '0.5', padding: '2px 8px' }}
            >
              <a
                href={properties?.original_url as string}
                // style={{ color: '#eee' }}
                className="no-underline text-blue-200"
                target="_blank"
                rel="noreferrer"
              >
                {properties?.provider_name}
                <span className="text-xs pl-[6px]">Open...</span>
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
