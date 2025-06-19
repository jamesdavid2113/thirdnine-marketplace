
import { useState } from "react";

interface AreaCode {
  code: string;
  country: string;
  flag: string;
}

interface AreaCodeSelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

const AreaCodeSelector = ({ value, onChange, className = "" }: AreaCodeSelectorProps) => {
  const areaCodes: AreaCode[] = [
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' }
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white ${className}`}
    >
      <option value="">Select area code</option>
      {areaCodes.map((area) => (
        <option key={area.code} value={area.code}>
          {area.flag} {area.code} {area.country}
        </option>
      ))}
    </select>
  );
};

export default AreaCodeSelector;
