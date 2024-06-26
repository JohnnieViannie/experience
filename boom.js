const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream'); // Add this import
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/service', changefreq: 'weekly', priority: 0.8 },
  { url: '/faqs', changefreq: 'weekly', priority: 0.8 },
  { url: '/partner', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects', changefreq: 'monthly', priority: 0.7 },
  { url: '/more_details', changefreq: 'monthly', priority: 0.7 },
  { url: '/more_Onlinedetails', changefreq: 'monthly', priority: 0.7 },
  { url: '/forgot', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/searchresults', changefreq: 'weekly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.7 },
  { url: '/change', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
  { url: '/terms', changefreq: 'monthly', priority: 0.7 },
  { url: '/signup', changefreq: 'monthly', priority: 0.7 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.7 },
];

const stream = new SitemapStream({ hostname: 'https://browse-index.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

streamToPromise(Readable.from(links).pipe(stream)).then(() => {
  console.log('Sitemap generated successfully.');
});

stream.pipe(writeStream);