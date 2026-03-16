import { melbourneLocations, toSlug } from '../shared/locations';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://grabbix.com.au';

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
  { loc: '/locations', priority: '0.8', changefreq: 'monthly' },
  { loc: '/products/traditional-vending', priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

const useCaseSlugs = ['offices', 'apartments', 'coworking', 'gyms', 'students', 'healthcare', 'hotels'];

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static pages
for (const page of staticPages) {
  xml += `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

// Use case pages
for (const slug of useCaseSlugs) {
  xml += `  <url>
    <loc>${BASE_URL}/use-cases/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

// Location pages - using /location/ (singular)
for (const name of melbourneLocations) {
  const slug = toSlug(name);
  xml += `  <url>
    <loc>${BASE_URL}/location/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
}

xml += `</urlset>
`;

const outPath = path.resolve(__dirname, '../client/public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${outPath}`);
