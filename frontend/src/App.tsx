import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

// 根路由
export default function RouteGroup() {
  const navigator = useNavigate()

  useEffect(() => {
    // 路由守卫
    const isLogin = true

    if (!isLogin) {
      navigator("/login")
    }
  }, [])

  // outlet 相当于 router-view
  return <Outlet />
}
