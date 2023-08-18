// 帮助函数。生成各式各样的模板
import { v4 as uuid } from "uuid"
import { Column, ColumnConfig, Sheet, View } from "./types"
import { Key } from "react"

// 创建时的默认试图
export const viewTemplateCreator: (name: string, columnsIdArr: Key[]) => View = (name, columnsIdArr = []) => {
  const columnConfig = columnsIdArr.reduce((acc, cur) => {
    acc[cur] = {
      width: 200,
      sort: 0,
    }
    return acc
  }, {} as { [columnId: string]: ColumnConfig })
  // ----------2
  // const columnConfig: {
  //   [columnId: string]: ColumnConfig
  // } = {}

  // columnsIdArr.forEach((columnId, index) => {
  //   columnConfig[columnId] = {
  //     width: 200,
  //     sort: index,
  //   }
  // })

  return {
    id: uuid(),
    name,
    columnConfig,
  }
}

export const columnTemplateCreator: (name: string) => Column<"TEXT"> = (name: string) => {
  return {
    id: uuid(),
    name: "",
    columnType: "TEXT",
    columnProps: {},
  }
}

export const sheetTemplateCreator: (name: string) => Sheet = (name: string) => {
  // id 通过uuid生成 uuid -> 生成全球唯一的一个字符串
  const sheetId = uuid()
  const defaultTextColumn = columnTemplateCreator("多行文本")
  const defaultView = viewTemplateCreator("默认视图", [defaultTextColumn.id])

  return {
    id: sheetId,
    name,
    columns: {
      [defaultTextColumn.id]: defaultTextColumn,
    },
    views: {
      [defaultView.id]: defaultView,
    },
    rows: {},
  }
}
