/**
 * schema.org JSON-LD entities for the site (issue #9).
 *
 * Entities reference each other by `@id` so pages can compose subsets
 * (e.g. Organization + founder on the landing page, Product + breadcrumbs
 * on /journeyman) without duplicating fields. Each object carries its own
 * `@context` so it renders as a standalone, valid script block.
 */

const SITE_URL = 'https://wollacksystems.github.io';

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_WILL_ID = `${SITE_URL}/#will-wollack`;
export const PERSON_ETHAN_ID = `${SITE_URL}/#ethan-davidson`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRODUCT_JOURNEYMAN_ID = `${SITE_URL}/journeyman#product`;

/** The company. Referenced by `founder`, `publisher`, and `brand`. */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Wollack Systems',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      'Wollack Systems records what experienced manufacturing operators know — hands-free — and turns it into a permanent, searchable record the plant owns.',
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
    description:
      'Founder of Wollack Systems, capturing the expertise of experienced manufacturing operators before it retires with them.',
    knowsAbout: ['manufacturing', 'knowledge capture', 'apprenticeship', 'industrial maintenance'],
  };
}

/** Ethan Davidson, cofounder — pitched at a Newport Beach networking event. */
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
      'Journeyman records how your most experienced operators do their work and turns it into a written, searchable record your plant owns and can train from.',
    brand: { '@id': ORG_ID },
    url: `${SITE_URL}/journeyman`,
    manufacturer: { '@id': ORG_ID },
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
        item: `${SITE_URL}/journeyman`,
      },
    ],
  };
}
