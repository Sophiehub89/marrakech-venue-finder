
import { Star, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface HeroSectionProps {
  totalVenues: number;
  totalCities: number;
}

const HeroSection = ({ totalVenues, totalCities }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM40 20c0-11.046-8.954-20-20-20v20h20zM20 40c11.046 0 20-8.954 20-20H20v20zM0 40c11.046 0 20-8.954 20-20H0v20z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto px-4 py-20">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
            {t('hero.arabicTitle')}
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {t('hero.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            {t('hero.subtitle')}
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span>{totalVenues} {t('hero.venues')}</span>
            <span className="mx-2">•</span>
            <MapPin className="w-5 h-5 text-orange-300" />
            <span>{totalCities} {t('hero.cities')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
