import { useState, useEffect } from 'react'
import './themeSwitcher.css'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

  useEffect(() => { toggleTheme(theme || 'light') }, [theme])

  return <div className="theme-switch-container">

    <div className="theme-switch-wrapper">
      <label
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
        className="theme-switch"
        htmlFor="checkbox2"
      >
        <input
          type="checkbox2"
          onChange={() => { }}
          checked={theme === 'dark'}
        />
        <div className={`slider round ${theme === 'dark' ? 'checked' : ''}`}></div>
      </label>
    </div>
  </div >
}


function toggleTheme(theme: string): void {
  if (theme === 'dark') {
    document.body.classList.add('dark')
  } else if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark')
  }

  localStorage.setItem('theme', theme)
}
