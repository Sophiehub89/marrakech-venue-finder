import { type Venue, type SupportedLanguage } from '@/types/venue';

export const generateVenueStructuredData = (venue: Venue, language: SupportedLanguage) => {
  const translation = venue.translations[language];
  const seoData = venue.seoMetadata[language];

  return {
    "@context": "https://schema.org",
    "@type": "WeddingVenue",
    "name": translation.name,
    "description": translation.description,
    "url": venue.site,
    "telephone": venue.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.full_address,
      "addressLocality": venue.city,
      "addressCountry": "MA"
    },
    "geo": venue.coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": venue.coordinates.lat,
      "longitude": venue.coordinates.lng
    } : undefined,
    "image": [venue.photo, ...(venue.gallery || [])],
    "priceRange": venue.prices,
    "aggregateRating": venue.reviews > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.reviews,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "amenityFeature": venue.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "maximumAttendeeCapacity": venue.capacity?.max,
    "minimumAttendeeCapacity": venue.capacity?.min,
    "openingHours": venue.working_hours !== "Not specified" ? venue.working_hours : undefined,
    "hasMap": venue.location_link !== "#" ? venue.location_link : undefined,
    "currenciesAccepted": "MAD",
    "paymentAccepted": "Cash, Credit Card",
    "servesCuisine": "Moroccan",
    "smokingPolicy": "https://schema.org/NoSmokingPolicy"
  };
};

export const generateCityStructuredData = (cityName: string, venues: Venue[], language: SupportedLanguage) => {
  return {
    "@context": "https://schema.org",
    "@type": "City",
    "name": cityName,
    "addressCountry": "MA",
    "containsPlace": venues.map(venue => ({
      "@type": "WeddingVenue",
      "name": venue.translations[language].name,
      "url": venue.site,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": venue.full_address,
        "addressLocality": venue.city,
        "addressCountry": "MA"
      }
    }))
  };
};

export const generateWebsiteStructuredData = (language: SupportedLanguage) => {
  const siteName = language === 'ar' ? 'أماكن الزفاف المغربية' : 'Moroccan Wedding Venues';
  const description = language === 'ar' 
    ? 'اكتشف أجمل الأماكن ليومك المميز عبر المغرب'
    : 'Discover the most enchanting venues for your special day across Morocco';

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "description": description,
    "url": window.location.origin,
    "inLanguage": language,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/${language}/cities?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": window.location.origin
    }
  };
};