import { useLocalStorage } from "@mantine/hooks"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SelectItem } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { ValidTheme } from "../../../../../../../theme/types"
import getLocalTheme from "../../../../../../../theme/getLocalTheme"

export default function useThemeWorker() {
  const { t } = useTranslation()
  // 主题
  const themeSelectData = useMemo<SelectItem[]>(() => {
    return [
      {
        label: t("light"),
        value: "light",
      },
      {
        label: t("dark"),
        value: "dark",
      },
      {
        label: t("system"),
        value: "system",
      },
    ]
  }, [t])

  // 修改当前主题，并把设置缓存到本地 localStorage
  const [presentTheme, setPresentTheme] = useLocalStorage<ValidTheme>({ key: "theme", defaultValue: "system" })
  const [realTimeTheme, setRealTimeTheme] = useState(getLocalTheme())

  useEffect(() => {
    console.log("effect", presentTheme)

    if (presentTheme === "system") {
      watchSystemTheme()
      setRealTimeTheme(getLocalTheme())
      return
    }
    setRealTimeTheme(presentTheme)
  }, [presentTheme])

  // 监听当前系统主题，自动更换
  const watchSystemTheme = useCallback(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
    systemTheme.addListener(e => {
      if (e.matches) {
        console.log("现在是 dark 主题")
        setRealTimeTheme("dark")
      } else {
        console.log("现在是 light 主题")
        setRealTimeTheme("light")
      }
    })
  }, [])

  // 修改环境变量
  const changePrensentTheme = useCallback(
    (newTheme: ValidTheme) => {
      console.log("当前修改的是", newTheme)
      setPresentTheme(newTheme)
    },
    [setPresentTheme]
  )

  return { presentTheme, changePrensentTheme, themeSelectData, realTimeTheme }
}
