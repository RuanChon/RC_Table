import { useSelector, useDispatch } from "react-redux"
import { createSheet } from "../store/slicers/sheetsSlice"
import { RootState } from "../store"
import { Key, useCallback, useMemo } from "react"
import { get } from "lodash"
import { Sheet } from "../store/types"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function useSheets() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const sheets = useSelector((state: RootState) => state.sheets)
  const sheetsArray = useMemo<Array<Sheet>>(() => Object.values(sheets), [sheets])

  // 获取单张表
  const getSheet = useCallback((sheetId: Key) => sheets[sheetId], [sheets])

  const getView = useCallback((sheetId: Key, viewId: Key) => get(sheets, [sheetId, viewId]), [sheets])

  // 获取默认视图
  const getTargetSheetViewArray = useCallback(
    (sheetId: Key) => {
      return Object.values(sheets[sheetId].views)
    },
    [sheets]
  )

  // 获取目标视图的列
  const getTargetViewColumns = useCallback(
    (sheetId: Key, viewId: Key) => {
      const targetSheet = get(sheets, [sheetId])
      const targetView = get(targetSheet, ["views", viewId])
      return {
        columns: targetSheet.columns,
        columnsConfig: targetView.columnConfig,
        sheetId,
        viewId,
        columsArray: Object.values(targetSheet.columns),
        columnsConfigArray: Object.values(targetView.columnConfig),
      }
    },
    [sheets]
  )

  // 获取目标视图的行
  const getTargetViewRows = useCallback(
    (sheetId: Key, viewId: Key) => {
      const targetSheet = get(sheets, [sheetId])
      // const targetView = get(targetSheet, ["views", viewId])
      return {
        rows: targetSheet.rows,
        rowsArray: Object.values(targetSheet.rows),
      }
    },
    [sheets]
  )

  // 创建一张表
  const createSheetDispatcher = useCallback(
    (sheetName: string) => {
      dispatch(createSheet({ name: sheetName }))
    },
    [dispatch]
  )

  // 跳转到对应视图
  const navigateToTargetView = useCallback(
    (sheetId: Key, viewId?: Key) => {
      if (!viewId) {
        const firstView = getTargetSheetViewArray(sheetId)[0]
        viewId = firstView.id
      }
      navigate(`/sheet/${sheetId}/${viewId}`)
    },
    [getTargetSheetViewArray, navigate]
  )

  // 处理地址栏表信息
  const getSheetUrlParams = useMemo<{ sheetId: Key; viewId: Key }>(() => {
    return {
      sheetId: params.sheetId,
      viewId: params.viewId,
    }
  }, [params.sheetId, params.viewId])

  return {
    sheets,
    sheetsArray,
    getSheet,
    getView,
    getTargetSheetViewArray,
    createSheetDispatcher,
    navigateToTargetView,
    getSheetUrlParams,
    getTargetViewColumns,
    getTargetViewRows,
  }
}
