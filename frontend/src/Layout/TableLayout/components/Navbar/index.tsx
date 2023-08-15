import { Box, Navbar as NavContainer } from "@mantine/core"

export default function Navbar() {
  return (
    <NavContainer width={{ base: 280 }}>
      <Box className="relative w-full">
        {/* list 模块 */}
        <Box className="">list 列表</Box>
        {/* 操作模块 */}
      </Box>
    </NavContainer>
  )
}
