
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const LanguageToggle = () => {
  const { language, setLanguage, loading } = useLanguage();

  const UKFlag = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#012169"/>
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="2"/>
      <path d="M10 0v16M0 5.33h24M0 10.67h24" stroke="#fff" strokeWidth="1.33"/>
      <path d="M0 6.67h24M0 9.33h24" stroke="#C8102E" strokeWidth="0.67"/>
      <path d="M12 0v16" stroke="#C8102E" strokeWidth="2.67"/>
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1"/>
    </svg>
  );

  const DutchFlag = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#AE1C28"/>
      <rect width="24" height="5.33" y="5.33" fill="#fff"/>
      <rect width="24" height="5.33" y="10.67" fill="#21468B"/>
    </svg>
  );

  const handleLanguageChange = async (newLanguage: 'en' | 'nl') => {
    try {
      await setLanguage(newLanguage);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            language === 'en' ? <UKFlag /> : <DutchFlag />
          )}
          <span className="hidden sm:inline">
            {language === 'en' ? 'English' : 'Nederlands'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')} 
          className="gap-2"
          disabled={loading}
        >
          <UKFlag />
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('nl')} 
          className="gap-2"
          disabled={loading}
        >
          <DutchFlag />
          Nederlands
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
