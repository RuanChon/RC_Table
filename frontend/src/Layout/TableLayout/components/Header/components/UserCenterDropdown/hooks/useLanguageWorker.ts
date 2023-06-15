// deps
import { SelectItem } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"

// types
import { ValidLang } from "../../../../../../../i18n/types"

const languageSelectData: SelectItem[] = [
  {
    label: "简体中文",
    value: "zh",
  },
  {
    label: "English",
    value: "en",
  },
]

export default function useLanguageData() {
  const { i18n } = useTranslation()

  // 修改当前语言，并把设置缓存到本地 localStorage
  const [presentLanguage, setPresentLanguage] = useLocalStorage<ValidLang>({ key: "lang", defaultValue: "en" })

  const changePrensentLanguage = useCallback(
    (newLang: ValidLang) => {
      console.log("当前修改的是", newLang)
      setPresentLanguage(newLang)
      // 通知 i18n
      i18n.changeLanguage(newLang)
    },
    [i18n, setPresentLanguage]
  )

  return { languageSelectData, presentLanguage, changePrensentLanguage }
}
