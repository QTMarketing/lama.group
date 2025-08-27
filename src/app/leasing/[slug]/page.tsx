'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getPropertyBySlug, addressToString, gated } from '@/lib/property';
import { PropertyDoc } from '@/types/property';
import { PropertyHero } from '@/components/property/PropertyHero';
import { QuickFactsCard } from '@/components/property/QuickFactsCard';
import { Gallery } from '@/components/property/Gallery';
import { FeatureChips } from '@/components/property/FeatureChips';
import { AccordionGroup } from '@/components/property/AccordionGroup';
import { StickyCTA } from '@/components/property/StickyCTA';
import { RelatedProperties } from '@/components/property/RelatedProperties';
import { HeroSkeleton, SectionSkeleton, GallerySkeleton } from '@/components/property/Skeletons';
import { MapPin, Building2, Wifi, Car, Utensils, Shield, Zap, Droplets, Snowflake } from 'lucide-react';
import { testFirebaseConnection } from '@/lib/firebase';

export const dynamic = "force-static";

export default function PropertyDetailPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<PropertyDoc | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const slug = params?.slug as string;

  // Check if user is authenticated
  const isAuthenticated = status === 'authenticated' && session;

  useEffect(() => {
    const checkFirebaseAndFetchProperty = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // First, test Firebase connection
        const isFirebaseOnline = await testFirebaseConnection();
        setFirebaseStatus(isFirebaseOnline ? 'online' : 'offline');
        
        if (isFirebaseOnline) {
          // Try to fetch from Firebase
          const propertyData = await getPropertyBySlug(slug);
          if (propertyData) {
            setProperty(propertyData);
            return;
          }
        }
        
        // If Firebase is offline or no data found, use fallback
        console.log('Using fallback property data');
        const fallbackProperty = createFallbackProperty(slug);
        if (fallbackProperty) {
          setProperty(fallbackProperty);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error in property fetching flow:', error);
        // Use fallback property
        const fallbackProperty = createFallbackProperty(slug);
        if (fallbackProperty) {
          setProperty(fallbackProperty);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    checkFirebaseAndFetchProperty();
  }, [slug]);

  // Create fallback property for testing when Firestore doesn't have data
  const createFallbackProperty = (slug: string): PropertyDoc | null => {
    // Map of known slugs to property data
    const fallbackProperties: Record<string, PropertyDoc> = {
      '1001-s-morgan-st-granbury': {
        slug: '1001-s-morgan-st-granbury',
        title: '1001 S. Morgan St Granbury, TX 76048',
        type: 'buy',
        status: 'available',
        heroImage: 'https://via.placeholder.co/1600x900/FF8800/FFFFFF?text=Property+Image',
        gallery: [
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+1',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+2',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+3'
        ],
        price: 650000,
        priceNote: 'For Sale',
        location: {
          addressLine: '1001 S. Morgan St',
          city: 'Granbury',
          state: 'TX',
          country: 'USA',
          postalCode: '76048'
        },
        quickFacts: [
          { label: 'Size', value: '0.31 acres' },
          { label: 'Type', value: 'Commercial Land' },
          { label: 'Zoning', value: 'Commercial' },
          { label: 'Status', value: 'Available' }
        ],
        highlights: [
          'Prime commercial location',
          'High visibility',
          'Easy access to major roads',
          'Ideal for retail or office development'
        ],
        amenities: ['Utilities Available', 'Paved Access', 'Commercial Zoning', 'High Traffic Area'],
        overview: 'Prime commercial land in Granbury, TX with excellent visibility and access. This 0.31-acre property is ideally suited for commercial development with its strategic location and commercial zoning.',
        details: [
          { heading: 'Location', body: 'Located on S. Morgan St with excellent visibility and easy access to major thoroughfares.' },
          { heading: 'Zoning', body: 'Commercial zoning allows for various business uses including retail, office, and service businesses.' }
        ],
        houseRules: ['Commercial use only', 'Comply with city building codes', 'Proper permits required'],
        faqs: [
          { q: 'What can I build on this property?', a: 'Commercial buildings including retail, office, and service businesses are permitted.' },
          { q: 'Are utilities available?', a: 'Yes, utilities are available at the street level.' }
        ],
        contact: { email: 'susanna@quicktrackinc.com', phone: '817.618.0424' },
        isFeatured: true
      },
      '6806-sanger-ave-waco': {
        slug: '6806-sanger-ave-waco',
        title: '6806 Sanger Ave, Waco TX 76710',
        type: 'lease',
        status: 'available',
        heroImage: 'https://via.placeholder.co/1600x900/FF8800/FFFFFF?text=Property+Image',
        gallery: [
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+1',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+2',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+3'
        ],
        price: 1650,
        priceNote: 'Per month',
        location: {
          addressLine: '6806 Sanger Ave',
          city: 'Waco',
          state: 'TX',
          country: 'USA',
          postalCode: '76710'
        },
        quickFacts: [
          { label: 'Size', value: '1,800 sq ft' },
          { label: 'Type', value: 'Commercial Space' },
          { label: 'Lease Term', value: '1-3 years' },
          { label: 'Status', value: 'Available' }
        ],
        highlights: [
          'High traffic location',
          'Ample parking',
          'Flexible lease terms',
          'Ready for immediate occupancy'
        ],
        amenities: ['HVAC', 'Parking', 'Security System', 'Loading Dock'],
        overview: 'Prime commercial space in Waco, TX with excellent visibility and high traffic counts. This 1,800 sq ft space is perfect for retail, office, or service businesses.',
        details: [
          { heading: 'Space Details', body: '1,800 square feet of commercial space with high ceilings and flexible layout options.' },
          { heading: 'Parking', body: 'Ample parking available for customers and employees.' }
        ],
        houseRules: ['Commercial use only', 'No hazardous materials', 'Proper insurance required'],
        faqs: [
          { q: 'What is the lease term?', a: 'Flexible lease terms from 1-3 years are available.' },
          { q: 'Is parking included?', a: 'Yes, parking is included with the lease.' }
        ],
        contact: { email: 'susanna@quicktrackinc.com', phone: '817.618.0424' },
        isFeatured: true
      },
      '403-s-greer-blvd-pitsburg': {
        slug: '403-s-greer-blvd-pitsburg',
        title: '403 S Greer Blvd, Pitsburg, TX 75686',
        type: 'buy',
        status: 'available',
        heroImage: 'https://via.placeholder.co/1600x900/FF8800/FFFFFF?text=Property+Image',
        gallery: [
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+1',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+2',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+3'
        ],
        price: 800000,
        priceNote: 'For Sale',
        location: {
          addressLine: '403 S Greer Blvd',
          city: 'Pitsburg',
          state: 'TX',
          country: 'USA',
          postalCode: '75686'
        },
        quickFacts: [
          { label: 'Size', value: '0.50 acres' },
          { label: 'Type', value: 'Commercial Land' },
          { label: 'Zoning', value: 'Commercial' },
          { label: 'Status', value: 'Available' }
        ],
        highlights: [
          'Prime commercial location',
          'High visibility on Greer Blvd',
          'Easy access to major roads',
          'Ideal for retail or office development'
        ],
        amenities: ['Utilities Available', 'Paved Access', 'Commercial Zoning', 'High Traffic Area'],
        overview: 'Excellent commercial land opportunity in Pitsburg, TX. This 0.50-acre property offers high visibility on S Greer Blvd with commercial zoning, making it perfect for various business developments.',
        details: [
          { heading: 'Location', body: 'Located on S Greer Blvd with excellent visibility and easy access to major thoroughfares in Pitsburg.' },
          { heading: 'Zoning', body: 'Commercial zoning allows for various business uses including retail, office, and service businesses.' }
        ],
        houseRules: ['Commercial use only', 'Comply with city building codes', 'Proper permits required'],
        faqs: [
          { q: 'What can I build on this property?', a: 'Commercial buildings including retail, office, and service businesses are permitted.' },
          { q: 'Are utilities available?', a: 'Yes, utilities are available at the street level.' }
        ],
        contact: { email: 'susanna@quicktrackinc.com', phone: '817.618.0424' },
        isFeatured: true
      },
      '4113-mansfield-hwy-fort-worth': {
        slug: '4113-mansfield-hwy-fort-worth',
        title: '4113 Mansfield Hwy, Fort Worth, TX 76119',
        type: 'buy',
        status: 'available',
        heroImage: 'https://via.placeholder.co/1600x900/FF8800/FFFFFF?text=Property+Image',
        gallery: [
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+1',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+2',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+3'
        ],
        price: 700000,
        priceNote: 'For Sale',
        location: {
          addressLine: '4113 Mansfield Hwy',
          city: 'Fort Worth',
          state: 'TX',
          country: 'USA',
          postalCode: '76119'
        },
        quickFacts: [
          { label: 'Size', value: '1.30 acres' },
          { label: 'Type', value: 'Commercial Land' },
          { label: 'Zoning', value: 'Commercial' },
          { label: 'Status', value: 'Available' }
        ],
        highlights: [
          'Highway frontage on Mansfield Hwy',
          'Excellent visibility',
          'Heavy traffic counts',
          'Ideal for retail or restaurant'
        ],
        amenities: ['Highway Access', 'Utilities Available', 'Commercial Zoning', 'High Traffic Area'],
        overview: 'Prime commercial property with highway frontage on Mansfield Hwy in Fort Worth. This 1.30-acre site offers excellent visibility and high traffic counts, perfect for retail or restaurant development.',
        details: [
          { heading: 'Highway Access', body: 'Direct access to Mansfield Hwy with excellent visibility for passing traffic.' },
          { heading: 'Development Potential', body: 'Large enough for standalone retail or restaurant with parking.' }
        ],
        houseRules: ['Commercial use only', 'Comply with highway access regulations', 'Proper permits required'],
        faqs: [
          { q: 'What can I build on this property?', a: 'Commercial buildings including retail, restaurants, and service businesses are permitted.' },
          { q: 'Is highway access available?', a: 'Yes, direct access to Mansfield Hwy is available.' }
        ],
        contact: { email: 'susanna@quicktrackinc.com', phone: '817.618.0424' },
        isFeatured: true
      },
      '2606-victory-dr-marshall': {
        slug: '2606-victory-dr-marshall',
        title: '2606 Victory Dr., Marshall, TX 75672',
        type: 'lease',
        status: 'available',
        heroImage: 'https://via.placeholder.co/1600x900/FF8800/FFFFFF?text=Property+Image',
        gallery: [
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+1',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+2',
          'https://via.placeholder.co/1200x800/FF8800/FFFFFF?text=Image+3'
        ],
        price: 1275,
        priceNote: 'Per month',
        location: {
          addressLine: '2606 Victory Dr.',
          city: 'Marshall',
          state: 'TX',
          country: 'USA',
          postalCode: '75672'
        },
        quickFacts: [
          { label: 'Size', value: '1,392 sq ft' },
          { label: 'Type', value: 'Commercial Space' },
          { label: 'Lease Term', value: '1-3 years' },
          { label: 'Status', value: 'Available' }
        ],
        highlights: [
          'Prime location on Victory Dr',
          'High visibility',
          'Ample parking',
          'Ready for immediate occupancy'
        ],
        amenities: ['HVAC', 'Parking', 'Security System', 'High Visibility'],
        overview: 'Excellent commercial space in Marshall, TX with high visibility on Victory Dr. This 1,392 sq ft space is perfect for retail, office, or service businesses.',
        details: [
          { heading: 'Space Details', body: '1,392 square feet of commercial space with high ceilings and flexible layout options.' },
          { heading: 'Location', body: 'High visibility location on Victory Dr with easy access for customers.' }
        ],
        houseRules: ['Commercial use only', 'No hazardous materials', 'Proper insurance required'],
        faqs: [
          { q: 'What is the lease term?', a: 'Flexible lease terms from 1-3 years are available.' },
          { q: 'Is parking included?', a: 'Yes, parking is included with the lease.' }
        ],
        contact: { email: 'susanna@quicktrackinc.com', phone: '817.618.0424' },
        isFeatured: true
      }
    };

    return fallbackProperties[slug] || null;
  };

  // Loading state
  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSkeleton />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <SectionSkeleton />
              <SectionSkeleton />
              <GallerySkeleton />
            </div>
            <div className="lg:col-span-4">
              <SectionSkeleton />
            </div>
          </div>
        </div>
        
        {/* Firebase Status Indicator */}
        {firebaseStatus === 'offline' && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium">Using offline data</span>
            </div>
          </div>
        )}
      </>
    );
  }

  // Not found state
  if (notFound || !property) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <a
            href="/store-leasing"
            className="bg-[#FF8800] hover:bg-[#FF6600] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Back to Properties
          </a>
        </div>
      </div>
    );
  }

  const locationLine = addressToString(property.location);
  const isGated = gated(Boolean(isAuthenticated));

  // Icon mapping for amenities
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('hvac') || lowerAmenity.includes('ac')) return <Snowflake className="w-4 h-4" />;
    if (lowerAmenity.includes('grease') || lowerAmenity.includes('trap')) return <Droplets className="w-4 h-4" />;
    if (lowerAmenity.includes('security')) return <Shield className="w-4 h-4" />;
    if (lowerAmenity.includes('drive') || lowerAmenity.includes('thru')) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('food')) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes('power') || lowerAmenity.includes('electrical')) return <Zap className="w-4 h-4" />;
    return <Building2 className="w-4 h-4" />;
  };

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyHero
          title={property.title}
          locationLine={locationLine}
          status={property.status}
          heroImage={property.heroImage}
          type={property.type}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Firebase Status Banner */}
        {firebaseStatus === 'offline' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Firebase Offline</h3>
                <p className="text-sm text-yellow-700">Showing fallback property data. Some features may be limited.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Section */}
            {property.overview && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
                <div className="prose prose-gray max-w-none">
                  {property.overview.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Highlights Section */}
            {property.highlights && property.highlights.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Highlights</h2>
                <FeatureChips items={property.highlights} />
              </section>
            )}

            {/* Gallery Section */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>
              <Gallery images={property.gallery} />
            </section>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-[#FF8800]">{getAmenityIcon(amenity)}</span>
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Map & Area Section */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Map & Area</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#FF8800]" />
                  <span className="font-medium">{locationLine}</span>
                </div>
                
                {property.location.lat && property.location.lng && (
                  <a
                    href={`https://www.google.com/maps?q=${property.location.lat},${property.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FF8800] hover:text-[#FF6600] font-medium transition-colors"
                  >
                    View on Google Maps
                    <span className="text-sm">↗</span>
                  </a>
                )}
                
                {/* Map Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs & Rules Section */}
            {(property.details || property.houseRules || property.faqs) && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Details & Information</h2>
                <AccordionGroup
                  details={property.details}
                  houseRules={property.houseRules}
                  faqs={property.faqs}
                />
              </section>
            )}

            {/* Related Properties Section */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <RelatedProperties
                items={[
                  // TODO: Replace with actual related properties from Firestore
                  {
                    slug: 'sample-property-1',
                    title: 'Sample Property 1',
                    heroImage: undefined,
                    location: { city: 'Dallas', state: 'TX' }
                  },
                  {
                    slug: 'sample-property-2',
                    title: 'Sample Property 2',
                    heroImage: undefined,
                    location: { city: 'Fort Worth', state: 'TX' }
                  }
                ]}
              />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <QuickFactsCard
              facts={property.quickFacts || []}
              gated={isGated}
              price={property.price}
              priceNote={property.priceNote}
              contact={property.contact}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky CTA */}
      <StickyCTA gated={isGated} price={property.price} />
    </>
  );
}

/*
SAMPLE DATA FOR FIREBASE CONSOLE:
{
  "slug": "lama-dallas-i-35-store",
  "title": "LaMa Dallas – I-35 Corner Store",
  "type": "lease",
  "status": "available",
  "heroImage": "https://via.placeholder.co/1600x900",
  "gallery": [
    "https://via.placeholder.co/1200x800",
    "https://via.placeholder.co/1200x800",
    "https://via.placeholder.co/1200x800"
  ],
  "price": 6500,
  "priceNote": "Per month, triple net",
  "location": {
    "addressLine": "123 Commerce Ave",
    "city": "Dallas",
    "state": "TX",
    "country": "USA",
    "postalCode": "75201",
    "lat": 32.7767,
    "lng": -96.7970
  },
  "quickFacts": [
    {"label": "Size", "value": "3,200 sq ft"},
    {"label": "Frontage", "value": "I-35 visibility"},
    {"label": "Parking", "value": "18 spaces"},
    {"label": "Lease Term", "value": "3–5 years"}
  ],
  "highlights": [
    "High traffic counts",
    "Corner lot exposure",
    "Walk-in cooler ready",
    "Ideal for QSR or C-store"
  ],
  "amenities": ["HVAC", "Grease Trap", "Security System", "Drive-Thru Ready"],
  "overview": "Prime corner c-store site with excellent visibility on I-35. Recently upgraded power and HVAC. Ideal for convenience retail or quick service food concepts.",
  "details": [
    {"heading": "Utilities", "body": "3-phase power, gas, water/sewer available."},
    {"heading": "Zoning", "body": "Commercial retail (CR). Verify with city."}
  ],
  "houseRules": ["No hazardous storage", "Signage per city code"],
  "faqs": [
    {"q": "Is the lease flexible?", "a": "Standard term is 3–5 years; owner open to discussion."}
  ],
  "contact": {"email": "leasing@lamagroup.com", "phone": "+1 (555) 010-2025"},
  "isFeatured": true
}
*/ 