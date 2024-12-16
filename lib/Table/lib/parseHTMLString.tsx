export function parseHTMLString (html: string): HTMLTableRowElement[] {
  const withTableElement = `<table>${html}</table>`
  const parser = new DOMParser()
  const doc = parser.parseFromString(withTableElement, 'text/html')
  const rows = Array.from(doc.querySelectorAll('tr'))
  return rows
}
