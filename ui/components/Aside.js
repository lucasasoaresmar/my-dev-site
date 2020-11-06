import { Box } from "theme-ui";

export default function Aside({ children, ...rest }) {
  return (
    <Box as="aside" className="aside" {...rest}>
      <Box sx={{ position: ["static", "static", "sticky"], top: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
