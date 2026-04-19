import { NextRequest, NextResponse } from 'next/server';
import { getRedis, WEEKLY_SUBSCRIBERS_SET_KEY } from '@/lib/redis';

export async function GET(request: NextRequest) {
  const adminSecret = process.env.WEEKLY_ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return NextResponse.json(
      {
        error: 'Admin is not configured.',
        hint: 'Set WEEKLY_ADMIN_SECRET in your server environment (same value you will enter on the admin page).',
      },
      { status: 503 }
    );
  }

  const provided = request.headers.get('x-weekly-admin-secret')?.trim();
  if (!provided || provided !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      {
        error: 'Subscriber list storage is not configured.',
        hint: 'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (free tier at upstash.com), then redeploy.',
      },
      { status: 503 }
    );
  }

  const members = await redis.smembers(WEEKLY_SUBSCRIBERS_SET_KEY);
  const emails = (members as string[]).filter(Boolean).sort((a, b) => a.localeCompare(b));

  return NextResponse.json({ emails });
}
