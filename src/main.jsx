import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './theme'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'
import "./index.sass"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
