export const PROPERTY_CARD_FRAGMENT = `
  fragment PropertyCard on Property {
    id
    slug
    title
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    dealTypes {
      nodes {
        slug
        name
      }
    }
    regions {
      nodes {
        slug
        name
      }
    }
    acf: propertyFields {
      address
      city
      state
      zip
      sizeAcres
      price
      priceVisibility
    }
  }
`;

export const LIST_PROPERTIES = `
  ${PROPERTY_CARD_FRAGMENT}
  query ListProperties(
    $first: Int! = 12
    $after: String
    $search: String
    $dealType: [String] = []
    $regions: [String] = []
    $orderBy: [PostObjectsConnectionOrderbyInput!] = [{ field: DATE, order: DESC }]
  ) {
    properties(
      first: $first
      after: $after
      where: {
        search: $search
        taxQuery: {
          relation: AND
          taxArray: [
            { taxonomy: DEALTYPE, terms: $dealType, field: SLUG, operator: IN }
            { taxonomy: REGION, terms: $regions, field: SLUG, operator: IN }
          ]
        }
        orderby: $orderBy
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PropertyCard
      }
    }
  }
`;

export const PROPERTY_BY_SLUG = `
  query PropertyBySlug($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      dealTypes {
        nodes {
          slug
          name
        }
      }
      acf: propertyFields {
        address
        city
        state
        zip
        sizeAcres
        price
        priceVisibility
        highlights
        gallery {
          sourceUrl
          altText
        }
        contactName
        contactPhone
        contactEmail
        contactVisibility
      }
      regions {
        nodes {
          name
          slug
        }
      }
      propertyType {
        nodes {
          name
          slug
        }
      }
      status {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
