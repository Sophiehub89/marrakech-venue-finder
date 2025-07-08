import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVenues } from '@/data/mockVenues';
import { generateCityPath, slugify } from '@/utils/slugify';
import { supportedLanguages, type SupportedLanguage } from '@/i18n/config';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const CitiesList = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;
  
  // Get unique cities with venue counts
  const citiesData = mockVenues.reduce((acc, venue) => {
    const city = venue.city;
    if (!acc[city]) {
      acc[city] = {
        name: city,
        count: 0,
        averageRating: 0,
        totalRating: 0
      };
    }
    acc[city].count++;
    acc[city].totalRating += venue.rating;
    acc[city].averageRating = acc[city].totalRating / acc[city].count;
    return acc;
  }, {} as Record<string, { name: string; count: number; averageRating: number; totalRating: number }>);

  const cities = Object.values(citiesData).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <HeroSection 
        totalVenues={mockVenues.length}
        totalCities={cities.length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs currentLanguage={currentLanguage} />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('breadcrumbs.cities')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={generateCityPath(currentLanguage, city.name)}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-orange-100 group-hover:border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span className="group-hover:text-orange-600 transition-colors">
                      {city.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{city.count} {t('hero.venues')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-yellow-600">
                        {city.averageRating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= city.averageRating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CitiesList;