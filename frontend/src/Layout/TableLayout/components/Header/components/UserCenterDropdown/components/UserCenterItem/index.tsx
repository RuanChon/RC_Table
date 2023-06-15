// deps
import { Box, Text, HoverCard } from "@mantine/core"
import { IconChevronRight } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { map } from "lodash"

// type
import { UserCenterProps } from "./type"
import { t } from "i18next"
import { useCallback } from "react"

// 左边选择栏菜单组件
// Omit TS内置类型，做剔除操作
export function LeftSelectPanel<ValidSelectValue = string>({
  defaultSelect,
  selectData,
  onSelectChange,
}: Omit<UserCenterProps<ValidSelectValue>, "label">) {
  const changeCurrentSelect = useCallback(
    (newSelectValue: ValidSelectValue) => {
      onSelectChange(newSelectValue)
    },
    [onSelectChange]
  )

  return (
    <Box>
      {map(selectData, selectItem => {
        return (
          <Box
            className="cursor-pointer"
            onClick={() => changeCurrentSelect(selectItem.value as ValidSelectValue)}
            key={selectItem.value}
          >
            {selectItem.label}
          </Box>
        )
      })}
    </Box>
  )
}

// 右边主菜单组件
export default function UserCenterItem<ValidSelectValue = string>({
  label,
  ...selectItemProps
}: UserCenterProps<ValidSelectValue>) {
  const { t } = useTranslation()

  return (
    <HoverCard position="left-start" offset={1}>
      <HoverCard.Target>
        <Box className="flex items-center justify-between h-10 px-3 text-sm cursor-pointer">
          <Text className="text-#1f2329">{t(label)}</Text>
          <Box className="flex items-center">
            <Text className="text-xs text-#646A73/90">{selectItemProps.defaultSelect}</Text>
            <IconChevronRight color="#646a73" width={14} height={14} />
          </Box>
        </Box>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <LeftSelectPanel<ValidSelectValue> {...selectItemProps} />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
