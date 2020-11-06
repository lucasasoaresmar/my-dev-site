import Head from "next/head";
import { Box } from "theme-ui";

export default function Base({ children, title, site = {} }) {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "auto-fill 35%",
        gridTemplateAreas: [
          `
          'header header'
          'aside aside'
          'main main'
          'footer footer'
        `,
          `
          'header header'
          'aside aside'
          'main main'
          'footer footer'
        `,
          `
          'header header'
          'main aside'
          'footer footer'
        `,
        ],
        "& > .header": {
          gridArea: "header",
        },
        "& > .main": {
          gridArea: "main",
        },
        "& > .aside": {
          gridArea: "aside",
        },
        "& > .footer": {
          gridArea: "footer",
        },
      }}
    >
      <Head>
        <title>{title ? `${title} | ${site.title}` : site.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Box>
  );
}
