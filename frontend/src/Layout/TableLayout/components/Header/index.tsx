// deps
import { Box, Header as HeaderContainer } from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons-react"

// svgs
// import BackArrow from "../../../../assets/svgComponents/back-arrow"

export default function Header() {
  return (
    <HeaderContainer height={64}>
      <Box className="h-full pl-4 bg-red-200">
        <IconChevronLeft />
      </Box>
    </HeaderContainer>
  )
}
