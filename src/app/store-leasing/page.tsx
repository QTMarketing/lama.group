'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageTemplate } from '@/components/templates/PageTemplate';

// Property data
const propertyData = {
  forSale: [
    { id: 1, slug: '1001-s-morgan-st-granbury', address: '1001 S. Morgan St Granbury, TX 76048', size: '0.31 acres', price: 650000, type: 'For Sale', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 2, slug: '403-s-greer-blvd-pitsburg', address: '403 S Greer Blvd, Pitsburg, TX 75686', size: '0.50 acres', price: 800000, type: 'For Sale', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 3, slug: '4113-mansfield-hwy-fort-worth', address: '4113 Mansfield Hwy, Fort Worth, TX 76119', size: '1.30 acres', price: 700000, type: 'For Sale', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 4, slug: '704-bonham-st-paris', address: '704 Bonham St., Paris, TX 75460', size: '0.28 acres', price: 400000, type: 'For Sale', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 5, slug: '3105-3145-lackland-rd-fort-worth', address: '3105 - 3145 Lackland Rd., Fort Worth, TX 76116', size: '2.04 acres', price: 2100000, type: 'For Sale', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' }
  ],
  forLease: [
    { id: 6, slug: '2606-victory-dr-marshall', address: '2606 Victory Dr., Marshall, TX 75672', size: '1392 sq. ft', price: 1275, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 7, slug: '6806-sanger-ave-waco', address: '6806 Sanger Ave, Waco TX 76710', size: '1800 sq. ft.', price: 1650, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 8, slug: '6808-sanger-ave-waco', address: '6808 Sanger Ave, Waco TX 76710', size: '960 sq. ft.', price: 880, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 9, slug: '6816-sanger-ave-waco', address: '6816 Sanger Ave, Waco TX 76710', size: '1200 sq. ft.', price: 1100, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 10, slug: '6828-sanger-ave-waco', address: '6828 Sanger Ave, Waco TX 76710', size: '1400 sq. ft.', price: 1285, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 11, slug: '8533-camp-bowie-w-fort-worth', address: '8533 Camp Bowie W, Fort Worth, TX 76116', size: '1300 sq. ft.', price: 1195, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 12, slug: '8545-camp-bowie-w-fort-worth', address: '8545 Camp Bowie W, Fort Worth, TX 76116', size: '800 sq. ft.', price: 1000, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 13, slug: '3421-cimarron-trail-suite-105-fort-worth', address: '3421 Cimarron Trail Suite 105, Fort Worth, TX 76116', size: '2000 sq. ft.', price: 1850, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' },
    { id: 14, slug: '3421-cimmaron-trail-suite-117-fort-worth', address: '3421 Cimmaron Trail Suite 117, Fort Worth, TX 76116', size: '3300 sq. ft.', price: 3025, type: 'For Lease', contact: '817.618.0424', email: 'susanna@quicktrackinc.com' }
  ]
};



export default function StoreLeasingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [region, setRegion] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Combine all properties
  const allProperties = useMemo(() => [...propertyData.forSale, ...propertyData.forLease], []);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = allProperties.filter(property => {
      // Search filter
      const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Property type filter
      const matchesType = propertyType === 'all' || property.type === propertyType;
      
      // Region filter
      let matchesRegion = true;
      if (region !== 'all') {
        if (region === 'fort-worth') {
          matchesRegion = property.address.toLowerCase().includes('fort worth');
        } else if (region === 'waco') {
          matchesRegion = property.address.toLowerCase().includes('waco');
        } else if (region === 'granbury') {
          matchesRegion = property.address.toLowerCase().includes('granbury');
        } else if (region === 'paris') {
          matchesRegion = property.address.toLowerCase().includes('paris');
        } else if (region === 'marshall') {
          matchesRegion = property.address.toLowerCase().includes('marshall');
        } else if (region === 'pitsburg') {
          matchesRegion = property.address.toLowerCase().includes('pitsburg');
        }
      }
      
      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          matchesPrice = property.price >= min && property.price <= max;
        } else {
          matchesPrice = property.price >= min;
        }
      }
      
      // Size filter
      let matchesSize = true;
      if (sizeFilter !== 'all') {
        if (sizeFilter === 'small' && property.type === 'For Lease') {
          matchesSize = parseInt(property.size) <= 1200;
        } else if (sizeFilter === 'medium' && property.type === 'For Lease') {
          matchesSize = parseInt(property.size) > 1200 && parseInt(property.size) <= 2000;
        } else if (sizeFilter === 'large' && property.type === 'For Lease') {
          matchesSize = parseInt(property.size) > 2000;
        } else if (sizeFilter === 'small-acre' && property.type === 'For Sale') {
          matchesSize = parseFloat(property.size) <= 0.5;
        } else if (sizeFilter === 'large-acre' && property.type === 'For Sale') {
          matchesSize = parseFloat(property.size) > 0.5;
        }
      }
      
      return matchesSearch && matchesType && matchesRegion && matchesPrice && matchesSize;
    });

    // Sort properties
    switch (sortBy) {
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'for-sale':
        filtered = filtered.filter(p => p.type === 'For Sale');
        break;
      case 'for-lease':
        filtered = filtered.filter(p => p.type === 'For Lease');
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [searchTerm, propertyType, region, priceRange, sizeFilter, sortBy, allProperties]);

  const formatPrice = (price: number, type: string) => {
    if (type === 'For Sale') {
      return `$${price.toLocaleString()}.00`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPropertyType('all');
    setRegion('all');
    setPriceRange('all');
    setSizeFilter('all');
    setSortBy('default');
  };

  return (
    <PageTemplate>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 lg:mb-10">
            Find Your Ideal Property to Buy or Lease
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover prime commercial properties across Texas with LaMa Group&apos;s comprehensive real estate solutions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Responsive Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12 lg:mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center lg:text-left">Property Filters</h3>
          
          {/* Property Type Toggle Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center sm:text-left">Property Type</label>
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setPropertyType('all')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    propertyType === 'all'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Properties
                </button>
                <button
                  onClick={() => setPropertyType('For Sale')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    propertyType === 'For Sale'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  For Sale
                </button>
                <button
                  onClick={() => setPropertyType('For Lease')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    propertyType === 'For Lease'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  For Lease
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns - Horizontal on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Regions</option>
                <option value="fort-worth">Fort Worth</option>
                <option value="waco">Waco</option>
                <option value="granbury">Granbury</option>
                <option value="paris">Paris</option>
                <option value="marshall">Marshall</option>
                <option value="pitsburg">Pitsburg</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Prices</option>
                <option value="0-1000000">Under $1M</option>
                <option value="1000000-2000000">$1M - $2M</option>
                <option value="2000000-999999999">Over $2M</option>
                <option value="0-1500">Under $1,500/month</option>
                <option value="1500-3000">$1,500 - $3,000/month</option>
                <option value="3000-999999999">Over $3,000/month</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (≤1200 sq ft / ≤0.5 acres)</option>
                <option value="medium">Medium (1200-2000 sq ft)</option>
                <option value="large">Large (&gt;2000 sq ft / &gt;0.5 acres)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="default">Default Order</option>
                <option value="price-high-low">Sort by Price High to Low</option>
                <option value="price-low-high">Sort by Price Low to High</option>
                <option value="for-sale">Sort by For Sale</option>
                <option value="for-lease">Sort by For Lease</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
            <input
              type="text"
              placeholder="Search by address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {}} // Filters are applied automatically
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Search
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Reset
            </button>
          </div>

          {/* Results Count */}
          <div className="pt-6 border-t border-gray-200 mt-8">
            <p className="text-sm text-gray-600 text-center">
              Showing <span className="font-semibold">{filteredProperties.length}</span> of <span className="font-semibold">{allProperties.length}</span> properties
            </p>
          </div>
        </div>

        {/* Property Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 justify-items-center">
              {filteredProperties.map((property) => (
                <Link 
                  key={property.id}
                  href={`/leasing/${property.slug}`}
                  className="block group"
                >
                  <div 
                    className="w-[384px] h-auto min-h-[498.95px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#FF8800] group-hover:shadow-2xl"
                  >
                  {/* Image Placeholder */}
                  <div className="w-[384px] h-[218.65px] bg-gray-200 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-sm text-gray-600 font-medium">Property Image</p>
                        <p className="text-xs text-gray-500">384 × 218.65</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6 flex flex-col justify-between min-h-[280.3px]">
                    {/* Top Section */}
                    <div>
                      {/* Property Type Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                          property.type === 'For Sale' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {property.type}
                        </span>
                      </div>
                      
                      {/* Address */}
                      <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight line-clamp-3 min-h-[4.5rem]">
                        {property.address}
                      </h3>
                      
                      {/* Size and Price */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">Size:</span>
                          <span className="ml-1 break-words">{property.size}</span>
                        </div>
                        
                        <div className="text-xl font-bold text-gray-900">
                          {formatPrice(property.price, property.type)}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Contact Information */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div className="flex items-start text-sm text-gray-600">
                          <svg className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium">Contact:</span>
                            <span className="ml-1 break-words">{property.contact}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start text-sm text-gray-600">
                          <svg className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium">Email:</span>
                            <span className="ml-1 text-blue-600 font-medium break-all">
                              {property.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}

              {filteredProperties.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 mb-6">
                    <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No properties found</h3>
                  <p className="text-gray-500 text-lg">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
        </div>

    </PageTemplate>
  );
} 