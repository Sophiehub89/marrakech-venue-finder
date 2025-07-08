import { Star, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeaturedVenuesProps {
  venues: any[];
  onVenueClick: (venue: any) => void;
}

const FeaturedVenues = ({ venues, onVenueClick }: FeaturedVenuesProps) => {
  const { t } = useTranslation();
  
  // Get top 3 rated venues for featured section
  const featuredVenues = venues
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-4">
          Featured
        </Badge>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Premium Venues
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Handpicked exceptional venues for your perfect wedding day
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredVenues.map((venue, index) => (
          <Card 
            key={index} 
            className="group overflow-hidden border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  Featured
                </Badge>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{venue.rating}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                {venue.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{venue.city}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{venue.capacity} guests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">{venue.range}</span>
                <Button 
                  onClick={() => onVenueClick(venue)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {t('venue.viewDetails')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVenues;