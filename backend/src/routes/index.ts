// 集中注册路由
import userRouter from "./user"
import Koa from "koa"

export default function (ctx: Koa<Koa.DefaultState, Koa.DefaultContext>) {
  ctx.use(userRouter)
}
