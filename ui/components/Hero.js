import { Box, Heading, Text } from "theme-ui";
import Section from "./Section";

export default function Hero({ title, subtitle, sx, full, ...rest }) {
  return (
    <Section
      sx={{
        position: "relative",
        textAlign: "center",
        height: full ? ["80vh", "90vh"] : "60vh",
        display: "flex",
        flexDirection: "collumn",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...rest}
    >
      <Box>
        <Heading as="h1" variant="h1" sx={{ wordBreak: "break-word" }}>
          {title}
        </Heading>

        {subtitle ? (
          <Text as="p" variant="p" sx={{ wordBreak: "break-word" }}>
            {subtitle}
          </Text>
        ) : null}
      </Box>
    </Section>
  );
}
