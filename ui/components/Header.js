import NextLink from "next/link";
import { Box, Flex, NavLink } from "theme-ui";

export default function Header({ children }) {
  return (
    <Box as="header" className="header">
      <Flex
        as="nav"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          width: "100%",
          backgroundColor: "background",
          backgroundColor: "rgba(255, 255, 255, .65)",
          backdropFilter: "blur(9px)",
          zIndex: 1000,
        }}
      >
        <NextLink href="/">
          <NavLink sx={{ marginX: 3 }}>Home</NavLink>
        </NextLink>

        <NextLink href="/coisas">
          <NavLink sx={{ marginX: 3 }}>Coisas</NavLink>
        </NextLink>
      </Flex>

      {children}
    </Box>
  );
}
