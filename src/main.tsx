import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App.tsx'

import './editor-variables.css'
import '@ttab/textbit/dist/esm/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
