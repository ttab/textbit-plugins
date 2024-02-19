import { type ChangeEvent } from 'react'
import { type Editor } from 'slate'
import { handleFileInputChangeEvent } from '@ttab/textbit'

export const actionHandler = ({ editor }: { editor: Editor }): boolean => {
  let fileSelector: HTMLInputElement | undefined = document.createElement('input')

  fileSelector.accept = 'image/jpg, image/gif, image/png'
  fileSelector.setAttribute('type', 'file')
  fileSelector.setAttribute('multiple', 'multiple')

  fileSelector.addEventListener('change', (e: unknown) => {
    const event: ChangeEvent<HTMLInputElement> = e as ChangeEvent<HTMLInputElement>

    if (event.target.files?.length) {
      handleFileInputChangeEvent(editor, event)
    }

    setTimeout(() => {
      fileSelector = undefined
    }, 0)
  })

  fileSelector.click()

  return true
}
