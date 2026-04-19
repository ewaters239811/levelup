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
            'This app only stores emails in Upstash Redis. In your host (e.g. Vercel → Settings → Environment Variables), add BOTH:\n' +
            '• UPSTASH_REDIS_REST_URL\n' +
            '• UPSTASH_REDIS_REST_TOKEN\n' +
            '(Copy from Upstash → your database → REST API → “.env” snippet. If Vercel’s integration named them KV_REST_API_URL / KV_REST_API_TOKEN, those work too.)\n\n' +
            'WEEKLY_ADMIN_SECRET is only for viewing the list at /admin/weekly-subscribers — it is not required for someone to subscribe.\n\n' +
            'After saving env vars, redeploy — new variables are not picked up until a new deployment.',
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
