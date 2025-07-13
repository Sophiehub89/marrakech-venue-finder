export interface VenueTranslations {
  en: {
    name: string;
    description: string;
    category: string;
    about: string[];
  };
  ar: {
    name: string;
    description: string;
    category: string;
    about: string[];
  };
  fr: {
    name: string;
    description: string;
    category: string;
    about: string[];
  };
  es: {
    name: string;
    description: string;
    category: string;
    about: string[];
  };
}

export interface VenueSeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  structuredData: {
    type: string;
    name: string;
    description: string;
    address: string;
    telephone: string;
    url: string;
    image: string;
    priceRange: string;
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
}

export interface Venue {
  id: string;
  name: string; // Default English name
  site: string;
  category: string; // Default English category
  phone: string;
  full_address: string;
  city: string;
  rating: number;
  reviews: number;
  reviews_link: string;
  photo: string;
  working_hours: string;
  about: string[]; // Default English about
  range: string;
  prices: string;
  description: string; // Default English description
  verified: boolean;
  location_link: string;
  
  // Enhanced fields
  translations: VenueTranslations;
  seoMetadata: {
    en: VenueSeoMetadata;
    ar: VenueSeoMetadata;
    fr: VenueSeoMetadata;
    es: VenueSeoMetadata;
  };
  gallery?: string[];
  amenities: string[];
  capacity?: {
    min: number;
    max: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type SupportedLanguage = 'en' | 'ar' | 'fr' | 'es';