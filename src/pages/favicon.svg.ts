import type { APIRoute } from 'astro';
import { MARK_PATH, MARK_VIEW_BOX } from '../lib/brand';

// Favicon (issue #13). Emitted from the same path the header lockup renders,
// so the tab mark and the site mark cannot drift apart.
//
// Two deliberate choices:
// - The fill follows the browser chrome's color scheme (`prefers-color-scheme`),
//   which is why the favicon is an SVG rather than a PNG: a single raster
//   cannot be dark-on-light and light-on-dark. `color-scheme` is declared so
//   engines that honor it resolve the media query against the chrome.
// - The mark is drawn at its canonical crop, flush with the frame - the
//   reference raster has no transparent padding, so the favicon adds none.
//   Raster targets that need an opaque, masked plate (iOS home screen, PNG
//   fallback) use the charcoal tile variant instead; see DESIGN.md.
const favicon = `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEW_BOX}" role="img" aria-label="Wollack Systems">
  <style>
    :root { color-scheme: light dark; }
    path { fill: #121316; }
    @media (prefers-color-scheme: dark) {
      path { fill: #FFFFFF; }
    }
  </style>
  <path d="${MARK_PATH}" />
</svg>
`;

export const GET: APIRoute = () =>
  new Response(favicon, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
