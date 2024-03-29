import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import routes from "./router.config"
import { MantineProvider } from "@mantine/core"
import "./tailwind.css"
import "./i18n/index"
import { Provider as StoreProvider } from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={routes} />
    </StoreProvider>
  </React.StrictMode>
)
