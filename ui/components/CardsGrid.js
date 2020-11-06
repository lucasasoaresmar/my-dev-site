import { Grid } from "theme-ui";

export default function CardsGrid({ children }) {
  return (
    <Grid gap={4} columns={[1, 1, 2]}>
      {children}
    </Grid>
  );
}
