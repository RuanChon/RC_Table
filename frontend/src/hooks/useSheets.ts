import { useSelector, useDispatch } from "react-redux"
import { createSheet } from "../store/slicers/sheetsSlice"
import { RootState } from "../store"
import { Key, useCallback, useMemo } from "react"
import { get } from "lodash"
import { Sheet } from "../store/types"

export default function useSheets() {
  const dispatch = useDispatch()
  const sheets = useSelector((state: RootState) => state.sheets)
  const sheetsArray = useMemo<Array<Sheet>>(() => Object.values(sheets), [sheets])

  // 获取单张表
  const getSheet = useCallback((sheetId: Key) => sheets[sheetId], [sheets])

  const getView = useCallback((sheetId: Key, viewId: Key) => get(sheets, [sheetId, viewId]), [sheets])

  // 创建一张表
  const createSheetDispatcher = useCallback(
    (sheetName: string) => {
      dispatch(createSheet({ name: sheetName }))
    },
    [dispatch]
  )

  return {
    sheets,
    sheetsArray,
    getSheet,
    getView,
    createSheetDispatcher,
  }
}
