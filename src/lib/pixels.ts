/**
 * Delays (ms) for the pixel cover used by the preloader and page transitions.
 * Integer hashing keeps the values identical on the server and in the browser.
 */
export const PIXEL_DELAYS = Array.from({ length: 160 }, (_, i) => {
  const h = Math.imul(i + 1, 2654435761) >>> 0;
  return Math.round(((h % 997) / 997) * 480);
});
