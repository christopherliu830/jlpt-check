// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react"

import { useEffect } from "react";

import { theme } from './theme/theme';

export function Chakra({ cookies, children }) {

  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager
  
  useEffect(() => {
    // workaround to set color-mode cookie if nonexistent
    if (!colorModeManager.get()) {
      if (theme.config.useSystemColorMode) {
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const color = query.matches ? 'dark' : 'light';
        colorModeManager.set(color);
      }
    }
  })

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

// also export a reusable function getServerSideProps
export async function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}
