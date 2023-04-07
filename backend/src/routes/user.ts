// 路由层，只做匹配和分发
import KoaRouter from "@koa/router"
import { login } from "../controller/userController"
import { UserInfo } from "../controller/userController/types"

const userRouter = new KoaRouter()

userRouter.post("/login", async ctx => {
  console.log("登录请求", ctx)
  const res = await login(ctx.request.body as UserInfo)
  console.log("ctx.request.body", ctx.request.body)
  console.log("res", res)

  if (res) {
    ctx.body = {
      state: 200,
      message: "ok",
      data: res,
    }
  } else {
    ctx.body = {
      state: 4009,
      message: "error",
      data: null,
    }
  }
})

// 导出一个中间件
export default userRouter.routes()
