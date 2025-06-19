
import { useState, useEffect } from "react";

interface BrandAutocompleteProps {
  category: string;
  value: string;
  onChange: (brand: string) => void;
}

const sportsBrands: Record<string, string[]> = {
  running: [
    'Nike', 'Adidas', 'Brooks', 'ASICS', 'New Balance', 'Saucony', 'Hoka', 'Mizuno',
    'Under Armour', 'Puma', 'Reebok', 'Salomon', 'On Running', 'Altra', 'Merrell',
    'Garmin', 'Polar', 'Suunto', 'Fitbit', 'Apple', 'Patagonia', 'The North Face',
    'Lululemon', 'Athleta', 'Compression', 'CEP', 'Zensah', 'Pro Compression'
  ],
  
  golf: [
    'Titleist', 'Callaway', 'TaylorMade', 'Ping', 'Cobra', 'Mizuno', 'Wilson',
    'Cleveland', 'Srixon', 'Bridgestone', 'Odyssey', 'Scotty Cameron', 'Nike Golf',
    'Adidas Golf', 'Under Armour Golf', 'FootJoy', 'Ecco Golf', 'Puma Golf',
    'Galvin Green', 'J.Lindeberg', 'Hugo Boss Golf', 'Polo Ralph Lauren Golf',
    'Sun Mountain', 'Titleist Golf Bags', 'Ping Golf Bags', 'Bushnell', 'Garmin Golf',
    'SkyCaddie', 'Rangefinder', 'Golf Pride', 'Lamkin'
  ],
  
  football: [
    'Nike', 'Adidas', 'Puma', 'Under Armour', 'Umbro', 'Kappa', 'Joma', 'Mizuno',
    'New Balance', 'Diadora', 'Lotto', 'Hummel', 'Errea', 'Macron', 'Kempa',
    'Select', 'Mitre', 'Molten', 'Wilson Football', 'Spalding', 'McDavid',
    'Nike Mercurial', 'Adidas Predator', 'Puma Future', 'Nike Phantom', 'Adidas Copa',
    'Nike Tiempo', 'Puma King', 'Adidas X', 'Nike Hypervenom', 'Shinpads',
    'Goalkeeper Gloves', 'Uhlsport', 'Reusch', 'Sells'
  ],

  basketball: [
    'Nike', 'Adidas', 'Jordan', 'Under Armour', 'Puma', 'Reebok', 'Converse',
    'New Balance', 'Spalding', 'Wilson', 'Molten', 'Nike Air Jordan', 'Nike LeBron',
    'Adidas Boost', 'Under Armour Curry', 'Puma Clyde', 'And1', 'Champion'
  ],

  tennis: [
    'Wilson', 'Babolat', 'Head', 'Prince', 'Yonex', 'Tecnifibre', 'Dunlop',
    'Nike Tennis', 'Adidas Tennis', 'Lacoste', 'Fila', 'K-Swiss', 'New Balance Tennis',
    'Asics Tennis', 'Lotto Tennis', 'Diadora Tennis'
  ],

  cycling: [
    'Trek', 'Specialized', 'Giant', 'Cannondale', 'Scott', 'Merida', 'Bianchi',
    'Pinarello', 'Cervelo', 'Cube', 'Canyon', 'Orbea', 'Ridley', 'Focus',
    'Shimano', 'SRAM', 'Campagnolo', 'Garmin', 'Wahoo', 'Polar'
  ]
};

const BrandAutocomplete = ({ category, value, onChange }: BrandAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const getBrands = (category: string): string[] => {
    return sportsBrands[category] || [];
  };

  const searchBrands = (query: string, category: string): string[] => {
    if (!query || query.length < 1) return [];
    
    const brands = getBrands(category);
    return brands
      .filter(brand => brand.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length >= 1 && category) {
      const results = searchBrands(value, category);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectBrand = (brand: string) => {
    setInputValue(brand);
    onChange(brand);
    setShowSuggestions(false);
  };

  // Update suggestions when category changes
  useEffect(() => {
    if (inputValue && category) {
      const results = searchBrands(inputValue, category);
      setSuggestions(results);
    }
  }, [category, inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Brand *
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={category ? `Popular ${category} brands...` : "Select a category first"}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        disabled={!category}
        required
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((brand, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectBrand(brand)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              {brand}
            </button>
          ))}
        </div>
      )}
      
      {category && inputValue && suggestions.length === 0 && showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="text-gray-500 text-sm">
            No matching brands found. You can still enter "{inputValue}"
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandAutocomplete;
