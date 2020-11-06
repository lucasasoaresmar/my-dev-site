import { Box } from "theme-ui";

export default function Main({ children }) {
  return (
    <Box className="main" as="main">
      {children}
    </Box>
  );
}
