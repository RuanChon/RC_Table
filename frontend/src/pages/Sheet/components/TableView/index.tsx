import { Box } from "@mantine/core"
import useSheets from "../../../../hooks/useSheets"
import { map, omit } from "lodash"
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { IconPlus, IconSettings } from "@tabler/icons-react"
import { Stage, Rect, Layer } from "react-konva"
import { Html } from "react-konva-utils"
import { KonvaEventObject } from "konva/lib/Node"
import { ColumnMap } from "../../../../store/types"
import TextAtomComponent from "../../../../Layout/TableLayout/components/AtomComponent/TextAtomComponent"

export default function TableView() {
  const {
    getSheetUrlParams: { sheetId, viewId },
    getTargetSheetViewArray,
    getTargetViewColumns,
    getTargetViewRows,
  } = useSheets()

  const targetViews = getTargetSheetViewArray(sheetId)

  const canvasContainerRef = useRef<HTMLDivElement>()
  const fasterOverlayRef = useRef<HTMLDivElement>()

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

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const [workInProgressCell, setWorkInProgressCell] = useState<{ columnType: keyof ColumnMap }>(null)

  const columnsDescriptiors = getTargetViewColumns(sheetId, viewId)
  const rowsDescriptiors = getTargetViewRows(sheetId, viewId)

  useLayoutEffect(() => {
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    })
    console.log("canvasSize", canvasSize)
  }, [])

  const handleEditCell = useCallback((event: KonvaEventObject<MouseEvent>, columnType: keyof ColumnMap) => {
    console.log("event", event)
    const cellX = event.target.attrs.x
    const cellY = event.target.attrs.y

    // 控制编辑框的位置
    setWorkInProgressCell({
      columnType,
    })

    fasterOverlayRef.current.style.left = `${cellX}px`
    fasterOverlayRef.current.style.top = `${cellY}px`
  }, [])

  const columnHeaderWidth = useMemo<number>(() => {
    // 把当前视图的 columnConfig 全拿出来，然后计算出总宽度
    const { columnsConfigArray } = columnsDescriptiors
    let width = 0
    columnsConfigArray.forEach(({ width: _w }) => {
      width += _w
    })
    return width
  }, [columnsDescriptiors])

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

      <Box ref={canvasContainerRef} className="bg-white rounded-lg h-80">
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

        {/* canvas绘表 */}
        <Box className="relative">
          <Stage width={canvasSize.width} height={canvasSize.height}>
            {/* 宿主区域 */}
            <Layer>
              {/* 用DOM绘制表头行区域，因为数据大了，DOM是控制不住，性能很差，而表头一般都是有限制的 */}
              {/* 注意列宽 = 一列的宽度 * 列个数 */}
              <Html>
                <Box style={{ width: columnHeaderWidth }} className="h-10 text-sm rounded-md bg-slate-100">
                  DOM表头
                </Box>
              </Html>
              {/* <Rect
                onDblClick={event => handleEditCell(event, {
                  columnType: "TEXT",
                  width: 180,
                })}
                x={20}
                y={20}
                width={180}
                height={30}
                fill="#fff"
                strokeWidth={1}
                stroke="#ddd"
              /> */}
              {
                // 渲染rows 01:00:00
                map(rowsDescriptiors, (row, index) => {
                  const colomnsIds = Object.keys(omit(row, "id"))
                  console.log("colomnsIds", colomnsIds)
                  return
                })
              }
            </Layer>
          </Stage>
          {/* input */}
          <Box ref={fasterOverlayRef} className="absolute faster-overlay">
            {/* 判断类型渲染组件 */}
            {workInProgressCell && <Box>{workInProgressCell.columnType === "TEXT" && <TextAtomComponent />}</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
