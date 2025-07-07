import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supportedLanguages, languageNames, type SupportedLanguage } from '@/i18n/config';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    // Extract the current path without language prefix
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/').filter(part => part);
    
    // Remove language prefix if present
    const pathWithoutLang = supportedLanguages.includes(pathParts[0] as SupportedLanguage)
      ? '/' + pathParts.slice(1).join('/')
      : currentPath;

    // Create new path with language prefix
    const newPath = `/${newLanguage}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    
    // Change language and navigate
    i18n.changeLanguage(newLanguage);
    navigate(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-32 border-orange-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;