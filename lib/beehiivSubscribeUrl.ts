/**
 * Reads `NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL` — your beehiiv subscribe page URL
 * (HTTPS only). Strip quotes sometimes copied from dashboards by mistake.
 */
export function getBeehiivSubscribeUrl(): string | null {
  let raw = process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL?.trim();
  if (!raw) return null;
  // Embed script URLs are not subscriber-facing pages — use V3 embed envs instead.
  if (raw.includes('loader.js')) return null;
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    raw = raw.slice(1, -1).trim();
  }
  if (!raw.startsWith('https://')) return null;
  return raw;
}
