import { Box } from "@mantine/core"
import { map, omit } from "lodash"
import { Key, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { IconPlus, IconSettings } from "@tabler/icons-react"
import { Stage, Rect, Layer, Text as CanvasText } from "react-konva"
import { Html } from "react-konva-utils"
import { KonvaEventObject } from "konva/lib/Node"
import { ColumnMap } from "../../../../store/types"
import useSheets from "../../../../hooks/useSheets"
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

  const [workInProgressCell, setWorkInProgressCell] = useState<{
    columnType: keyof ColumnMap
    width: number
    value: Key
    rowId: Key
    colId: Key
  }>(null)

  const columnsDescriptiors = getTargetViewColumns(sheetId, viewId)
  const { rowsArray } = getTargetViewRows(sheetId, viewId)

  useLayoutEffect(() => {
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    })
    console.log("canvasSize", canvasSize)
  }, [])

  const handleEditCell = useCallback(
    (
      event: KonvaEventObject<MouseEvent>,
      cellPayload: {
        columnType: keyof ColumnMap
        width: number
        value: Key
        rowId: Key
        colId: Key
      }
    ) => {
      console.log("event", event)
      const cellX = event.target.attrs.x
      const cellY = event.target.attrs.y
      // 控制编辑框的位置
      setWorkInProgressCell(cellPayload)

      fasterOverlayRef.current.style.left = `${cellX}px`
      fasterOverlayRef.current.style.top = `${cellY}px`
    },
    []
  )

  // 表头宽度
  const columnHeaderWidth = useMemo<number>(() => {
    // 把当前视图的 columnConfig 全拿出来，然后计算出总宽度
    const { columnsConfigArray } = columnsDescriptiors
    let width = 0
    columnsConfigArray.forEach(({ width: _w }) => {
      width += _w
    })
    return width
  }, [columnsDescriptiors])

  // 计算列的 x 坐标， 排序
  // const calculateColnumX = useCallback((colId: Key, columnsConfig: { [columnId: Key]: ColumnConfig }) => {}, [])

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
                <Box
                  style={{ width: columnHeaderWidth, height: 30 }}
                  className=" text-white text-sm border-b-0 border border-solid border-#Dee0e3 p-1"
                >
                  列头
                </Box>
              </Html>
              {
                // 渲染rows
                map(rowsArray, (row, index) => {
                  const colomnsIds = Object.keys(omit(row, "id"))
                  return map(colomnsIds, (colomnId, colomnIndex) => {
                    // 锁定的就是每一个单元格，考虑以下几个问题
                    const { columnsConfig, columns } = columnsDescriptiors
                    // 1. 单元格的大小
                    const matchWidth = columnsConfig[colomnId].width
                    const matchType = columns[colomnId].columnType
                    // 2. 单元格的默认值
                    const defaultValue = row[colomnId]
                    // 3. 列的x坐标，以index为例，除了第一列，后面的所有的都是前面列的宽度
                    // const x = colomnIndex === 0 ? 0 : calculateColnumX(colomnId, columnsConfig)
                    const x = 0
                    const y = 0

                    return (
                      <>
                        <Rect
                          x={x}
                          y={y + 30}
                          strokeWidth={1}
                          stroke="#ddd"
                          width={matchWidth}
                          height={30}
                          onDblClick={event =>
                            handleEditCell(event, {
                              columnType: matchType,
                              width: matchWidth,
                              value: defaultValue,
                              rowId: row.id,
                              colId: colomnId,
                            })
                          }
                        />
                        <CanvasText fontSize={14} x={x + 12} y={y + 30 + 8} text={defaultValue as string} />
                      </>
                    )
                  })
                })
              }
            </Layer>
          </Stage>
          {/* input */}
          <Box ref={fasterOverlayRef} className="absolute faster-overlay">
            {/* 判断类型渲染组件 */}
            {workInProgressCell && (
              <Box>
                {workInProgressCell.columnType === "TEXT" && (
                  <TextAtomComponent
                    width={workInProgressCell.width}
                    defaultValue={workInProgressCell.value}
                    colId={workInProgressCell.colId}
                    rowId={workInProgressCell.rowId}
                    sheetId={sheetId}
                    viewId={viewId}
                    destroyAtomCpt={() => setWorkInProgressCell(null)}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
