export const PROPERTY_DETAIL_FREE = /* GraphQL */ `
  query PropertyDetail($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      id
      databaseId
      propertyId
      title
      slug
      content
      featuredImage { node { sourceUrl altText } }
      dealTypes { nodes { slug name } }
      regions { nodes { slug name } }
      price
      priceVisibility
      contactName
      contactPhone
      contactEmail
      contactVisibility
    }
  }
`;
