import Koa from "koa"
import routesInstaller from "./routes"
import bodyParser from "koa-bodyparser"

const app = new Koa()

// 官方术语 app.use 叫做在使用中间件，就是use 在监听用户请求
// bodyParser 处理请求体的中间件
app.use(bodyParser())

routesInstaller(app)

const port = 1998

app.listen(port, () => {
  console.log(`开始监听端口${port}...`)
})
