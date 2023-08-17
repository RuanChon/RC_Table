import { Box } from "@mantine/core"
import useSheets from "../../../../hooks/useSheets"
import { map } from "lodash"
import { useMemo } from "react"
import { IconPlus, IconSettings } from "@tabler/icons-react"

export default function TableView() {
  const {
    getSheetUrlParams: { sheetId, viewId },
    getTargetSheetViewArray,
  } = useSheets()

  const targetViews = getTargetSheetViewArray(sheetId)

  const navgationBarConfig = useMemo(() => {
    return [
      [
        {
          id: 1,
          icon: <IconPlus size={14} />,
          label: "添加视图",
          color: "#3370ff",
        },
      ],
      [
        {
          id: 2,
          icon: <IconSettings size={14} />,
          label: "字段配置",
        },
        {
          id: 3,
          icon: <IconSettings size={14} />,
          label: "视图配置",
        },
        {
          id: 4,
          icon: <IconSettings size={14} />,
          label: "筛选",
        },
        {
          id: 5,
          icon: <IconSettings size={14} />,
          label: "分组",
        },
        {
          id: 6,
          icon: <IconSettings size={14} />,
          label: "排序",
        },
        {
          id: 7,
          icon: <IconSettings size={14} />,
          label: "行高",
        },
      ],
      [
        {
          id: 8,
          icon: <IconSettings size={14} />,
          label: "提醒",
        },
        {
          id: 9,
          icon: <IconSettings size={14} />,
          label: "生成表单",
        },
        {
          id: 10,
          icon: <IconSettings size={14} />,
          label: "分享视图",
        },
      ],
    ]
  }, [])

  console.log("views", targetViews)

  return (
    <Box>
      {/* 头部视图列表 */}
      <Box>
        {map(targetViews, view => {
          return (
            <Box className="p-3 bg-white rounded-tr-md w-fit" key={view.id}>
              {view.name}
            </Box>
          )
        })}
      </Box>

      <Box className="bg-white rounded-lg h-80 ">
        {/* 导航控制面板 */}
        <Box className="flex items-center h-10 px-3">
          {/* 左侧 */}
          <Box className="flex gap-4">
            {map(navgationBarConfig, navgationBar => {
              return (
                <Box className="flex gap-4">
                  {map(navgationBar, navgationA => {
                    return (
                      <Box className="flex items-center text-sm cursor-pointer">
                        {navgationA.icon}
                        {navgationA.label}
                      </Box>
                    )
                  })}
                </Box>
              )
            })}
          </Box>
          {/* 右侧 */}
          <Box></Box>
        </Box>
      </Box>
      {/* canvas绘表 */}
    </Box>
  )
}
