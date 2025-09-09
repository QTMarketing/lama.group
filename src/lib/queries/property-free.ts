// Detail query
export const PROPERTY_BY_SLUG_FREE = /* GraphQL */ `
  query PropertyBySlug($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      featuredImage { node { sourceUrl altText } }
      dealTypes { nodes { slug name } }
      regions   { nodes { slug name } }
      price
      priceVisibility
      contactName contactPhone contactEmail contactVisibility
      highlightsText
      acf: propertyFields {
        address city state zip
        sizeacres sizesqft
        price
        pricevisibility
        contactname contactphone contactemail contactvisibility
        highlightstext
        heroimage { sourceUrl altText }
        galleryimage1 { sourceUrl altText }
        galleryimage2 { sourceUrl altText }
        galleryimage3 { sourceUrl altText }
      }
    }
  }
`;

// Listing with server-side taxonomy filtering (Tax Query)
export const LIST_PROPERTIES_TAX_FREE = /* GraphQL */ `
  query ListProperties(
    $first: Int! = 24,
    $after: String,
    $search: String
  ) {
    properties(
      first: $first
      after: $after
      where: {
        search: $search
        orderby: [{ field: DATE, order: DESC }]
      }
    ) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id slug title
        featuredImage { node { sourceUrl altText } }
        dealTypes { nodes { slug name } }
        regions   { nodes { slug name } }
        price priceVisibility
        contactName contactPhone contactEmail contactVisibility
        acf: propertyFields {
          address city state zip
          sizeacres sizesqft price pricevisibility
          contactname contactphone contactemail contactvisibility
          heroimage { sourceUrl altText }
        }
      }
    }
  }
`;

// Taxonomy terms for filter dropdowns
export const TAXONOMY_TERMS = /* GraphQL */ `
  query TaxTerms {
    dealTypes(first: 50) { nodes { name slug count } }
    regions(first: 100)  { nodes { name slug count } }
  }
`;
