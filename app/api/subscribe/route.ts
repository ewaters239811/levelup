import { NextRequest, NextResponse } from 'next/server';
import { saveEmail } from '@/lib/mongodb';

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

    // Log to console (for Vercel logs)
    console.log('📧 New subscription:', {
      email,
      archetype,
      timestamp,
    });

    // Save to Vercel Postgres
    const dbResult = await saveEmail(email, archetype);
    
    if (!dbResult.success) {
      console.error('Failed to save to database:', dbResult.error);
      // Still return success to user, but log the error
      // This way the user experience isn't broken if DB fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Email saved successfully',
        savedToDatabase: dbResult.success
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

