import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 503 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json(
        {
          error:
            'Missing RESEND_AUDIENCE_ID. Create an Audience in Resend and add its ID to env vars.',
        },
        { status: 503 }
      );
    }

    // Keep typed loosely for SDK compatibility across minor versions.
    const contactsApi = (resend as unknown as { contacts: { create: Function } })
      .contacts;

    try {
      await contactsApi.create({
        audienceId,
        email: email.trim().toLowerCase(),
        unsubscribed: false,
      });
    } catch (err) {
      // If already exists, still return success for idempotent UX.
      const msg = err instanceof Error ? err.message.toLowerCase() : '';
      if (!msg.includes('already') && !msg.includes('exists')) {
        throw err;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
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
