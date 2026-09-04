import { NextRequest, NextResponse } from 'next/server';
import { invalidateChangelogCache, getChangelogData } from '@/lib/changelog';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-webhook-secret') || 
                   request.nextUrl.searchParams.get('secret');

    const expectedSecret = process.env.REVALIDATE_SECRET;

    // Validate secret if configured
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid revalidation token' },
        { status: 401 }
      );
    }

    // Purge in-memory cache and fetch fresh data
    invalidateChangelogCache();
    const freshData = await getChangelogData(true);

    return NextResponse.json({
      revalidated: true,
      source: freshData.source,
      releasesCount: freshData.releases.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[API /api/revalidate-changelog] Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal revalidation error' },
      { status: 500 }
    );
  }
}
