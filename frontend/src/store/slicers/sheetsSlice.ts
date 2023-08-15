import { createSlice } from "@reduxjs/toolkit"
import { Sheet } from "../types"
import { Key } from "react"

let initialState: {
  [sheetId: Key]: Sheet
} = {}

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: initialState,
  reducers: {
    // 创建表格
    createSheet: (state, action) => {},
    // 删除表格
    deleteSheet: (state, action) => {},
  },
})

export default sheetsSlice.reducer
