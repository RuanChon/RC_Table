import { Key } from "react"

// 将允许创建的column类型定义为枚举
export type ColumnMap = {
  TEXT: {}
  SELECT: {
    // 对象代表的是 针对该字段所要提供的额外配置「columnProps」
    options: Array<{ label: string; value: string; id: Key }>
  }
}

export interface Column<ColumnType extends keyof ColumnMap> {
  id: Key
  name: string
  columnType: ColumnType
  // 意味着根据不同字段类型，columnProps 会有不同的属性
  columnProps: ColumnMap[ColumnType]
}

// 每一行的数据
export interface Row {
  id: Key
  [columnId: Key]: Key
}

export interface View {
  id: Key
  name: string
}

// 定义表的类型
export interface Sheet {
  id: Key
  name: string
  columns: {
    [columnId: Key]: Column<any>
  }
  views: {
    [viewId: Key]: View
  }
  rows: {
    [rowId: Key]: Row
  }
}
