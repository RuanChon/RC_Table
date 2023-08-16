import { ActionIcon, Box, Divider, Input, Navbar as NavContainer, Text } from "@mantine/core"
import useSheets from "../../../../hooks/useSheets"
import { map } from "lodash"
import SheetIcon from "../../../../assets/svgComponents/sheet-icon"
import { IconDots, IconPlus } from "@tabler/icons-react"
import { useCallback, useState, useRef } from "react"
import { Sheet } from "../../../../store/types"

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { sheetsArray, createSheetDispatcher } = useSheets()
  console.log("sheets", sheetsArray)

  const [tempSheetsArr, setTempSheetsArr] = useState<Sheet[]>(sheetsArray)
  const [showCreateInput, setShowCreateInput] = useState<boolean>(false)

  // 新建表格
  const handleCreateSheet = useCallback(() => {
    setShowCreateInput(true)
    // 直接这样获取焦点是没用的，因为 state 的更新是异步的，到目前这里都还没有拿到input的真实dom
    // inputRef.current?.focus()
    requestIdleCallback(() => {
      inputRef.current?.focus()
    })
  }, [])

  // 失去焦点后，请求新建表格
  const requestCreateSheet = useCallback(() => {
    const sheetName = inputRef.current?.value
    if (!sheetName) return
    setShowCreateInput(false)
    createSheetDispatcher(sheetName)
  }, [])

  return (
    <NavContainer width={{ base: 280 }}>
      <Box className="relative w-full h-full p-1">
        {/* list 模块 */}
        <Box>
          {map(sheetsArray, sheet => {
            return (
              <Box
                className="flex items-center justify-between px-1 rounded cursor-pointer h-9 hover:bg-slate-200"
                key={sheet.id}
              >
                <Box className="flex items-center gap-1">
                  <SheetIcon />
                  <Text className="text-sm ">{sheet.name}</Text>
                </Box>
                <ActionIcon>
                  <IconDots />
                </ActionIcon>
              </Box>
            )
          })}
          {showCreateInput && (
            <Input onBlur={requestCreateSheet} defaultValue={`数据表${tempSheetsArr.length + 1}`} ref={inputRef} />
          )}
        </Box>

        {/* 操作模块 */}
        <Box className="absolute bottom-0 left-0 w-full p-3">
          <Divider />
          <Text className="py-1 leading-10">新建</Text>
          <Box
            onClick={handleCreateSheet}
            className="flex items-center justify-between h-8 gap-1 px-1 rounded cursor-pointer hover:bg-slate-200"
          >
            <Box style={{ color: "#a45eeb" }} className="flex items-center gap-1">
              <SheetIcon />
              <Text className="text-sm text-black">新建表格</Text>
            </Box>
            <IconPlus size={16} />
          </Box>
        </Box>
      </Box>
    </NavContainer>
  )
}
