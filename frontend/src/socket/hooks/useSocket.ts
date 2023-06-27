import { useCallback, useEffect } from "react"
import socket from "./socketInitor"

export default function useSocket() {
  // socket 链接成功钩子
  const socketConnectedCallback = useCallback(() => {
    console.log("socket链接成功钩子")
  }, [])

  // socket 链接异常钩子
  const socketDisconnectCallback = useCallback(() => {
    console.log("socket链接异常钩子")
  }, [])

  // 自定义
  const socketMessageCallback = useCallback(event => {
    console.log("socket链接自定义钩子", event)
    // 处理版本
    // 客户端写队列，还要上锁
  }, [])

  // 监听 soket 钩子变化
  useEffect(() => {
    // 官方指定成功关键字，connect
    socket.on("connect", socketConnectedCallback)

    // 官方指定异常关键字，connect
    socket.on("disconnect", socketDisconnectCallback)

    // 自定义一个
    socket.on("message", socketMessageCallback)

    return () => {
      // 及时关闭事务
      socket.off("connect", socketConnectedCallback)
      socket.off("disconnect", socketDisconnectCallback)
      // event emmiter 机制
      socket.off("message", socketMessageCallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitSocket = useCallback(() => {
    socket.emit("message", JSON.stringify({ version: 2, delete: "hello", create: "hello chon" }))
  }, [])

  return {
    submitSocket,
  }
}
