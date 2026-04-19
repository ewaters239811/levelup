import { Redis } from '@upstash/redis';

/** Redis SET key for weekly blog signup emails (normalized lowercase). */
export const WEEKLY_SUBSCRIBERS_SET_KEY = 'weekly_blog_subscribers';

let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;

  // Primary: Upstash dashboard / REST tab. Fallback: some Vercel integrations expose KV_*.
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();
  cached = url && token ? new Redis({ url, token }) : null;
  return cached;
}
