import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

    const normalized = email.trim().toLowerCase();

    const redis = getRedis();
    let storedInRedis = false;
    if (redis) {
      await redis.sadd(WEEKLY_SUBSCRIBERS_SET_KEY, normalized);
      storedInRedis = true;
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const ownerInbox = process.env.WEEKLY_SUBSCRIBER_OWNER_EMAIL?.trim();
    const fromEmail =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      'Level-Up Diagnostic <onboarding@resend.dev>';

    let notifiedOwner = false;
    if (apiKey && ownerInbox) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: ownerInbox,
        subject: `[Weekly blog] New subscriber: ${normalized}`,
        text: [
          'New weekly blog signup',
          '',
          `Email: ${normalized}`,
          `Time (UTC): ${new Date().toISOString()}`,
          '',
          storedInRedis
            ? 'This address was also saved to your private subscriber list (Upstash).'
            : 'This address was NOT saved to Upstash — add UPSTASH_REDIS_* env vars if you want a copy/paste list in /admin/weekly-subscribers.',
        ].join('\n'),
      });
      if (error) {
        console.error('Weekly subscribe notify email error:', error);
        if (!storedInRedis) {
          return NextResponse.json(
            {
              error: 'Could not record signup.',
              hint:
                typeof error === 'object' && error && 'message' in error
                  ? String((error as { message: unknown }).message)
                  : 'Check RESEND_API_KEY and RESEND_FROM_EMAIL.',
            },
            { status: 500 }
          );
        }
      } else {
        notifiedOwner = true;
      }
    }

    if (!storedInRedis && !notifiedOwner) {
      return NextResponse.json(
        {
          error: 'Subscriber capture is not set up yet.',
          hint:
            'Pick at least one:\n' +
            '• Private list you open in the browser: add Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN), set WEEKLY_ADMIN_SECRET, then visit /admin/weekly-subscribers.\n' +
            '• Or email-only: set RESEND_API_KEY and WEEKLY_SUBSCRIBER_OWNER_EMAIL (and RESEND_FROM_EMAIL if needed) — you get one email per signup and can mail people manually.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, storedInRedis, notifiedOwner });
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
