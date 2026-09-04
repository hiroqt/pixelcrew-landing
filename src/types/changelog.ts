export type ChangeCategoryType = 'feature' | 'improvement' | 'fix';

export interface ChangeItem {
  title: string;
  description: string;
}

export interface ChangeGroup {
  category: ChangeCategoryType;
  label: string;
  badgeColor: string;
  items: ChangeItem[];
}

export interface ReleaseMetric {
  label: string;
  value: string;
}

export interface ChangelogRelease {
  id: string;
  tagName: string;
  version: string;
  name: string;
  summary: string;
  body?: string;
  publishedAt: string;
  formattedDate: string;
  relativeTime: string;
  htmlUrl: string;
  tarballUrl: string;
  zipballUrl: string;
  isLatest?: boolean;
  isPrerelease: boolean;
  author: {
    username: string;
    avatarUrl: string;
    githubUrl: string;
  };
  metrics?: ReleaseMetric[];
  changeGroups: ChangeGroup[];
  highlights: string[];
}

export interface ChangelogResponse {
  repository: string;
  repoUrl: string;
  releases: ChangelogRelease[];
  lastUpdated: string;
  cached: boolean;
  source: 'live' | 'cache' | 'fallback';
}

export interface SyncStatus {
  source: 'live' | 'cache' | 'fallback';
  lastUpdated: string;
  isRefreshing: boolean;
  error?: string;
}
