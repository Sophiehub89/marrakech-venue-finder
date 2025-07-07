
import { Star, MapPin, Phone, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface VenueCardProps {
  venue: any;
  onClick: () => void;
}

const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  const { t } = useTranslation();
  const categories = venue.category.split(', ').slice(0, 3);

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-orange-100 hover:border-orange-300 bg-white overflow-hidden">
      <div className="relative">
        <img
          src={venue.photo || "/placeholder.svg"}
          alt={venue.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-4 right-4">
          {venue.verified && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-semibold">{venue.rating}</span>
            <span className="ml-1 text-gray-200">({venue.reviews})</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700 transition-colors line-clamp-2">
            {venue.name}
          </h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
          <span className="text-sm">{venue.city}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-200"
            >
              {category.trim()}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-orange-600">
            {venue.prices}
          </div>
          <div className="text-sm text-gray-500">
            {venue.range}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {venue.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-500">
            {venue.phone && (
              <Phone className="w-4 h-4" />
            )}
            {venue.site && (
              <Globe className="w-4 h-4" />
            )}
          </div>
          <Button 
            onClick={onClick}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            {t('venue.viewDetails')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
