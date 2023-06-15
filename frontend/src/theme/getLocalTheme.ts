// 获取本地缓存的主题变量
export default function getLocalTheme() {
  const localTheme = localStorage.getItem("theme")
  if (!localTheme || JSON.parse(localTheme) === "system") {
    // 判断当前系统颜色主题
    const isSystemTheme = window.matchMedia("(prefers-color-scheme: dark)")
    if (isSystemTheme.matches) {
      // console.log("当前系统是 dark")
      return "dark"
    } else {
      // console.log("当前系统是 light")
      return "light"
    }
  }
  return JSON.parse(localTheme)
}
