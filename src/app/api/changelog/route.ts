import { NextRequest, NextResponse } from 'next/server';
import { getChangelogData } from '@/lib/changelog';

export const revalidate = 1800; // 30 minutes Next.js cache

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    const data = await getChangelogData(forceRefresh);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
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
