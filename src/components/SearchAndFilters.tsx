
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  minRating: string;
  setMinRating: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  cities: string[];
  categories: string[];
  filteredVenuesCount: number;
}

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
  cities,
  categories,
  filteredVenuesCount
}: SearchAndFiltersProps) => {
  return (
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
          {filteredVenuesCount} venue{filteredVenuesCount !== 1 ? 's' : ''} found
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
  );
};

export default SearchAndFilters;
