// deps
import { Box, Button, Header as HeaderContainer, Text, Avatar, Menu } from "@mantine/core"
import { IconChevronLeft, IconStar, IconFolderFilled, IconLock } from "@tabler/icons-react"
import { useCallback } from "react"

// svgs
// import BackArrow from "../../../../assets/svgComponents/back-arrow"

// cpt
import UserCenterDropdown from "./components/UserCenterDropdown"

export default function Header() {
  const editTableName = useCallback(() => {}, [])

  return (
    <HeaderContainer height={64}>
      <Box className="flex items-center justify-between h-full pl-4">
        {/* 左边的区域 */}
        <Box className="flex items-center h-full">
          {/* left icon */}
          <IconChevronLeft />
          {/* left info */}
          <Box className="flex flex-col gap-1">
            {/* info top */}
            <Box className="flex items-center h-6">
              <Box className="px-1 text-sm" onDoubleClick={editTableName}>
                👾任务管理
              </Box>
              {/* <Input defaultValue={} value={"👾任务管理"}></Input> */}
              {/* 收藏 */}
              <Box className="flex items-center justify-center w-5 h-5 rounded-md cursor-pointer hover:bg-slate-200">
                <IconStar className="w-3 h-3" />
              </Box>
            </Box>
            {/* info bottom */}
            <Box className="flex items-center w-64 h-4 gap-1 pl-1 text-xs text-646A73">
              <IconFolderFilled className="w-3 h-3 text-646A73" />
              <Text className="">我的空间</Text>
              <Box className="w-[1px] h-3 bg-[#Dee0e3] mx-2" />
              <Text>最近修改时间: 19分钟前</Text>
            </Box>
          </Box>
        </Box>
        {/* 右边的区域 */}
        <Box className="flex items-center h-full pr-5">
          {/* 三个 button */}
          <Box className="mr-5">
            <Button color="transparent" className="bg-#3370ff">
              <IconLock width={16} height={16} strokeWidth={2} />
              <Text className="ml-1">分享</Text>
            </Button>
          </Box>
          {/* 用户中心 */}
          <Box>
            <Menu position="bottom-end">
              {/* 头像 */}
              <Menu.Target>
                <Avatar color="337ff" className="rounded-full cursor-pointer bg-#3370ff">
                  Chon
                </Avatar>
              </Menu.Target>
              {/* 展开菜单 */}
              <Menu.Dropdown className="p-0">
                <UserCenterDropdown />
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>
      </Box>
    </HeaderContainer>
  )
}
