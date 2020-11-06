import { Box } from "theme-ui";

export default function Section({
  children,
  fullWidth = false,
  aside = false,
  sx,
  ...rest
}) {
  return (
    <Box
      as="section"
      sx={{
        paddingY: [3, 4],
        paddingX: fullWidth ? 0 : aside ? 2 : [3, 4],
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function SectionHeader({ children }) {
  return (
    <Box as="header" sx={{ textAlign: "center", marginBottom: [5, 6] }}>
      {children}
    </Box>
  );
}

export function SectionChild({ children }) {
  return <Box>{children}</Box>;
}
