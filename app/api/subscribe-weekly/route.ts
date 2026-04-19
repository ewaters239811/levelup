import { NextRequest, NextResponse } from 'next/server';
import { getRedis, WEEKLY_SUBSCRIBERS_SET_KEY } from '@/lib/redis';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json(
        {
          error: 'Signups are not enabled on the server yet.',
          hint:
            'Add Upstash Redis: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Set WEEKLY_ADMIN_SECRET to view addresses at /admin/weekly-subscribers. Redeploy after saving env vars.',
        },
        { status: 503 }
      );
    }

    const normalized = email.trim().toLowerCase();
    await redis.sadd(WEEKLY_SUBSCRIBERS_SET_KEY, normalized);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('subscribe-weekly:', error);
    return NextResponse.json(
      {
        error: 'Could not subscribe right now.',
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
