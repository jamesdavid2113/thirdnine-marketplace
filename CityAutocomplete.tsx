
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface City {
  city: string;
  country: string;
  areaCode: string;
  region: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (city: string) => void;
  onAreaCodeSuggestion?: (areaCode: string) => void;
}

const CityAutocomplete = ({ value, onChange, onAreaCodeSuggestion }: CityAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Major cities with their area codes
  const cityDatabase: City[] = [
    { city: 'Barcelona', country: 'Spain', areaCode: '+34', region: 'Catalonia' },
    { city: 'Madrid', country: 'Spain', areaCode: '+34', region: 'Madrid' },
    { city: 'Valencia', country: 'Spain', areaCode: '+34', region: 'Valencia' },
    { city: 'Seville', country: 'Spain', areaCode: '+34', region: 'Andalusia' },
    { city: 'Paris', country: 'France', areaCode: '+33', region: 'Île-de-France' },
    { city: 'Lyon', country: 'France', areaCode: '+33', region: 'Auvergne-Rhône-Alpes' },
    { city: 'Marseille', country: 'France', areaCode: '+33', region: 'Provence-Alpes-Côte d\'Azur' },
    { city: 'Berlin', country: 'Germany', areaCode: '+49', region: 'Berlin' },
    { city: 'Munich', country: 'Germany', areaCode: '+49', region: 'Bavaria' },
    { city: 'Hamburg', country: 'Germany', areaCode: '+49', region: 'Hamburg' },
    { city: 'Rome', country: 'Italy', areaCode: '+39', region: 'Lazio' },
    { city: 'Milan', country: 'Italy', areaCode: '+39', region: 'Lombardy' },
    { city: 'Naples', country: 'Italy', areaCode: '+39', region: 'Campania' },
    { city: 'Lisbon', country: 'Portugal', areaCode: '+351', region: 'Lisbon' },
    { city: 'Porto', country: 'Portugal', areaCode: '+351', region: 'Porto' },
    { city: 'Amsterdam', country: 'Netherlands', areaCode: '+31', region: 'North Holland' },
    { city: 'Brussels', country: 'Belgium', areaCode: '+32', region: 'Brussels' },
    { city: 'London', country: 'United Kingdom', areaCode: '+44', region: 'England' },
    { city: 'Manchester', country: 'United Kingdom', areaCode: '+44', region: 'England' },
    { city: 'New York', country: 'United States', areaCode: '+1', region: 'New York' },
    { city: 'Los Angeles', country: 'United States', areaCode: '+1', region: 'California' }
  ];

  const searchCities = (query: string): City[] => {
    if (query.length < 2) return [];
    
    return cityDatabase
      .filter(city => 
        city.city.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase()) ||
        city.region.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length >= 2) {
      const results = searchCities(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: City) => {
    const fullCityName = `${city.city}, ${city.country}`;
    setInputValue(fullCityName);
    onChange(fullCityName);
    setShowSuggestions(false);
    
    // Suggest area code
    if (onAreaCodeSuggestion) {
      onAreaCodeSuggestion(city.areaCode);
    }
    
    toast({
      title: "Area code suggestion",
      description: `Suggested area code for ${city.city}: ${city.areaCode}`,
    });
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        City *
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Start typing city name..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        required
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectCity(city)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium">{city.city}, {city.country}</div>
              <div className="text-sm text-gray-600">
                {city.region} • Area code: {city.areaCode}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
