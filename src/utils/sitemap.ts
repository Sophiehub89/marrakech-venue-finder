import { mockVenues } from '@/data/mockVenues';
import { generateVenuePath, generateCityPath, generateCitiesPath } from './slugify';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string): string => {
  const urls: SitemapUrl[] = [];
  const languages = ['en', 'ar', 'fr', 'es'];
  const currentDate = new Date().toISOString().split('T')[0];

  // Add homepage for each language
  languages.forEach(lang => {
    urls.push({
      loc: `${baseUrl}/${lang}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    });
  });

  // Add cities page for each language
  languages.forEach(lang => {
    urls.push({
      loc: `${baseUrl}${generateCitiesPath(lang)}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Get unique cities
  const cities = [...new Set(mockVenues.map(venue => venue.city))];

  // Add city pages for each language
  cities.forEach(city => {
    languages.forEach(lang => {
      urls.push({
        loc: `${baseUrl}${generateCityPath(lang, city)}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      });
    });
  });

  // Add venue pages for each language
  mockVenues.forEach(venue => {
    languages.forEach(lang => {
      urls.push({
        loc: `${baseUrl}${generateVenuePath(lang, venue.city, venue.name)}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      });
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
`;
}; 