import { NextRequest, NextResponse } from 'next/server';
import { getChangelogData } from '@/lib/changelog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.has('t');

    const data = await getChangelogData(forceRefresh);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Changelog-Source': data.source
      }
    });
  } catch (error) {
    console.error('[API /api/changelog] Error fetching changelog data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve changelog data' },
      { status: 500 }
    );
  }
}
