import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "./App"

// 路由懒加载
const Sheet = lazy(() => import("./pages/Sheet"))
const Login = lazy(() => import("./pages/Login"))

// react-dom
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sheet/:sheetId/:viewId",
        element: <Sheet />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
])

export default routes
