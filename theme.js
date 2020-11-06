const colors = {
  text: "#000",
  background: "#fff",
  primary: "#07c",
  secondary: "#30c",
  muted: "#f6f6f6",
  card: "#fff",
  shadow: "#e8e8e8",
};

const text = {
  color: "text",
  fontFamily: "body",
  fontWeight: "body",
  lineHeight: "body",
  fontSize: 4,
};

const link = {
  ...text,
  cursor: "pointer",
  color: "primary",
  "&:hover": {
    color: "secondary",
  },
};

const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const headings = {
  h1: {
    ...heading,
    fontSize: 7,
  },
  h2: {
    ...heading,
    fontSize: 6,
  },
  h3: {
    ...heading,
    fontSize: 5,
  },
  h4: {
    ...heading,
    fontSize: 2,
  },
  h5: {
    ...heading,
    fontSize: 1,
  },
  h6: {
    ...heading,
    fontSize: 0,
  },
};

export const base = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    // monospace: "Menlo, monospace",
    code:
      "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  text: {
    p: text,
    link,
    bold: {
      ...text,
      fontWeight: "bold",
    },
    subtitle: {
      ...text,
    },
    ...headings,
  },
  buttons: {
    muted: {
      color: "text",
      backgroundColor: "muted",
      border: "2px solid #dedede",
    },
  },
  links: {
    nav: link,
  },
  cards: {
    post: {
      backgroundColor: "card",
      borderRadius: "5px",
      paddingX: 4,
      paddingY: 3,
      boxShadow: `4px 3px 8px ${colors.shadow}`,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    ...headings,
    p: text,
    a: link,
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "code",
      fontSize: "inherit",
      background: "#fafafa",
      borderRadius: "5px",
      padding: "0.75rem",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};

export default base;
