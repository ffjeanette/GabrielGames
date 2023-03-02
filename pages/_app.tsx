import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import styles from "../styles/Home.module.css"
import CssBaseline from "@mui/material/CssBaseline"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "'VT323', monospace",
    fontSize: 20,
    button: {
      textTransform: "none",
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return pageLoaded ? (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  ) : null
}

export default MyApp
