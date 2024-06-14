import { type Plugin } from '@ttab/textbit'
import * as uuid from 'uuid'
import { type TTVisualInterface } from '../types'

/**
 * Consume a FileList and produce an array of core/image objects
 */
export const consume: Plugin.ConsumeFunction = async ({ input }): Promise<TTVisualInterface> => {
  if (Array.isArray(input)) {
    throw new Error('Image plugin expected File for consumation, not a list/array')
  }

  if (!(input.data instanceof File)) {
    throw new Error('Image plugin expected File for consumation, wrong indata')
  }

  const { name, type, size } = input.data

  const readerPromise = new Promise<TTVisualInterface>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (typeof reader.result !== 'string') {
        reject(new Error(`Error when image dropped, resulted in ${typeof reader.result}`))
        return
      }

      const tmpImage = new window.Image()
      tmpImage.src = reader.result
      tmpImage.onload = () => {
        window.setTimeout(() => {
          resolve({
            id: uuid.v4(),
            class: 'block',
            type: 'core/image',
            properties: {
              type,
              src: tmpImage.src,
              title: name,
              size,
              width: tmpImage.width,
              height: tmpImage.height
            },
            children: [
              {
                type: 'core/image/image',
                class: 'text',
                children: [{ text: '' }]
              },
              {
                type: 'core/image/text',
                class: 'text',
                children: [{ text: '' }]
              }
            ]
          })
        }, 1000)
      }
    }, false)

    reader.readAsDataURL(input.data as Blob)
  })

  return await readerPromise
}
