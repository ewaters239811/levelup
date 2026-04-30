import { Redis } from '@upstash/redis';

const PREFIX = 'weekly:unique:';

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function addUniqueWeeklyView(slug: string, visitorId: string) {
  const redis = getRedis();
  if (!redis) return null;
  await redis.sadd(`${PREFIX}${slug}`, visitorId);
  return redis;
}

export async function getWeeklyViewCounts(slugs: string[]) {
  const redis = getRedis();
  const counts: Record<string, number | null> = {};

  if (!redis) {
    for (const slug of slugs) counts[slug] = null;
    return counts;
  }

  await Promise.all(
    slugs.map(async (slug) => {
      const n = await redis.scard(`${PREFIX}${slug}`);
      counts[slug] = Number(n || 0);
    })
  );

  return counts;
}

