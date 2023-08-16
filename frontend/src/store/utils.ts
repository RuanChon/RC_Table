// 帮助函数。生成各式各样的模板
import { v4 as uuid } from "uuid"
import { Column, Sheet, View } from "./types"

// 创建时的默认试图
export const viewTemplateCreator: (name: string) => View = (name: string) => {
  return {
    id: uuid(),
    name,
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
  const defaultView = viewTemplateCreator("默认视图")
  const defaultTextColumn = columnTemplateCreator("多行文本")

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
