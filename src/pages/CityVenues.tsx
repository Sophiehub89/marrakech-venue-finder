import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockVenues } from '@/data/mockVenues';
import { slugify } from '@/utils/slugify';
import { type SupportedLanguage } from '@/i18n/config';
import VenuesGrid from '@/components/VenuesGrid';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import VenueDetail from '@/components/VenueDetail';
import { useState } from 'react';

const CityVenues = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Find the city by matching slug
  const cityData = useMemo(() => {
    if (!citySlug) return null;
    
    const matchingVenues = mockVenues.filter(venue => 
      slugify(venue.city) === citySlug
    );
    
    if (matchingVenues.length === 0) return null;
    
    return {
      name: matchingVenues[0].city,
      venues: matchingVenues
    };
  }, [citySlug]);

  // If city not found, navigate to 404 or cities list
  if (!cityData) {
    return <Navigate to={`/${currentLanguage}/cities/`} replace />;
  }

  if (selectedVenue) {
    return <VenueDetail venue={selectedVenue} onBack={() => setSelectedVenue(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <HeroSection 
        totalVenues={mockVenues.length}
        totalCities={[...new Set(mockVenues.map(v => v.city))].length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          currentLanguage={currentLanguage} 
          city={cityData.name}
        />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hero.venues')} {cityData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('search.venuesFound', { count: cityData.venues.length })}
          </p>
        </div>

        <VenuesGrid
          filteredVenues={cityData.venues}
          onVenueClick={setSelectedVenue}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default CityVenues;