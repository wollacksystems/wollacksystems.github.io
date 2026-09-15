import type { APIRoute } from 'astro';

// Dynamic robots.txt per the @astrojs/sitemap guide: the sitemap URL is
// derived from the `site` value in astro.config.mjs (single source of truth).
// https://docs.astro.build/en/guides/integrations-guide/sitemap/
const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
