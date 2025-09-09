export const PROPERTY_DETAIL_FREE = /* GraphQL */ `
  query PropertyDetail($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      featuredImage { node { sourceUrl altText } }
      dealTypes { nodes { slug name } }
      regions { nodes { slug name } }
      acf {
        address city state zip
        sizeacres sizesqft
        price
        pricevisibility
        contactname contactphone contactemail contactvisibility
        highlightstext
        amenitiestext
        propertytype
        zoning
        status
        mapaddress
        mapembedurl
        heroimage { sourceUrl altText }
        galleryimage1 { sourceUrl altText }
        galleryimage2 { sourceUrl altText }
        galleryimage3 { sourceUrl altText }
      }
    }
  }
`;
