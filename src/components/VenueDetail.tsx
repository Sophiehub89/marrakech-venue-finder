
import { ArrowLeft, Star, MapPin, Phone, Globe, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

interface VenueDetailProps {
  venue: any;
  onBack: () => void;
  showBreadcrumbs?: boolean;
}

const VenueDetail = ({ venue, onBack, showBreadcrumbs = true }: VenueDetailProps) => {
  const { t } = useTranslation();
  const categories = venue.category.split(', ');
  const amenities = Array.isArray(venue.about) ? venue.about : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('venue.backToVenues')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden border-orange-100">
              <div className="relative">
                <img
                  src={venue.photo || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  {venue.verified && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-black bg-opacity-70 text-white px-3 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-semibold text-lg">{venue.rating}</span>
                    <span className="ml-2 text-gray-200">({venue.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Venue Info */}
            <Card className="border-orange-100">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                      {venue.name}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                      <span className="text-lg">{venue.full_address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {venue.prices}
                    </div>
                    <div className="text-gray-500">
                      {venue.range}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Categories */}
                   <div>
                     <h3 className="font-semibold text-gray-800 mb-3">{t('filters.category')}</h3>
                     <div className="flex flex-wrap gap-2">
                       {categories.map((category, index) => (
                         <Badge
                           key={index}
                           variant="secondary"
                           className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                         >
                           {category.trim()}
                         </Badge>
                       ))}
                     </div>
                   </div>

                   {/* Description */}
                   <div>
                     <h3 className="font-semibold text-gray-800 mb-3">About</h3>
                     <p className="text-gray-600 leading-relaxed">
                       {venue.description}
                     </p>
                   </div>

                   {/* Amenities */}
                   {amenities.length > 0 && (
                     <div>
                       <h3 className="font-semibold text-gray-800 mb-3">{t('venue.amenities')}</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {amenities.map((amenity, index) => (
                           <div key={index} className="flex items-center text-gray-600">
                             <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                             <span className="text-sm">{amenity}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Working Hours */}
                   <div>
                     <h3 className="font-semibold text-gray-800 mb-3">Working Hours</h3>
                     <div className="flex items-center text-gray-600">
                       <Clock className="w-4 h-4 mr-2 text-orange-500" />
                       <span>{venue.working_hours || 'Please contact for hours'}</span>
                     </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl">{t('venue.contact')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {venue.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <div className="font-medium">{t('venue.phone')}</div>
                      <a
                        href={`tel:${venue.phone}`}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        {venue.phone}
                      </a>
                    </div>
                  </div>
                )}

                {venue.site && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <div className="font-medium">{t('venue.website')}</div>
                      <a
                        href={venue.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    onClick={() => window.open(`tel:${venue.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>

                  {venue.location_link && (
                    <Button
                      variant="outline"
                      className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                      onClick={() => window.open(venue.location_link, '_blank')}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View Location
                    </Button>
                  )}

                  {venue.reviews_link && (
                    <Button
                      variant="outline"
                      className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                      onClick={() => window.open(venue.reviews_link, '_blank')}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Read Reviews
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rating Summary */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl">{t('venue.rating')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {venue.rating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(venue.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">
                    Based on {venue.reviews} reviews
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
