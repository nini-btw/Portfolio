import { createTheme } from '@mui/material/styles'
import { PRIMARY_COLOR, PRIMARY_HOVER } from './constants/theme'

// html { font-size: 62.5% } (src/index.sass) makes 1rem = 10px, not MUI's
// assumed 16px default. Without htmlFontSize, MUI's own rem-based sizing
// (TextField/Button text, etc.) renders at ~62.5% of its intended size.
// This tells MUI's pxToRem conversion the real baseline so it scales correctly
// — and keeps scaling correctly through index.sass's own responsive root
// font-size changes, since rem always resolves against the live root size.
export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      dark: PRIMARY_HOVER,
    },
  },
})
