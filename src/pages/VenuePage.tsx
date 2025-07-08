import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockVenues } from '@/data/mockVenues';
import { slugify } from '@/utils/slugify';
import { type SupportedLanguage } from '@/i18n/config';
import VenueDetail from '@/components/VenueDetail';
import Breadcrumbs from '@/components/Breadcrumbs';

const VenuePage = () => {
  const { citySlug, venueSlug } = useParams<{ citySlug: string; venueSlug: string }>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  // Find the venue by matching both city and venue slugs
  const venueData = useMemo(() => {
    if (!citySlug || !venueSlug) return null;
    
    const matchingVenue = mockVenues.find(venue => 
      slugify(venue.city) === citySlug && slugify(venue.name) === venueSlug
    );
    
    return matchingVenue || null;
  }, [citySlug, venueSlug]);

  // If venue not found, navigate to city page or 404
  if (!venueData) {
    const fallbackPath = citySlug 
      ? `/${currentLanguage}/cities/${citySlug}/`
      : `/${currentLanguage}/cities/`;
    return <Navigate to={fallbackPath} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          currentLanguage={currentLanguage} 
          city={venueData.city}
          venueName={venueData.name}
        />
      </div>
      
      <VenueDetail 
        venue={venueData} 
        onBack={() => window.history.back()}
        showBreadcrumbs={false}
      />
    </div>
  );
};

export default VenuePage;