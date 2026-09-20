/**
 * schema.org JSON-LD entities for the site (issue #9).
 *
 * Entities reference each other by `@id` so pages can compose subsets
 * (e.g. Organization + founder on the landing page, Product + breadcrumbs
 * on /journeyman) without duplicating fields. Each object carries its own
 * `@context` so it renders as a standalone, valid script block.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://wollacksystems.github.io';

// Founder portrait: drop a photo at public/will-wollack.png and rebuild —
// it then feeds both the /about hero plate and the Person schema below.
// Anchored on the project cwd (where npm run build/dev always runs).
// FOUNDER_PORTRAIT is root-relative so the <img> resolves in dev/preview
// too; FOUNDER_PORTRAIT_ABSOLUTE is the canonical URL for JSON-LD.
export const FOUNDER_PORTRAIT = existsSync(join(process.cwd(), 'public', 'will-wollack.png'))
  ? '/will-wollack.png'
  : null;
export const FOUNDER_PORTRAIT_ABSOLUTE = FOUNDER_PORTRAIT ? `${SITE_URL}${FOUNDER_PORTRAIT}` : null;

// Cofounder portrait: same drop-in convention as the founder's.
export const COFOUNDER_PORTRAIT = existsSync(join(process.cwd(), 'public', 'ethan-davidson.png'))
  ? '/ethan-davidson.png'
  : null;
export const COFOUNDER_PORTRAIT_ABSOLUTE = COFOUNDER_PORTRAIT
  ? `${SITE_URL}${COFOUNDER_PORTRAIT}`
  : null;

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_WILL_ID = `${SITE_URL}/#will-wollack`;
export const PERSON_ETHAN_ID = `${SITE_URL}/#ethan-davidson`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRODUCT_JOURNEYMAN_ID = `${SITE_URL}/journeyman/#product`;
export const ABOUT_PAGE_ID = `${SITE_URL}/about/#aboutpage`;

/** The company. Referenced by `founder`, `publisher`, and `brand`. */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Wollack Systems',
    url: SITE_URL,
    // Both point at the canonical raster (issue #13). It stays a raster on
    // purpose: Google's logo guidance wants a crawlable bitmap of at least
    // 112x112, which rules out the vector small-size cut the favicon and
    // header lockup use. See src/lib/brand.ts for the mark's variants.
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      'Wollack Systems records what experienced manufacturing operators know, hands-free, and turns it into a permanent, searchable record the plant keeps.',
    email: 'willwollack@gmail.com',
    founder: { '@id': PERSON_WILL_ID },
    sameAs: ['https://github.com/wollacksystems'],
  };
}

/** Will Wollack, founder — the subject of the landing page story (#6). */
export function personWillWollack() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_WILL_ID,
    name: 'Will Wollack',
    jobTitle: 'Founder',
    worksFor: { '@id': ORG_ID },
    email: 'willwollack@gmail.com',
    ...(FOUNDER_PORTRAIT_ABSOLUTE ? { image: FOUNDER_PORTRAIT_ABSOLUTE } : {}),
    description:
      'Founder of Wollack Systems, capturing the expertise of experienced manufacturing operators before it retires with them.',
    knowsAbout: ['manufacturing', 'knowledge capture', 'apprenticeship', 'industrial maintenance'],
  };
}

/** Ethan Davidson, cofounder — met Will after a Newport Beach networking event pitch. */
export function personEthanDavidson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ETHAN_ID,
    name: 'Ethan Davidson',
    alternateName: 'EthanThatOneKid',
    jobTitle: 'Cofounder',
    worksFor: { '@id': ORG_ID },
    url: 'https://etok.me/',
    sameAs: ['https://github.com/EthanThatOneKid'],
    ...(COFOUNDER_PORTRAIT_ABSOLUTE ? { image: COFOUNDER_PORTRAIT_ABSOLUTE } : {}),
  };
}

/** The site itself, published by the org. */
export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Wollack Systems',
    publisher: { '@id': ORG_ID },
  };
}

/** Journeyman, the flagship product, on /journeyman. */
export function productJourneyman() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': PRODUCT_JOURNEYMAN_ID,
    name: 'Journeyman',
    description:
      'Journeyman records how your most experienced operators do their work, in their own words, and turns it into a searchable library the plant can ask questions of and train from.',
    brand: { '@id': ORG_ID },
    url: `${SITE_URL}/journeyman/`,
    manufacturer: { '@id': ORG_ID },
  };
}

/** The /about page — an AboutPage whose subject is the founder. */
export function aboutPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': ABOUT_PAGE_ID,
    url: `${SITE_URL}/about/`,
    name: 'About Will Wollack, Wollack Systems',
    about: { '@id': PERSON_WILL_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/** Home → Journeyman trail for the product page. */
export function breadcrumbJourneyman() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journeyman',
        item: `${SITE_URL}/journeyman/`,
      },
    ],
  };
}

/** Home → About trail for the founder page. */
export function breadcrumbAbout() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${SITE_URL}/about/`,
      },
    ],
  };
}
