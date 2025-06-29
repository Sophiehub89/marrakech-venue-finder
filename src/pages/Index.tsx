
import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Globe, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import VenueCard from '@/components/VenueCard';
import VenueDetail from '@/components/VenueDetail';
import { mockVenues } from '@/data/mockVenues';

const Index = () => {
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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM40 20c0-11.046-8.954-20-20-20v20h20zM20 40c11.046 0 20-8.954 20-20H20v20zM0 40c11.046 0 20-8.954 20-20H0v20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              أماكن الزفاف المغربية
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Moroccan Wedding Venues
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Discover the most enchanting venues for your special day across Morocco
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span>{mockVenues.length} Premium Venues</span>
              <span className="mx-2">•</span>
              <MapPin className="w-5 h-5 text-orange-300" />
              <span>{cities.length} Cities</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search venues, cities, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <div className="text-gray-600">
              {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-orange-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="1k">1k-3k MAD</SelectItem>
                    <SelectItem value="3k">3k-5k MAD</SelectItem>
                    <SelectItem value="5k">5k+ MAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Venues Grid */}
        {filteredVenues.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No venues found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue, index) => (
              <VenueCard
                key={index}
                venue={venue}
                onClick={() => setSelectedVenue(venue)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-800 to-orange-700 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">المغرب • Morocco</h3>
          <p className="text-orange-100">Your dream wedding awaits in the most beautiful venues across Morocco</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
