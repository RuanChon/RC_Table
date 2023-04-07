// 写接口的业务逻辑层，导出一个函数
import { UserInfo } from "./types"

export const login = async (userInfo: UserInfo) => {
  console.log("login userInfo", userInfo)
  return new Promise(resolve => {
    if (userInfo.username === "chon") {
      resolve(userInfo)
    } else {
      resolve(null)
    }
  })
}
