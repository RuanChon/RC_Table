import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "./App"

// 路由懒加载
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))

// react-dom
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
])

export default routes
