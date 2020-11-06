import Base from "../ui/templates/Base";
import { Heading } from "theme-ui";
import Section, { SectionChild, SectionHeader } from "../ui/components/Section";
import PostCard from "../ui/components/PostCard";
import CardsGrid from "../ui/components/CardsGrid";
import Hero from "../ui/components/Hero";
import { Site } from "../libs";
import Header from "../ui/components/Header";
import Main from "../ui/components/Main";

export default function Home({ site, posts }) {
  return (
    <Base site={site}>
      <Header>
        <Hero
          title="👨🏻‍💻 <Dev/>"
          subtitle="É aqui que guardo minhas coisas importantes"
          full
        />
      </Header>

      <Main>
        <Section>
          <SectionHeader>
            <Heading as="h2" variant="h2">
              As Coisas Importantes
            </Heading>
          </SectionHeader>

          <SectionChild>
            <CardsGrid>
              {posts.map((post, index) => (
                <PostCard key={index} post={post.meta} />
              ))}
            </CardsGrid>
          </SectionChild>
        </Section>
      </Main>
    </Base>
  );
}

export function getStaticProps() {
  const site = Site.site();
  const post1 = Site.post("design-patterns");
  const post2 = Site.post("solid");

  return {
    props: {
      site,
      posts: [post1, post2],
    },
  };
}
