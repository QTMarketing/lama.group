export type PropertyType = "buy" | "lease";

export interface PropertyDoc {
  slug: string;                 // doc id
  title: string;
  type: PropertyType;           // "lease" for this page
  status?: "available" | "sold" | "under-offer" | "coming-soon";
  heroImage?: string;           // storage URL or https
  gallery?: string[];           // array of image URLs
  price?: number;               // optional; gate if missing or user logged out
  priceNote?: string;           // e.g., "Plus NNN", "Ask for seasonal"
  location: {
    addressLine?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
  };
  quickFacts?: Array<{ label: string; value: string }>;
  highlights?: string[];        // short bullets (feature tags)
  amenities?: string[];         // iconifiable items
  overview?: string;            // rich text (render as paragraphs)
  details?: Array<{ heading: string; body: string }>;
  houseRules?: string[];
  faqs?: Array<{ q: string; a: string }>;
  contact?: { email?: string; phone?: string };
  createdAt?: any;
  updatedAt?: any;
  isFeatured?: boolean;
} 