import { Box, Avatar, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"
import useLanguageData from "./hooks/useLanguageWorker"
import useThemeWorker from "./hooks/useThemeWorker"

// cpt
import UserCenterItem from "./components/UserCenterItem"
import { ValidLang } from "../../../../../../i18n/types"

export default function UserCenterDropdown() {
  const { t } = useTranslation()
  const { languageSelectData, presentLanguage, changePrensentLanguage } = useLanguageData()
  const { themeSelectData, presentTheme, changePrensentTheme } = useThemeWorker()

  return (
    <Box className="rounded-xl">
      {/* 头像信息 */}
      <Box className="flex gap-2 p-4 w-72  border-b border-#646A73/7">
        <Avatar color="337ff" className="w-12 h-12 rounded-full cursor-pointer bg-#3370ff">
          Chon
        </Avatar>
        <Box className="flex flex-col justify-center">
          <Text className="text-sm font-bold">Chon</Text>
          <Text className="text-xs text-slate-400">{t("user")}</Text>
        </Box>
      </Box>
      {/* 外观 */}
      <UserCenterItem
        onSelectChange={changePrensentTheme}
        label="theme"
        selectData={themeSelectData}
        defaultSelect={presentTheme}
      />
      {/* 语言 */}
      <UserCenterItem<ValidLang>
        label="lang"
        selectData={languageSelectData}
        onSelectChange={changePrensentLanguage}
        defaultSelect={presentLanguage}
      />
    </Box>
  )
}
