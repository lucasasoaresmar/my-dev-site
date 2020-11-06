import NextLink from "next/link";
import { Badge, Card, Flex, Heading, Link, Text } from "theme-ui";

const MAX_DESCRIPTION_LENGTH = 60;

export default function PostCard({ post }) {
  return (
    <Card as="article" variant="post">
      <NextLink href={`/coisas/${post.slug}`}>
        <Link>
          <Tags tags={post.tags} />
          <Heading as="h3" variant="h3" sx={{ marginBottom: 3 }}>
            {post.title}
          </Heading>

          <Text as="p" variant="p">
            {post.description.length > MAX_DESCRIPTION_LENGTH
              ? post.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
              : post.description}
          </Text>

          <Text as="p" variant="link" sx={{ textAlign: "right" }}>
            Ver &rarr;
          </Text>
        </Link>
      </NextLink>
    </Card>
  );
}

export function Tags({ tags = null }) {
  return tags ? (
    <Flex sx={{ flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Badge
          sx={{ marginRight: 2, backgroundColor: tag.color }}
          key={tag.value}
        >
          {tag.value}
        </Badge>
      ))}
    </Flex>
  ) : null;
}
