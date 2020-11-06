import { Button, Flex } from "theme-ui";
import Section, { SectionChild } from "./Section";

export default function CodeLang({ setLang, langs, settedLang }) {
  if (!langs) {
    return null;
  }

  return (
    <Section aside>
      <SectionChild>
        <Flex
          sx={{
            flexWrap: "wrap",
          }}
        >
          {langs.map((lang, index) => (
            <Button
              key={index}
              onClick={() => setLang(lang)}
              sx={{ margin: 1 }}
              variant={settedLang === lang ? "primary" : "muted"}
            >
              {lang}
            </Button>
          ))}
        </Flex>
      </SectionChild>
    </Section>
  );
}
