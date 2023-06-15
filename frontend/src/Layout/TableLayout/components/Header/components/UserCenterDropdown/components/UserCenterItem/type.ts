import { SelectItem } from "@mantine/core"

export interface UserCenterProps<ValidSelectValue = string> {
  label: string
  defaultSelect: string
  selectData: SelectItem[]
  onSelectChange: (newValue: ValidSelectValue) => void
}

// export interface SelectItem {
//   label: string
//   value: string
// }
