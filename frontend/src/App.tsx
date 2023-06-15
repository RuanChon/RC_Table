import { useEffect, Suspense } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import useThemeWorker from "./Layout/TableLayout/components/Header/components/UserCenterDropdown/hooks/useThemeWorker"

// 根路由
export default function RouteGroup() {
  const navigator = useNavigate()
  const { realTimeTheme } = useThemeWorker()

  useEffect(() => {
    // 路由守卫
    const isLogin = true
    if (!isLogin) {
      navigator("/login")
    } else {
      navigator("/home")
    }
  }, [navigator])

  // outlet 相当于 router-view
  return (
    <Suspense>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colors: { transparent: ["transparent"] }, colorScheme: realTimeTheme }}
      >
        <Outlet />
      </MantineProvider>
    </Suspense>
  )
}
