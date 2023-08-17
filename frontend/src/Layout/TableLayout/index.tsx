// deps
import { PropsWithChildren, useEffect } from "react"
import { AppShell, Box, Button } from "@mantine/core"
import { useTranslation } from "react-i18next"
import useSocket from "../../socket/hooks/useSocket"

// components
import Header from "./components/Header"
import Navbar from "./components/Navbar"

// utils

export default function TableLayout(props: PropsWithChildren) {
  const { i18n } = useTranslation()
  const { submitSocket } = useSocket()

  useEffect(() => {
    const localLang = localStorage.getItem("lang")
    if (!localLang) return
    i18n.changeLanguage(JSON.parse(localLang))
  }, [])

  return (
    <AppShell
      header={<Header />}
      navbar={<Navbar />}
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {/* TODO 视频写法 */}
      {/* <Box pl={280} >{props.children}</Box> */}
      <Box>{props.children}</Box>
    </AppShell>
  )
}
