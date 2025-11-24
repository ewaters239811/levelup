import { NextRequest, NextResponse } from 'next/server';
import { getAllEmails, getEmailCounts, getTotalEmailCount, getEmailsByArchetype } from '@/lib/mongodb';

// GET /api/emails - Get all emails
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const archetype = searchParams.get('archetype');

    if (archetype) {
      // Get emails by archetype
      const result = await getEmailsByArchetype(archetype);
      return NextResponse.json(result, { status: result.success ? 200 : 500 });
    }

    // Get all emails
    const emailsResult = await getAllEmails();
    const countsResult = await getEmailCounts();
    const totalResult = await getTotalEmailCount();

    return NextResponse.json({
      success: true,
      emails: emailsResult.data || [],
      counts: countsResult.data || [],
      total: totalResult.count || 0,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

