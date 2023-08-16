export class SheetOperator {
  generateOperations: () => {
    // 生成对应的原子事件
    return: [
      {
        oi
        od
      }
    ]
  }
  apply: () => {
    // 将原子事件应用到当前的表格上
    // 触发dispatch
  }
  send: (operations) => {
    // 将原子事件发送给服务端
  }
}
