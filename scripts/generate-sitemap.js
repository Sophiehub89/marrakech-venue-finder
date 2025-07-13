import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the sitemap generation functions
const { generateSitemap, generateRobotsTxt } = await import('../src/utils/sitemap.ts');

const baseUrl = process.env.BASE_URL || 'https://marrakech-venue-finder.com';
const distDir = path.join(__dirname, '../dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate sitemap
const sitemap = generateSitemap(baseUrl);
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

// Generate robots.txt
const robotsTxt = generateRobotsTxt(baseUrl);
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

console.log('✅ Sitemap and robots.txt generated successfully!');
console.log(`📄 Sitemap: ${baseUrl}/sitemap.xml`);
console.log(`🤖 Robots: ${baseUrl}/robots.txt`); 