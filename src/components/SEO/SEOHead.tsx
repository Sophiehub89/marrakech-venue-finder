import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { type SupportedLanguage } from '@/types/venue';
import { generateVenuePath, generateCityPath, generateCitiesPath } from '@/utils/slugify';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
  venue?: any;
  city?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = [], 
  ogImage, 
  canonical,
  structuredData,
  venue,
  city 
}: SEOHeadProps) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language as SupportedLanguage;

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    // Update title
    const pageTitle = title || t('hero.title');
    document.title = `${pageTitle} | ${t('hero.arabicTitle')}`;

    // Update meta description
    const metaDescription = description || t('hero.subtitle');
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', metaDescription);
    } else {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      descTag.setAttribute('content', metaDescription);
      document.head.appendChild(descTag);
    }

    // Update meta keywords
    if (keywords.length > 0) {
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag) {
        keywordsTag.setAttribute('content', keywords.join(', '));
      } else {
        keywordsTag = document.createElement('meta');
        keywordsTag.setAttribute('name', 'keywords');
        keywordsTag.setAttribute('content', keywords.join(', '));
        document.head.appendChild(keywordsTag);
      }
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', metaDescription);
    updateOGTag('og:url', window.location.href);
    updateOGTag('og:type', venue ? 'place' : 'website');
    updateOGTag('og:locale', currentLanguage);

    if (ogImage) {
      updateOGTag('og:image', ogImage);
    }

    // Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateTwitterTag('twitter:title', pageTitle);
    updateTwitterTag('twitter:description', metaDescription);
    if (ogImage) {
      updateTwitterTag('twitter:image', ogImage);
    }

    // Add hreflang tags
    const addHreflangTags = () => {
      // Remove existing hreflang tags
      document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

      const languages: SupportedLanguage[] = ['en', 'ar', 'fr', 'es'];
      const currentPath = location.pathname;

      languages.forEach(lang => {
        let hrefPath = '';
        
        if (venue && city) {
          hrefPath = generateVenuePath(lang, city, venue.name);
        } else if (city) {
          hrefPath = generateCityPath(lang, city);
        } else if (currentPath.includes('cities') || currentPath.includes('المدن') || currentPath.includes('villes') || currentPath.includes('ciudades')) {
          hrefPath = generateCitiesPath(lang);
        } else {
          hrefPath = `/${lang}`;
        }

        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        link.setAttribute('href', `${window.location.origin}${hrefPath}`);
        document.head.appendChild(link);
      });

      // Add x-default
      const defaultLink = document.createElement('link');
      defaultLink.setAttribute('rel', 'alternate');
      defaultLink.setAttribute('hreflang', 'x-default');
      defaultLink.setAttribute('href', `${window.location.origin}/en`);
      document.head.appendChild(defaultLink);
    };

    addHreflangTags();

    // Add canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonical);
        document.head.appendChild(canonicalTag);
      }
    }

    // Add structured data
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (scriptTag) {
        scriptTag.textContent = JSON.stringify(structuredData);
      } else {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptTag);
      }
    }

  }, [title, description, keywords, ogImage, canonical, structuredData, currentLanguage, venue, city, location.pathname, t, i18n.language]);

  return null;
};

export default SEOHead;