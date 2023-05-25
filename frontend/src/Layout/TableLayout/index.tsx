// deps
import { PropsWithChildren } from "react"
import { AppShell, Box } from "@mantine/core"
// components
import Header from "./components/Header"
import Navbar from "./components/Navbar"
// utils

export default function TableLayout(props: PropsWithChildren) {
  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      {/* TODO 视频写法 */}
      {/* <Box pl={280} >{props.children}</Box> */}
      <Box>{props.children}</Box>
    </AppShell>
  )
}
