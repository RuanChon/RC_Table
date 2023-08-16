import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Sheet } from "../types"
import { Key } from "react"
import { SheetOperator } from "../../operations/SheetOperator"
import { sheetTemplateCreator } from "../utils"

// const defaultSheet = sheetTemplateCreator("未命名子表")
// console.log("defalsheet", defaultSheet)

// const sheetOperator = new SheetOperator()

// 当用户做任何操作 - 触发对应的redux - 拆分成多个ot原子对象传递给服务端「为了更好的做撤销回退」

let initialState: {
  [sheetId: Key]: Sheet
} = {
  "86ee21ae-6335-4cbd-86a5-c28798bf2b96": {
    id: "86ee21ae-6335-4cbd-86a5-c28798bf2b96",
    name: "未命名子表",
    columns: {
      "dc6719bb-2556-4e1e-ace3-efce9b2362e7": {
        id: "dc6719bb-2556-4e1e-ace3-efce9b2362e7",
        name: "",
        columnType: "TEXT",
        columnProps: {},
      },
    },
    views: {
      "259fc0b6-ef70-499d-aed7-84f887c7f767": {
        id: "259fc0b6-ef70-499d-aed7-84f887c7f767",
        name: "默认视图",
      },
    },
    rows: {},
  },
}

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: initialState,
  reducers: {
    // 创建表格
    createSheet: (state, action: PayloadAction<{ name: string }>) => {
      // 只要做非常简单的事情，把表创建好就行，不需要传送
      // 1. 生成表格
      // 2. 修改本地的redux数据
      // 3. 将对应的子对象通过调用 generateOperations() 生成对应的原子事件
      // const ops = sheetOperator.generateOperations(sheetObj)
      // 入队列
      // queue.push(ops)
      const sheetCount = Object.keys(state).length

      // 构建表
      const sheet = sheetTemplateCreator(action.payload.name || `未命名表格${sheetCount + 1}`)
      state[sheet.id] = sheet
    },

    // 删除表格
    deleteSheet: (state, action) => {},
  },
})

export const { createSheet, deleteSheet } = sheetsSlice.actions
export default sheetsSlice.reducer
