
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VenueDetail from '@/components/VenueDetail';
import HeroSection from '@/components/HeroSection';
import SearchAndFilters from '@/components/SearchAndFilters';
import VenuesGrid from '@/components/VenuesGrid';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mockVenues } from '@/data/mockVenues';
import { generateCitiesPath } from '@/utils/slugify';
import type { SupportedLanguage } from '@/i18n/config';

const Index = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const cities = [...new Set(mockVenues.map(venue => venue.city))];
  const categories = [...new Set(mockVenues.flatMap(venue => venue.category.split(', ')))];

  const filteredVenues = useMemo(() => {
    return mockVenues.filter(venue => {
      const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           venue.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === 'all' || venue.city === selectedCity;
      
      const matchesCategory = selectedCategory === 'all' || 
                             venue.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesRating = minRating === 'all' || venue.rating >= parseFloat(minRating);
      
      const matchesPriceRange = priceRange === 'all' || venue.range.includes(priceRange);

      return matchesSearch && matchesCity && matchesCategory && matchesRating && matchesPriceRange;
    });
  }, [searchTerm, selectedCity, selectedCategory, minRating, priceRange]);

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
        
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minRating={minRating}
          setMinRating={setMinRating}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          cities={cities}
          categories={categories}
          filteredVenuesCount={filteredVenues.length}
        />

        <VenuesGrid
          filteredVenues={filteredVenues}
          onVenueClick={setSelectedVenue}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
