import { NextRequest, NextResponse } from 'next/server';

// For now, we'll just log the email. In production, you'd save to a database
// or send to an email service like Resend, Mailchimp, etc.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, archetype, timestamp } = body;

    if (!email || !archetype) {
      return NextResponse.json(
        { error: 'Email and archetype are required' },
        { status: 400 }
      );
    }

    // TODO: Replace this with actual email storage
    // Options:
    // 1. Save to database (PostgreSQL, MongoDB, etc.)
    // 2. Send to email service (Resend, SendGrid, Mailchimp)
    // 3. Save to Vercel KV or similar
    
    console.log('📧 New subscription:', {
      email,
      archetype,
      timestamp,
    });

    // For now, just return success
    // In production, you'd do something like:
    // await saveToDatabase({ email, archetype, timestamp });
    // await sendToEmailService({ email, archetype });

    return NextResponse.json(
      { 
        success: true,
        message: 'Email saved successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

