import { Input } from "@mantine/core"
import { FocusEventHandler, Key, useCallback } from "react"
import useSheets from "../../../../hooks/useSheets"

interface TextAtomComponentProps {
  defaultValue?: Key
  width?: number
  destroyAtomCpt: VoidFunction
  colId: Key
  sheetId: Key
  viewId?: Key
  rowId: Key
}

const TextAtomComponent = ({
  defaultValue = "",
  width = 200,
  destroyAtomCpt,
  colId,
  sheetId,
  viewId,
  rowId,
}: TextAtomComponentProps) => {
  const { saveCellValue } = useSheets()

  // 把编辑过的数据保存到store
  const mutateTextCloumn = useCallback<FocusEventHandler<HTMLInputElement>>(
    event => {
      // 注意这里保存的参数顺序一定要和 hook 里的一致
      saveCellValue(sheetId, viewId, rowId, colId, event.target.value)
      destroyAtomCpt()
    },
    [colId, destroyAtomCpt, rowId, saveCellValue, sheetId, viewId]
  )

  return (
    <Input
      onBlur={mutateTextCloumn}
      className="rounded-none"
      styles={{
        input: {
          width: width + "px",
          borderRadius: "0px",
        },
      }}
      defaultValue={defaultValue}
    />
  )
}

export default TextAtomComponent
