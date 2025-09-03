// Home section (featured)
export const FEATURED_POSTS = /* GraphQL */ `
  query FeaturedPosts($first: Int! = 6) {
    posts(first: $first, where: { categoryName: "featured", orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name avatar { url } } }
      }
    }
  }
`;

// Home fallback or "latest"
export const HOME_POSTS = /* GraphQL */ `
  query HomePosts($first: Int! = 6) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name avatar { url } } }
      }
    }
  }
`;

// Blog index with pagination using cursors
export const POSTS_INDEX_PAGED = /* GraphQL */ `
  query PostsIndexPaged($first: Int! = 9, $after: String, $before: String, $last: Int) {
    posts(
      first: $first
      after: $after
      before: $before
      last: $last
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name avatar { url } } }
      }
    }
  }
`;

// Post detail (+ databaseId to exclude in related)
export const POST_BY_SLUG = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      date
      content
      excerpt
      featuredImage { node { sourceUrl altText } }
      categories { nodes { name slug } }
      author { node { name description avatar { url } } }
    }
  }
`;

// Related posts: same category, exclude current post
export const RELATED_POSTS = /* GraphQL */ `
  query RelatedPosts($first: Int! = 3, $category: String!, $exclude: [ID] = []) {
    posts(first: $first, where: {
      categoryName: $category
      orderby: { field: DATE, order: DESC }
      notIn: $exclude
    }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
        author { node { name avatar { url } } }
        categories { nodes { name slug } }
      }
    }
  }
`;
