import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const banks = JSON.parse(readFileSync(join(rootDir, 'data/banks.json'), 'utf-8'));
const states = JSON.parse(readFileSync(join(rootDir, 'data/states.json'), 'utf-8'));
const creditCardCategories = JSON.parse(readFileSync(join(rootDir, 'data/credit-card-categories.json'), 'utf-8'));
const guides = JSON.parse(readFileSync(join(rootDir, 'data/guides.json'), 'utf-8'));
const comparisons = JSON.parse(readFileSync(join(rootDir, 'data/comparisons.json'), 'utf-8'));
const cities = JSON.parse(readFileSync(join(rootDir, 'data/cities.json'), 'utf-8'));
const calculators = JSON.parse(readFileSync(join(rootDir, 'data/calculators.json'), 'utf-8'));

const baseUrl = 'https://bankingdeal.com';
const today = new Date().toISOString().split('T')[0];

const urls = [];

// Static pages
urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
urls.push({ loc: '/about', priority: '0.5', changefreq: 'monthly' });
urls.push({ loc: '/bank-rates', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/banking-deals', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/personal-finance', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/calculators', priority: '0.9', changefreq: 'monthly' });

// Bank reviews
for (const bank of banks) {
  urls.push({ loc: `/reviews/${bank.slug}`, priority: '0.8', changefreq: 'monthly' });
}

// CD rates by state
for (const state of states) {
  urls.push({ loc: `/best-cd-rates/${state.slug}`, priority: '0.8', changefreq: 'weekly' });
}

// Savings accounts by state
for (const state of states) {
  urls.push({ loc: `/best-savings-accounts/${state.slug}`, priority: '0.8', changefreq: 'weekly' });
}

// Mortgage rates by state
for (const state of states) {
  urls.push({ loc: `/best-mortgage-rates/${state.slug}`, priority: '0.8', changefreq: 'weekly' });
}

// Credit cards by use case
for (const cat of creditCardCategories) {
  urls.push({ loc: `/best-credit-cards/${cat.slug}`, priority: '0.8', changefreq: 'monthly' });
}

// Guides
for (const guide of guides) {
  urls.push({ loc: `/guides/${guide.slug}`, priority: '0.7', changefreq: 'monthly' });
}

// Comparisons
for (const comparison of comparisons) {
  urls.push({ loc: `/compare/${comparison.slug}`, priority: '0.7', changefreq: 'monthly' });
}

// City guides
for (const city of cities) {
  urls.push({ loc: `/best-banks/${city.slug}`, priority: '0.8', changefreq: 'monthly' });
}

// Calculators
for (const calc of calculators) {
  urls.push({ loc: `/calculators/${calc.slug}`, priority: '0.8', changefreq: 'monthly' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(join(rootDir, 'public/sitemap.xml'), xml);
console.log(`Sitemap generated with ${urls.length} URLs`);
