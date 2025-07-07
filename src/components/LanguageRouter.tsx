import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/i18n/config';

interface LanguageRouterProps {
  children: React.ReactNode;
}

const LanguageRouter = ({ children }: LanguageRouterProps) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment);
    const possibleLang = pathSegments[0] as SupportedLanguage;

    if (supportedLanguages.includes(possibleLang)) {
      // Valid language in URL
      if (i18n.language !== possibleLang) {
        i18n.changeLanguage(possibleLang);
      }
    } else {
      // No language in URL, redirect to default language
      const defaultLang = 'en';
      const newPath = `/${defaultLang}${pathname === '/' ? '' : pathname}`;
      navigate(newPath, { replace: true });
      i18n.changeLanguage(defaultLang);
    }
  }, [location.pathname, i18n, navigate]);

  // Only render children if we have a valid language setup
  const pathname = location.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment);
  const possibleLang = pathSegments[0] as SupportedLanguage;
  
  if (!supportedLanguages.includes(possibleLang)) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default LanguageRouter;