import { NextRequest, NextResponse } from 'next/server';
import { weeklyPosts } from '@/data/weeklyPost';
import { addUniqueWeeklyView, getWeeklyViewCounts } from '@/lib/weeklyViews';

function validSlug(slug: string) {
  return weeklyPosts.some((post) => post.slug === slug);
}

function asSlugArray(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input.filter((v): v is string => typeof v === 'string' && v.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = typeof body?.slug === 'string' ? body.slug : '';
    const visitorId = typeof body?.visitorId === 'string' ? body.visitorId : '';
    const slugs = asSlugArray(body?.slugs);

    if (!slug || !visitorId || !validSlug(slug)) {
      return NextResponse.json({ error: 'Invalid view payload.' }, { status: 400 });
    }

    await addUniqueWeeklyView(slug, visitorId);
    const counts = await getWeeklyViewCounts(slugs.length ? slugs : [slug]);

    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json(
      { error: 'Failed to track weekly post view.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const slugs = request.nextUrl.searchParams.getAll('slug');
    const valid = slugs.filter(validSlug);
    const selected = valid.length ? valid : weeklyPosts.map((post) => post.slug);
    const counts = await getWeeklyViewCounts(selected);
    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load weekly post view counts.' },
      { status: 500 }
    );
  }
}

