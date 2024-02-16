import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App.tsx'

import './editor-variables.css'
import '@ttab/textbit/dist/esm/index.css'

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
