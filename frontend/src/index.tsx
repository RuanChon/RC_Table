import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import routes from "./router.config"
import { MantineProvider } from "@mantine/core"
import "./tailwind.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={routes} />
    </MantineProvider>
  </React.StrictMode>
)
