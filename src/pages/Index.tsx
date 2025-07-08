
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VenueDetail from '@/components/VenueDetail';
import HeroSection from '@/components/HeroSection';
import CityButtons from '@/components/CityButtons';
import FeaturedVenues from '@/components/FeaturedVenues';
import WhyChooseSection from '@/components/WhyChooseSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mockVenues } from '@/data/mockVenues';
import { generateCitiesPath } from '@/utils/slugify';
import type { SupportedLanguage } from '@/i18n/config';

const Index = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;
  const [selectedVenue, setSelectedVenue] = useState(null);

  const cities = [...new Set(mockVenues.map(venue => venue.city))];

  if (selectedVenue) {
    return <VenueDetail venue={selectedVenue} onBack={() => setSelectedVenue(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <HeroSection 
        totalVenues={mockVenues.length}
        totalCities={cities.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <Link to={generateCitiesPath(currentLanguage)}>
              Browse All Cities
            </Link>
          </Button>
        </div>
        
        <CityButtons cities={cities} currentLanguage={currentLanguage} />
        
        <FeaturedVenues venues={mockVenues} onVenueClick={setSelectedVenue} />
        
        <StatsSection totalVenues={mockVenues.length} totalCities={cities.length} />
        
        <WhyChooseSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
