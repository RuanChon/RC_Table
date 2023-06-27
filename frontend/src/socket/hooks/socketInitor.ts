import { io } from "socket.io-client"

const url = "http://localhost:1996"

const socket = io(url, {
  // 是否自动链接
  autoConnect: true,
})

export default socket
