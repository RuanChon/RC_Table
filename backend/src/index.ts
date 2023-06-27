import Koa from "koa"
import routesInstaller from "./routes"
import bodyParser from "koa-bodyparser"
import { Server } from "socket.io"
import { createServer } from "http"

const app = new Koa()

const httpServer = createServer(app.callback())

// 中间件
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
})

// 代表有人链接了端口
io.on("connection", socket => {
  // socket 代表监听哪个端口
  console.log("someone connected")
  socket.on("message", args => {
    console.log("客户端发新版本了", args)
    // 要返回告诉结果是否成功触发
    // 提交 message 事件，把原有信息返回是为了方便客户端维护处理数据，比如队列 版本回退，同时涉及服务端版本冲突处理
    socket.emit("message", args)
  })
})

httpServer.listen(1996, () => {
  console.log(`开始监听端口1996...`)
})

// 官方术语 app.use 叫做在使用中间件，就是use 在监听用户请求
// bodyParser 处理请求体的中间件
app.use(bodyParser())

routesInstaller(app)

const port = 1998

app.listen(port, () => {
  console.log(`开始监听端口${port}...`)
})
