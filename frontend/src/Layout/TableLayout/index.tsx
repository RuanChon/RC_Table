// deps
import { PropsWithChildren, useEffect } from "react"
import { AppShell, Box } from "@mantine/core"
import { useTranslation } from "react-i18next"

// components
import Header from "./components/Header"
import Navbar from "./components/Navbar"

// utils

export default function TableLayout(props: PropsWithChildren) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const localLang = localStorage.getItem("lang")
    if (!localLang) return
    i18n.changeLanguage(JSON.parse(localLang))
  }, [])

  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      {/* TODO 视频写法 */}
      {/* <Box pl={280} >{props.children}</Box> */}
      <Box>{props.children}</Box>
    </AppShell>
  )
}
