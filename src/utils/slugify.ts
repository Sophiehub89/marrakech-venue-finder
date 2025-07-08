// Utility function to create URL-friendly slugs from text
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens and Arabic characters
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9\-]/g, '')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

// Utility function to get localized cities path segment
export const getCitiesPathSegment = (language: string): string => {
  const segments: Record<string, string> = {
    en: 'cities',
    ar: 'المدن',
    fr: 'villes',
    es: 'ciudades'
  };
  return segments[language] || 'cities';
};

// Utility function to generate venue URL path
export const generateVenuePath = (language: string, city: string, venueName: string): string => {
  const citiesSegment = getCitiesPathSegment(language);
  const citySlug = slugify(city);
  const venueSlug = slugify(venueName);
  return `/${language}/${citiesSegment}/${citySlug}/${venueSlug}/`;
};

// Utility function to generate city URL path
export const generateCityPath = (language: string, city: string): string => {
  const citiesSegment = getCitiesPathSegment(language);
  const citySlug = slugify(city);
  return `/${language}/${citiesSegment}/${citySlug}/`;
};

// Utility function to generate cities list URL path
export const generateCitiesPath = (language: string): string => {
  const citiesSegment = getCitiesPathSegment(language);
  return `/${language}/${citiesSegment}/`;
};