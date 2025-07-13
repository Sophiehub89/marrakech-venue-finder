import { Shield, Award, Users, MapPin, Clock, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

const WhyChooseSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: 'Verified Venues',
      description: 'All venues are personally verified and quality-checked for your peace of mind.'
    },
    {
      icon: Award,
      title: 'Premium Selection',
      description: 'Handpicked collection of the most beautiful and prestigious wedding venues in Morocco.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our wedding specialists provide personalized assistance throughout your venue selection.'
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep knowledge of Moroccan wedding traditions and venue requirements across all cities.'
    },
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Quick and easy booking process with immediate confirmation from venue owners.'
    },
    {
      icon: Heart,
      title: 'Dream Weddings',
      description: 'Helping create magical moments in the most enchanting settings across Morocco.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-16 mb-12 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience the difference with Morocco's most trusted wedding venue platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;