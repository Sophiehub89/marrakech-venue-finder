import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCitiesPathSegment } from '@/utils/slugify';
import type { SupportedLanguage } from '@/i18n/config';

interface BreadcrumbsProps {
  currentLanguage: SupportedLanguage;
  city?: string;
  venueName?: string;
}

const Breadcrumbs = ({ currentLanguage, city, venueName }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const citiesSegment = getCitiesPathSegment(currentLanguage);
  const homePath = `/${currentLanguage}`;
  const citiesPath = `/${currentLanguage}/${citiesSegment}/`;
  
  const isOnCitiesPage = location.pathname === citiesPath;
  const isOnCityPage = city && !venueName;
  const isOnVenuePage = city && venueName;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={homePath} className="text-muted-foreground hover:text-foreground">
              {t('breadcrumbs.home')}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          {isOnCitiesPage ? (
            <BreadcrumbPage className="font-medium text-foreground">
              {t('breadcrumbs.cities')}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={citiesPath} className="text-muted-foreground hover:text-foreground">
                {t('breadcrumbs.cities')}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        
        {city && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isOnCityPage ? (
                <BreadcrumbPage className="font-medium text-foreground">
                  {city}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={`/${currentLanguage}/${citiesSegment}/${city.toLowerCase().replace(/\s+/g, '-')}/`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {city}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}
        
        {venueName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground">
                {venueName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;