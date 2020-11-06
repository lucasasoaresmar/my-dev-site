import { Link, NavLink, Text } from "theme-ui";
import Section, { SectionChild, SectionHeader } from "./Section";

export default function SectionsLinks({ sections }) {
  if (!sections) {
    return null;
  }

  return (
    <Section aside>
      <SectionChild>
        <Text as="p" variant="p">
          Nessa Página
        </Text>

        <ul>
          {sections.map((section, index) => (
            <li key={index}>
              <NavLink href={`#${section.link}`}>{section.name}</NavLink>
            </li>
          ))}
        </ul>
      </SectionChild>
    </Section>
  );
}
