import { Building2, MapPin, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StatsSectionProps {
  totalVenues: number;
  totalCities: number;
}

const StatsSection = ({ totalVenues, totalCities }: StatsSectionProps) => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Building2,
      value: `${totalVenues}+`,
      label: 'Premium Venues'
    },
    {
      icon: MapPin,
      value: `${totalCities}+`,
      label: 'Cities Covered'
    },
    {
      icon: Star,
      value: '4.8+',
      label: 'Average Rating'
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Happy Couples'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 text-white py-16 mb-12 rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM40 20c0-11.046-8.954-20-20-20v20h20zM20 40c11.046 0 20-8.954 20-20H20v20zM0 40c11.046 0 20-8.954 20-20H0v20z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-orange-100">
            Making dream weddings come true across Morocco
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-yellow-200">
                  {stat.value}
                </div>
                <div className="text-orange-100 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;