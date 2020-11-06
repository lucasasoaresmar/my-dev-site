import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function buildMakeSite() {
  return function ({
    SITE_RELATIVE_PATH = "content/site.md",
    TAGS_RELATIVE_PATH = "content/tags.md",
    POSTS_RELATIVE_PATH = "content/posts",
    FILE_EXTENSION = "md",
  } = {}) {
    function site() {
      const sitePath = path.join(process.cwd(), SITE_RELATIVE_PATH);
      const { data } = matter.read(sitePath);

      return data;
    }

    function tags() {
      const tagsPath = path.join(process.cwd(), TAGS_RELATIVE_PATH);
      const { data } = matter.read(tagsPath);

      return data;
    }

    function post(slug) {
      const postPath = path.join(
        process.cwd(),
        POSTS_RELATIVE_PATH,
        `${slug}.${FILE_EXTENSION}`
      );
      const post = matter.read(postPath);
      const tagsValues = tags();
      const postTags = post.data.tags.map((tag) => tagsValues[tag]);

      return {
        meta: {
          slug,
          ...post.data,
          tags: postTags,
        },
        content: post.content,
      };
    }

    function postSlugs() {
      const slugs = [];
      const postsPath = path.join(process.cwd(), POSTS_RELATIVE_PATH);
      const files = fs.readdirSync(postsPath);

      for (const file of files) {
        const [slug, extension] = file.split(".");

        if (extension === FILE_EXTENSION) {
          slugs.push(slug);
        }
      }

      return slugs;
    }

    function posts() {
      const resolvedPosts = [];

      for (const postSlug of postSlugs()) {
        const resolvedPost = post(postSlug);

        if (resolvedPost.meta && resolvedPost.content) {
          resolvedPosts.push(resolvedPost);
        }
      }

      return resolvedPosts;
    }

    return {
      site,
      tags,
      post,
      postSlugs,
      posts,
    };
  };
}
