import { Badge, Flex } from "theme-ui";
import Hero from "../../ui/components/Hero";
import Base from "../../ui/templates/Base";
import Section, { SectionChild } from "../../ui/components/Section";
import CardsGrid from "../../ui/components/CardsGrid";
import PostCard from "../../ui/components/PostCard";
import { useState } from "react";
import { Site } from "../../libs";
import Main from "../../ui/components/Main";
import Header from "../../ui/components/Header";

export default function EuSei({ site, posts, tags }) {
  const [state, setState] = useState({
    tags,
    filteredPosts: posts,
  });

  function setFilteredPosts(posts) {
    setState({ ...state, filteredPosts: posts });
  }

  function filterPosts(tag) {
    const filteredPosts = posts.filter((post) =>
      post.meta.tags.map((postTag) => postTag.value).includes(tag)
    );

    setFilteredPosts(filteredPosts);
  }

  return (
    <Base site={site} title="Coisas Importantes">
      <Header>
        <Hero title="Desenvolvimento" subtitle="E algumas coisas a mais!" />
      </Header>

      <Main>
        <Section>
          <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
            <Badge
              onClick={() => setFilteredPosts(posts)}
              sx={{ margin: 1, backgroundColor: "gold" }}
            >
              Todos
            </Badge>

            {Object.values(tags).map((tag) => (
              <Badge
                key={tag.value}
                onClick={() => filterPosts(tag.value)}
                sx={{
                  backgroundColor: tag.color,
                  margin: 1,
                  cursor: "pointer",
                }}
              >
                {tag.value}
              </Badge>
            ))}
          </Flex>
        </Section>

        <Section>
          <SectionChild>
            <CardsGrid>
              {state.filteredPosts.map((post, index) => (
                <PostCard key={index} post={post.meta} />
              ))}
            </CardsGrid>
          </SectionChild>
        </Section>
      </Main>
    </Base>
  );
}

export async function getStaticProps() {
  const site = Site.site();
  const posts = Site.posts();
  const tags = Site.tags();

  return {
    props: {
      site,
      posts,
      tags,
    },
  };
}
