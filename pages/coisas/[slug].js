import Base from "../../ui/templates/Base";
import Hero from "../../ui/components/Hero";
import Section, { SectionChild } from "../../ui/components/Section";
import { Site } from "../../libs";
import MDX from "@mdx-js/runtime";
import { useResponsiveValue } from "@theme-ui/match-media";
import { useEffect, useState } from "react";
import Main from "../../ui/components/Main";
import Header from "../../ui/components/Header";
import Aside from "../../ui/components/Aside";
import Prism from "prismjs";
import CodeLang from "../../ui/components/CodeLang";
import SectionsLinks from "../../ui/components/SectionsLinks";

export default function Post({ site, post }) {
  const [lang, setLang] = useState("javascript");

  useEffect(() => {
    if (post.meta.langs) {
      showCodeBlocks(lang);
    }
  }, [lang]);

  return (
    <Base site={site} title={post.meta.title}>
      <Header>
        <Hero
          full={useResponsiveValue([true, false])}
          title={post.meta.title}
          subtitle={post.meta.description}
        />
      </Header>

      <Aside>
        <CodeLang langs={post.meta.langs} setLang={setLang} settedLang={lang} />
        <SectionsLinks sections={post.meta.sections} />
      </Aside>

      <Main>
        <Section>
          <SectionChild>
            <MDX>{post.content}</MDX>
          </SectionChild>
        </Section>
      </Main>
    </Base>
  );
}

export async function getStaticProps({ params }) {
  const site = Site.site();
  const post = Site.post(params.slug);

  return {
    props: {
      site,
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = Site.postSlugs().map((postSlug) => `/coisas/${postSlug}`);
  return { paths, fallback: false };
}

function showCodeBlocks(lang) {
  const preElements = document.getElementsByTagName("pre");
  if (preElements.length === 0) {
    return;
  }

  for (const pre of preElements) {
    const code = pre.firstElementChild;

    if (code.classList.contains(`language-${lang}`)) {
      Prism.highlightElement(code);
      pre.style.display = "block";
    } else {
      pre.style.display = "none";
    }
  }
}
