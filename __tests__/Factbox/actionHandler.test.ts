import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createEditor, Transforms } from 'slate'
import type * as Slate from 'slate'
import { TextbitEditor } from '@ttab/textbit'
import { actionHandler } from '../../lib/Factbox/lib/actionHandler'

vi.mock('@ttab/textbit', () => ({
  TextbitEditor: {
    getSelectedText: vi.fn(() => ''),
    position: vi.fn(() => 0),
    insertAt: vi.fn()
  }
}))

vi.mock('slate', async (importOriginal) => {
  const actual = await importOriginal<typeof Slate>()

  return { ...actual, Transforms: { ...actual.Transforms, select: vi.fn() } }
})

describe('Factbox actionHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    { name: 'uses the given title as-is', options: { factboxNewTitle: 'Fakta:' }, title: 'Fakta:' },
    { name: 'starts with an empty headline without a title', options: {}, title: '' }
  ])('$name', ({ options, title }) => {
    actionHandler({ editor: createEditor(), type: 'core/factbox', options })

    expect(TextbitEditor.insertAt).toHaveBeenCalledWith(expect.anything(), 1, [
      expect.objectContaining({
        children: [
          expect.objectContaining({ children: [{ text: title }] }),
          expect.anything()
        ]
      })
    ])

    // Cursor lands at the end of the title
    const point = { offset: title.length, path: [1, 0, 0] }
    expect(Transforms.select).toHaveBeenCalledWith(expect.anything(), {
      anchor: point,
      focus: point
    })
  })
})
