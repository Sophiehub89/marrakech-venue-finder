
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VenueCard from '@/components/VenueCard';

interface VenuesGridProps {
  filteredVenues: any[];
  onVenueClick: (venue: any) => void;
}

const VenuesGrid = ({ filteredVenues, onVenueClick }: VenuesGridProps) => {
  const { t } = useTranslation();

  if (filteredVenues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('search.noVenuesTitle')}</h3>
          <p className="text-gray-500">{t('search.noVenuesMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVenues.map((venue, index) => (
        <VenueCard
          key={index}
          venue={venue}
          onClick={() => onVenueClick(venue)}
        />
      ))}
    </div>
  );
};

export default VenuesGrid;
