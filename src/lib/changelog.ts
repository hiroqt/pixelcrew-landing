import { 
  ChangelogRelease, 
  ChangelogResponse,
  ChangeGroup
} from '@/types/changelog';
import { FALLBACK_RELEASES } from '@/data/changelog-fallback';

const GITHUB_OWNER = 'hiroqt';
const GITHUB_REPO = 'PixelCrew';
const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
const RAW_CHANGELOG_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/CHANGELOG.md`;

interface CacheStore {
  data: ChangelogResponse | null;
  timestamp: number;
}

const cache: CacheStore = {
  data: null,
  timestamp: 0,
};

// 10-second cache TTL for responsive real-time updates while deduplicating simultaneous SSR requests
const CACHE_TTL_MS = 10 * 1000;

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

export function parseSectionItems(text: string): { title: string; description: string }[] {
  const items: { title: string; description: string }[] = [];
  const lines = text.split('\n');

  let currentTitle = '';
  let currentDesc = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#### ')) {
      if (currentTitle) {
        items.push({ title: currentTitle, description: currentDesc || currentTitle });
      }
      currentTitle = trimmed.replace(/^####\s+/, '').replace(/\*\*/g, '');
      currentDesc = '';
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const clean = trimmed.replace(/^[-*]\s+/, '');
      const boldMatch = clean.match(/^\*\*([^*]+)\*\*:\s*(.*)$/);
      
      if (currentTitle) {
        // Under a #### heading: capture the first bullet or combine descriptions
        if (!currentDesc) {
          currentDesc = boldMatch ? `${boldMatch[1]}: ${boldMatch[2]}` : clean;
        }
      } else {
        // Individual bullet without a subheading
        if (boldMatch) {
          items.push({
            title: boldMatch[1].trim(),
            description: boldMatch[2].trim()
          });
        } else {
          const colonIdx = clean.indexOf(':');
          if (colonIdx > 0 && colonIdx < 50) {
            items.push({
              title: clean.slice(0, colonIdx).trim(),
              description: clean.slice(colonIdx + 1).trim()
            });
          } else {
            items.push({
              title: clean.slice(0, 55),
              description: clean
            });
          }
        }
      }
    } else if (currentTitle && trimmed.length > 0 && !trimmed.startsWith('#')) {
      if (!currentDesc) {
        currentDesc = trimmed;
      }
    }
  }

  if (currentTitle && !items.some(it => it.title === currentTitle)) {
    items.push({ title: currentTitle, description: currentDesc || currentTitle });
  }

  return items.slice(0, 8);
}

export function parseMarkdownBody(body: string): {
  summary: string;
  highlights: string[];
  changeGroups: ChangeGroup[];
} {
  let summary = '';
  const highlights: string[] = [];
  const changeGroups: ChangeGroup[] = [];

  // 1. Highlights: Look for ### Highlights or ### 🌟 Release Highlights
  const highlightsMatch = body.match(/###\s+[^\n]*Highlights[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n###\s+|\n##\s+|$)/i);
  if (highlightsMatch) {
    const hText = highlightsMatch[1];
    const lines = hText.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line.startsWith('- ') || line.startsWith('* ')) {
        highlights.push(line.replace(/^[-*]\s+/, '').replace(/\*\*/g, ''));
      } else if (!line.startsWith('#') && !summary) {
        summary = line.replace(/\*\*/g, '');
      }
    }
  }

  // 2. Added / Features (Lookahead uses \n---\s*\n, \n###\s+, or \n##\s+ to avoid cutting off at ####)
  const addedMatch = body.match(/###\s+[^\n]*(Added|Features)[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n###\s+|\n##\s+|$)/i);
  if (addedMatch) {
    const items = parseSectionItems(addedMatch[2]);
    if (items.length > 0) {
      changeGroups.push({
        category: 'feature',
        label: 'New Capabilities',
        badgeColor: '#38bdf8',
        items
      });
    }
  }

  // 3. Changed / Improvements / Enhancements
  const changedMatch = body.match(/###\s+[^\n]*(Changed|Improvements|Enhancements|Refactored)[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n###\s+|\n##\s+|$)/i);
  if (changedMatch) {
    const items = parseSectionItems(changedMatch[2]);
    if (items.length > 0) {
      changeGroups.push({
        category: 'improvement',
        label: 'Enhancements & Architecture',
        badgeColor: '#f59e0b',
        items
      });
    }
  }

  // 4. Fixed / Security
  const fixedMatch = body.match(/###\s+[^\n]*(Fixed|Security)[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n###\s+|\n##\s+|$)/i);
  if (fixedMatch) {
    const items = parseSectionItems(fixedMatch[2]);
    if (items.length > 0) {
      changeGroups.push({
        category: 'fix',
        label: 'Fixes & Hardening',
        badgeColor: '#34d399',
        items
      });
    }
  }

  // 5. Documentation / Benchmarks
  const docsMatch = body.match(/###\s+[^\n]*(Documentation|Benchmarks)[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n###\s+|\n##\s+|$)/i);
  if (docsMatch) {
    const items = parseSectionItems(docsMatch[2]);
    if (items.length > 0) {
      changeGroups.push({
        category: 'improvement',
        label: 'Documentation & Benchmarks',
        badgeColor: '#a78bfa',
        items
      });
    }
  }

  return { summary, highlights, changeGroups };
}

/**
 * Parses full raw CHANGELOG.md markdown from GitHub into structured release entries
 */
export function parseRawChangelogMarkdown(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  const versionBlocks = markdown.split(/(?=^##\s+\[)/m);

  for (let i = 0; i < versionBlocks.length; i++) {
    const block = versionBlocks[i];
    const headerMatch = block.match(/^##\s+\[([0-9.]+)\](?:\s*-\s*([0-9-]+))?/m);
    if (!headerMatch) continue;

    const version = headerMatch[1];
    const tagName = `v${version}`;
    const dateStr = headerMatch[2] || new Date().toISOString().split('T')[0];

    const { summary, highlights, changeGroups } = parseMarkdownBody(block);

    // Check if we have curated metrics in FALLBACK_RELEASES to enrich
    const fallbackMatch = FALLBACK_RELEASES.find(fb => fb.version === version || fb.tagName === tagName);

    releases.push({
      id: `rel-${tagName}`,
      tagName,
      version,
      name: fallbackMatch?.name || `Release ${tagName}`,
      summary: summary || fallbackMatch?.summary || `Official release ${tagName} for Pixel Crew.`,
      publishedAt: dateStr,
      formattedDate: formatStandardDate(dateStr),
      relativeTime: formatRelativeTime(dateStr),
      htmlUrl: `${REPO_URL}/releases/tag/${tagName}`,
      tarballUrl: `${REPO_URL}/archive/refs/tags/${tagName}.tar.gz`,
      zipballUrl: `${REPO_URL}/archive/refs/tags/${tagName}.zip`,
      isLatest: releases.length === 0,
      isPrerelease: false,
      author: {
        username: 'hiroqt',
        avatarUrl: 'https://avatars.githubusercontent.com/u/117023859?v=4',
        githubUrl: 'https://github.com/hiroqt'
      },
      metrics: fallbackMatch?.metrics,
      changeGroups: changeGroups.length > 0 ? changeGroups : (fallbackMatch?.changeGroups || [
        {
          category: 'feature',
          label: 'Release Updates',
          badgeColor: '#38bdf8',
          items: [{ title: `Version ${tagName}`, description: summary || 'Release updates published.' }]
        }
      ]),
      highlights: highlights.length > 0 ? highlights : (fallbackMatch?.highlights || [`Version ${tagName} released to repository`])
    });
  }

  return releases;
}

interface RawGitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  tarball_url: string;
  zipball_url: string;
  prerelease: boolean;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

interface RawGitHubTag {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
}

/**
 * Fetch GitHub releases with zero-delay real-time synchronization
 */
export async function getChangelogData(forceRefresh = false): Promise<ChangelogResponse> {
  const now = Date.now();

  // If not forcing refresh and memory cache is fresh within 10s, return cached response
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
      cache: 'no-store' // Never use stale HTTP cache
    };

    // Parallel fetch: Official GitHub Releases, Raw Authoritative CHANGELOG.md & repository tags
    const [releasesApiRes, rawChangelogRes, tagsRes] = await Promise.allSettled([
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=15`, fetchOptions),
      fetch(`${RAW_CHANGELOG_URL}?t=${now}`, fetchOptions),
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/tags?per_page=15`, fetchOptions)
    ]);

    let releases: ChangelogRelease[] = [];

    // 1. Primary Source A: Official GitHub Releases API
    if (releasesApiRes.status === 'fulfilled' && releasesApiRes.value.ok) {
      const ghReleases: RawGitHubRelease[] = await releasesApiRes.value.json();
      if (Array.isArray(ghReleases) && ghReleases.length > 0) {
        for (const ghRel of ghReleases) {
          const tagName = ghRel.tag_name;
          const version = tagName.replace(/^v/, '');
          const fallbackMatch = FALLBACK_RELEASES.find(fb => fb.version === version || fb.tagName === tagName);
          const { summary, highlights, changeGroups } = parseMarkdownBody(ghRel.body || '');

          releases.push({
            id: `rel-${ghRel.id || tagName}`,
            tagName,
            version,
            name: ghRel.name || `Release ${tagName}`,
            summary: summary || fallbackMatch?.summary || `Official release ${tagName} for Pixel Crew.`,
            publishedAt: ghRel.published_at || new Date().toISOString(),
            formattedDate: formatStandardDate(ghRel.published_at),
            relativeTime: formatRelativeTime(ghRel.published_at),
            htmlUrl: ghRel.html_url || `${REPO_URL}/releases/tag/${tagName}`,
            tarballUrl: ghRel.tarball_url || `${REPO_URL}/archive/refs/tags/${tagName}.tar.gz`,
            zipballUrl: ghRel.zipball_url || `${REPO_URL}/archive/refs/tags/${tagName}.zip`,
            isLatest: releases.length === 0,
            isPrerelease: ghRel.prerelease || false,
            author: {
              username: ghRel.author?.login || 'hiroqt',
              avatarUrl: ghRel.author?.avatar_url || 'https://avatars.githubusercontent.com/u/117023859?v=4',
              githubUrl: ghRel.author?.html_url || 'https://github.com/hiroqt'
            },
            metrics: fallbackMatch?.metrics,
            changeGroups: changeGroups.length > 0 ? changeGroups : (fallbackMatch?.changeGroups || [
              {
                category: 'feature',
                label: 'New Capabilities',
                badgeColor: '#38bdf8',
                items: [{ title: `Version ${tagName}`, description: summary || 'Release updates published.' }]
              }
            ]),
            highlights: highlights.length > 0 ? highlights : (fallbackMatch?.highlights || [`Version ${tagName} released`])
          });
        }
      }
    }

    // 2. Primary Source B: Parse live authoritative CHANGELOG.md from main branch
    // Supplements releases if CHANGELOG.md has older versions or richer details
    if (rawChangelogRes.status === 'fulfilled' && rawChangelogRes.value.ok) {
      const rawMarkdown = await rawChangelogRes.value.text();
      const parsedReleases = parseRawChangelogMarkdown(rawMarkdown);
      
      if (releases.length === 0) {
        releases = parsedReleases;
      } else {
        // Merge releases from CHANGELOG.md if not in releases API
        for (const pr of parsedReleases) {
          if (!releases.some(r => r.tagName === pr.tagName || r.version === pr.version)) {
            releases.push(pr);
          }
        }
      }
    }

    // 3. Cross-verify with latest git tags
    if (tagsRes.status === 'fulfilled' && tagsRes.value.ok) {
      const rawTags: RawGitHubTag[] = await tagsRes.value.json();
      if (Array.isArray(rawTags) && rawTags.length > 0) {
        const latestTag = rawTags[0].name;
        // If a new tag exists that hasn't been parsed yet, prepend it
        if (!releases.some(r => r.tagName === latestTag)) {
          const matchingFallback = FALLBACK_RELEASES.find(fb => fb.tagName === latestTag);
          if (matchingFallback) {
            releases.unshift({ ...matchingFallback, isLatest: true });
          } else {
            releases.unshift({
              id: `rel-${latestTag}`,
              tagName: latestTag,
              version: latestTag.replace(/^v/, ''),
              name: `Release ${latestTag}`,
              summary: `Latest release ${latestTag} published to repository.`,
              publishedAt: new Date().toISOString(),
              formattedDate: formatStandardDate(new Date().toISOString()),
              relativeTime: 'just now',
              htmlUrl: `${REPO_URL}/releases/tag/${latestTag}`,
              tarballUrl: `${REPO_URL}/archive/refs/tags/${latestTag}.tar.gz`,
              zipballUrl: `${REPO_URL}/archive/refs/tags/${latestTag}.zip`,
              isLatest: true,
              isPrerelease: false,
              author: {
                username: 'hiroqt',
                avatarUrl: 'https://avatars.githubusercontent.com/u/117023859?v=4',
                githubUrl: 'https://github.com/hiroqt'
              },
              changeGroups: [
                {
                  category: 'feature',
                  label: 'Release Highlights',
                  badgeColor: '#38bdf8',
                  items: [{ title: `Version ${latestTag}`, description: 'New version published.' }]
                }
              ],
              highlights: [`Version ${latestTag}`]
            });
          }
        }
      }
    }

    // Fallback if network was unavailable
    if (releases.length === 0) {
      releases = FALLBACK_RELEASES;
    }

    // Mark only the very first release as latest
    releases = releases.map((rel, index) => ({
      ...rel,
      isLatest: index === 0
    }));

    const isLive = (releasesApiRes.status === 'fulfilled' && releasesApiRes.value.ok) ||
                   (rawChangelogRes.status === 'fulfilled' && rawChangelogRes.value.ok);

    const response: ChangelogResponse = {
      repository: `${GITHUB_OWNER}/${GITHUB_REPO}`,
      repoUrl: REPO_URL,
      releases,
      lastUpdated: new Date().toISOString(),
      cached: false,
      source: isLive ? 'live' : 'fallback'
    };

    cache.data = response;
    cache.timestamp = now;

    return response;
  } catch (error) {
    console.warn('[PixelCrew Changelog] Live fetch failed, using fallback:', error);

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
