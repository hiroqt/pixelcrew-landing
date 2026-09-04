import { 
  ChangelogRelease, 
  ChangelogResponse,
  ChangeGroup
} from '@/types/changelog';
import { FALLBACK_RELEASES } from '@/data/changelog-fallback';

const GITHUB_OWNER = 'hiroqt';
const GITHUB_REPO = 'PixelCrew';
const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

interface CacheStore {
  data: ChangelogResponse | null;
  timestamp: number;
}

const cache: CacheStore = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'recently';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay === 1) return '1 day ago';
    if (diffDay < 30) return `${diffDay} days ago`;
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth}mo ago`;
    return `${Math.floor(diffMonth / 12)}y ago`;
  } catch {
    return 'recently';
  }
}

export function formatStandardDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Parse markdown release body into user-friendly ChangeGroups for dynamic releases
 */
export function parseBodyIntoChangeGroups(body: string | undefined): ChangeGroup[] {
  if (!body) return [];

  const lines = body.split('\n');
  const features: { title: string; description: string }[] = [];
  const improvements: { title: string; description: string }[] = [];
  const fixes: { title: string; description: string }[] = [];

  let currentCategory: 'feature' | 'improvement' | 'fix' = 'feature';

  for (const line of lines) {
    const trimmed = line.trim();
    const lower = trimmed.toLowerCase();

    if (lower.includes('feature') || lower.includes('what\'s new')) {
      currentCategory = 'feature';
      continue;
    } else if (lower.includes('improvement') || lower.includes('performance') || lower.includes('enhancement')) {
      currentCategory = 'improvement';
      continue;
    } else if (lower.includes('fix') || lower.includes('bug') || lower.includes('security')) {
      currentCategory = 'fix';
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const clean = trimmed.substring(2).trim();
      if (!clean || clean.startsWith('Full Changelog')) continue;

      // Extract title and description if separated by colon or dash
      let title = clean;
      let description = '';

      if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        description = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        description = parts.slice(1).join(' - ').trim();
      }

      if (!description) {
        description = title;
      }

      const item = { title, description };

      if (currentCategory === 'feature') features.push(item);
      else if (currentCategory === 'improvement') improvements.push(item);
      else fixes.push(item);
    }
  }

  const groups: ChangeGroup[] = [];

  if (features.length > 0) {
    groups.push({
      category: 'feature',
      label: 'New Capabilities',
      badgeColor: '#38bdf8',
      items: features.slice(0, 5)
    });
  }

  if (improvements.length > 0) {
    groups.push({
      category: 'improvement',
      label: 'Enhancements',
      badgeColor: '#f59e0b',
      items: improvements.slice(0, 5)
    });
  }

  if (fixes.length > 0) {
    groups.push({
      category: 'fix',
      label: 'Fixes & Hardening',
      badgeColor: '#34d399',
      items: fixes.slice(0, 5)
    });
  }

  return groups;
}

interface RawGitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  created_at: string;
  html_url: string;
  tarball_url: string;
  zipball_url: string;
  prerelease: boolean;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
}

interface RawGitHubTag {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
}

/**
 * Fetch GitHub releases with clean summary enrichment and fallback resiliency
 */
export async function getChangelogData(forceRefresh = false): Promise<ChangelogResponse> {
  const now = Date.now();

  if (!forceRefresh && cache.data && (now - cache.timestamp < CACHE_TTL_MS)) {
    return {
      ...cache.data,
      cached: true,
      source: cache.data.source
    };
  }

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PixelCrew-Landing/1.0.0'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const fetchOptions: RequestInit = {
      headers,
      next: { revalidate: 1800 }
    };

    const [releasesRes, tagsRes] = await Promise.allSettled([
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=10`, fetchOptions),
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/tags?per_page=10`, fetchOptions)
    ]);

    let releases: ChangelogRelease[] = [];

    // Process Releases
    if (releasesRes.status === 'fulfilled' && releasesRes.value.ok) {
      const rawReleases: RawGitHubRelease[] = await releasesRes.value.json();
      if (Array.isArray(rawReleases) && rawReleases.length > 0) {
        releases = rawReleases.map((r, index) => {
          const pubDate = r.published_at || r.created_at;
          const matchingFallback = FALLBACK_RELEASES.find(fb => fb.tagName === r.tag_name);

          if (matchingFallback) {
            return {
              ...matchingFallback,
              isLatest: index === 0,
              htmlUrl: r.html_url,
              tarballUrl: r.tarball_url,
              zipballUrl: r.zipball_url,
              publishedAt: pubDate,
              formattedDate: formatStandardDate(pubDate),
              relativeTime: formatRelativeTime(pubDate),
            };
          }

          const changeGroups = parseBodyIntoChangeGroups(r.body || undefined);

          return {
            id: String(r.id),
            tagName: r.tag_name,
            version: r.tag_name.replace(/^v/, ''),
            name: r.name || r.tag_name,
            summary: r.body?.split('\n')[0] || `Official release ${r.tag_name} for Pixel Crew.`,
            body: r.body || '',
            publishedAt: pubDate,
            formattedDate: formatStandardDate(pubDate),
            relativeTime: formatRelativeTime(pubDate),
            htmlUrl: r.html_url,
            tarballUrl: r.tarball_url,
            zipballUrl: r.zipball_url,
            isLatest: index === 0,
            isPrerelease: r.prerelease,
            author: {
              username: r.author?.login || 'hiroqt',
              avatarUrl: r.author?.avatar_url || 'https://avatars.githubusercontent.com/u/10892015?v=4',
              githubUrl: r.author?.html_url || `https://github.com/${r.author?.login || 'hiroqt'}`
            },
            changeGroups: changeGroups.length > 0 ? changeGroups : [
              {
                category: 'feature',
                label: 'Release Highlights',
                badgeColor: '#38bdf8',
                items: [{ title: 'Version Update', description: `Published version ${r.tag_name} to GitHub.` }]
              }
            ],
            highlights: [r.name || r.tag_name]
          };
        });
      }
    }

    // Fallback to tags
    if (releases.length === 0 && tagsRes.status === 'fulfilled' && tagsRes.value.ok) {
      const rawTags: RawGitHubTag[] = await tagsRes.value.json();
      if (Array.isArray(rawTags) && rawTags.length > 0) {
        releases = rawTags.map((t, index) => {
          const matchingFallback = FALLBACK_RELEASES.find(fb => fb.tagName === t.name);
          if (matchingFallback) {
            return {
              ...matchingFallback,
              isLatest: index === 0
            };
          }

          return {
            id: `tag-${t.name}`,
            tagName: t.name,
            version: t.name.replace(/^v/, ''),
            name: `Release ${t.name}`,
            summary: `Version ${t.name} published to the main branch.`,
            publishedAt: new Date().toISOString(),
            formattedDate: formatStandardDate(new Date().toISOString()),
            relativeTime: 'recently',
            htmlUrl: `${REPO_URL}/releases/tag/${t.name}`,
            tarballUrl: `${REPO_URL}/archive/refs/tags/${t.name}.tar.gz`,
            zipballUrl: `${REPO_URL}/archive/refs/tags/${t.name}.zip`,
            isLatest: index === 0,
            isPrerelease: false,
            author: {
              username: 'hiroqt',
              avatarUrl: 'https://avatars.githubusercontent.com/u/10892015?v=4',
              githubUrl: 'https://github.com/hiroqt'
            },
            changeGroups: [
              {
                category: 'feature',
                label: 'Release Highlights',
                badgeColor: '#38bdf8',
                items: [{ title: `Version ${t.name}`, description: 'Tagged release ready for deployment.' }]
              }
            ],
            highlights: [`Tagged version ${t.name}`]
          };
        });
      }
    }

    if (releases.length === 0) {
      releases = FALLBACK_RELEASES;
    }

    const response: ChangelogResponse = {
      repository: `${GITHUB_OWNER}/${GITHUB_REPO}`,
      repoUrl: REPO_URL,
      releases,
      lastUpdated: new Date().toISOString(),
      cached: false,
      source: (releasesRes.status === 'fulfilled' && releasesRes.value.ok) ? 'live' : 'fallback'
    };

    cache.data = response;
    cache.timestamp = now;

    return response;
  } catch (error) {
    console.warn('[PixelCrew Changelog] Error loading releases, using fallback:', error);

    return {
      repository: `${GITHUB_OWNER}/${GITHUB_REPO}`,
      repoUrl: REPO_URL,
      releases: FALLBACK_RELEASES,
      lastUpdated: new Date().toISOString(),
      cached: false,
      source: 'fallback'
    };
  }
}

export function invalidateChangelogCache(): void {
  cache.data = null;
  cache.timestamp = 0;
}
