import { type Plugin } from '@ttab/textbit'
import { Editor, Text, Transforms } from 'slate'

const LOCALIZED_QUOTES = {
  sv: [
    '’', '’',
    '”', '”'],
  fi: [
    '’', '’',
    '”', '”'],
  hu: [
    '’', '’',
    '„', '”'],
  pl: [
    '‚', '’',
    '„', '”'],
  no: [
    '‹', '›',
    '«', '»'],
  en: [
    '‘', '’',
    '“', '”'],
  da: [
    '„', '“',
    '„', '“'],
  de: [
    '‚', '‘',
    '„', '“'],
  fr: [
    '‹ ', ' ›',
    '« ', '»'
  ]
}

const KEY_CODES = [
  9, // tab
  32, // space
  60, // non breaking space
  33, // !
  40, // (
  41, // )
  43, // +
  44, // ,
  45, // -
  46, // .
  47, // /
  58, // :
  59, // ;
  60, // <
  61, // =
  62, // >
  63 // ?
]

export const consume: Plugin.ConsumeFunction = async ({ editor, input }) => {
  const { selection } = editor

  if (Array.isArray(input) || typeof input.data !== 'string') {
    return
  }

  if (!selection || selection.anchor.path.length < 2) {
    return
  }

  const { data } = input
  const basePos = selection.anchor.path[0] // Position of basenode in editor
  let firstOffset = selection.anchor.offset // Start text offset in first node
  let point // We will store the point of found quote, then traverse 2 more chars
  let prevChar: string = '' // We will keep track of the char that comes after the current char

  // From anchor inline node and backwards
  for (let pos = selection.anchor.path[1]; pos >= 0; pos--) {
    const [node, path] = Editor.node(editor, [basePos, pos])
    if (!Text.isText(node)) {
      continue
    }

    // From firstOffset in first text node then from end of each text node and backwards
    for (let offset = firstOffset || node.text.length - 1; offset >= 0; offset--) {
      if (point) {
        // If the first char before an inch/foot mark is a number and the character
        // after is a some kind of whitespace or puncuation we interpret this as an
        // actual foot or inch and just leave things be.
        const char = node.text[offset]
        if (!isNaN(parseInt(char)) && (KEY_CODES.includes(prevChar.charCodeAt(0)))) {
          // We have established that a quote is preceded by a number and followed by a whitespace/punctuation
          // This looks like it is actually used as inch or foot mark. We're done.
          return input
        }

        // We have found a matching inch/foot and want to convert them to a citation
        pos = -1 // Set pos to -1 to exit outer loop
        break
      }

      if (node.text[offset] === data) {
        point = { path, offset }
        console.log('Found " at', point)
      } else {
        prevChar = node.text[offset]
      }
    }

    firstOffset = 0
  }

  if (!point) {
    return input
  }

  // FIXME: This should obviously come from the document locale...
  const locale = 'en'
  const q = LOCALIZED_QUOTES[locale] || LOCALIZED_QUOTES.en

  // Which are the typographic quote we want for the char?
  let quotes: string[] = []
  if (data === "'") {
    quotes = [q[0], q[1]]
  } else if (data === '"') {
    quotes = [q[2], q[3]]
  } else {
    return input // This should never happen if the matcher is alrighty
  }

  // Transform the previous found inch/foot mark to beginning typographic quotation mark
  Transforms.delete(editor, {
    at: point
  })

  Transforms.insertText(editor, quotes[0], {
    at: point
  })

  // Return the ending typographic quotation mark to be handled in normal flow
  return {
    ...input,
    data: quotes[1]
  }
}
