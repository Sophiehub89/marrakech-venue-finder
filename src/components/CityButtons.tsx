import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { generateCityPath } from '@/utils/slugify';
import type { SupportedLanguage } from '@/i18n/config';

interface CityButtonsProps {
  cities: string[];
  currentLanguage: SupportedLanguage;
}

const CityButtons = ({ cities, currentLanguage }: CityButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Explore Cities
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Button
            key={city}
            asChild
            variant="outline"
            className="h-16 text-lg font-semibold border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 hover:scale-105"
          >
            <Link to={generateCityPath(currentLanguage, city)}>
              {city}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CityButtons;