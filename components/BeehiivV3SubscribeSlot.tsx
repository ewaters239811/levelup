import BeehiivV3SubscribeEmbed from '@/components/BeehiivV3SubscribeEmbed';

const DEFAULT_LOADER =
  'https://subscribe-forms.beehiiv.com/v3/loader.js';

/**
 * Server component: reads beehiiv env at request/build time so the form ID is
 * always passed explicitly to the client (avoids empty client bundles when env
 * names differ between Vercel and code).
 *
 * Supports either name on Vercel:
 * - `BEEHIIV_FORM_ID` + optional `BEEHIIV_V3_LOADER_URL` (no NEXT_PUBLIC)
 * - `NEXT_PUBLIC_BEEHIIV_FORM_ID` + optional `NEXT_PUBLIC_BEEHIIV_V3_LOADER_URL`
 */
export default function BeehiivV3SubscribeSlot() {
  const formId =
    process.env.BEEHIIV_FORM_ID?.trim() ||
    process.env.NEXT_PUBLIC_BEEHIIV_FORM_ID?.trim() ||
    '';
  const loaderHref = (
    process.env.BEEHIIV_V3_LOADER_URL?.trim() ||
    process.env.NEXT_PUBLIC_BEEHIIV_V3_LOADER_URL?.trim() ||
    DEFAULT_LOADER
  ).replace(/^["']|["']$/g, '');

  if (!formId) return null;

  return (
    <BeehiivV3SubscribeEmbed
      formId={formId}
      loaderHref={loaderHref.startsWith('https://') ? loaderHref : DEFAULT_LOADER}
    />
  );
}
