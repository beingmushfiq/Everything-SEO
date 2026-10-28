import type {
  CrawlRun,
  PageSpeedData,
  PlaybookCategory,
  Project,
  TechnicalIssue,
  Website,
} from './types';

const BASE_URL = '/api';

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `HTTP error ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Dashboard
  getDashboard: () => fetchJson<{ overview: any; recent_crawls: CrawlRun[]; issues_by_category: any[] }>('/dashboard'),

  // Projects
  getProjects: () => fetchJson<Project[]>('/projects'),
  createProject: (data: Partial<Project>) =>
    fetchJson<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getProject: (id: string) => fetchJson<Project>(`/projects/${id}`),

  // Websites
  getWebsites: () => fetchJson<Website[]>('/websites'),
  createWebsite: (data: Partial<Website>) =>
    fetchJson<Website>('/websites', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  startCrawl: (websiteId: string) =>
    fetchJson<{ message: string; crawl_run: CrawlRun }>(`/websites/${websiteId}/crawl`, {
      method: 'POST',
    }),

  // Crawl Runs & Issues
  getCrawlRun: (id: string) => fetchJson<CrawlRun>(`/crawl-runs/${id}`),
  getCrawlRunIssues: (crawlRunId: string, params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson<{ data: TechnicalIssue[]; total: number }>(`/crawl-runs/${crawlRunId}/issues?${query}`);
  },
  updateIssue: (issueId: string, status: string, notes?: string) =>
    fetchJson<{ message: string; issue: TechnicalIssue }>(`/issues/${issueId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, resolution_notes: notes }),
    }),
  getCsvExportUrl: (crawlRunId: string) => `${BASE_URL}/crawl-runs/${crawlRunId}/export/csv`,
  getHtmlExportUrl: (crawlRunId: string) => `${BASE_URL}/crawl-runs/${crawlRunId}/export/html`,

  // Keywords
  getKeywords: (projectId: string) =>
    fetchJson<{ clusters: any[]; standalone_keywords: any[] }>(`/projects/${projectId}/keywords`),
  uploadKeywordCsv: (projectId: string, csvData: string) =>
    fetchJson<{ message: string; imported_count: number; clusters_created: number }>(
      `/projects/${projectId}/keywords/upload`,
      {
        method: 'POST',
        body: JSON.stringify({ csv_data: csvData }),
      }
    ),
  deleteKeyword: (id: string) =>
    fetchJson<{ message: string }>(`/keywords/${id}`, { method: 'DELETE' }),

  // Content Briefs
  getBriefs: (projectId: string) => fetchJson<any[]>(`/projects/${projectId}/briefs`),
  createBrief: (projectId: string, data: any) =>
    fetchJson<any>(`/projects/${projectId}/briefs`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateBrief: (id: string, data: any) =>
    fetchJson<any>(`/briefs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Analytics
  getAnalytics: (websiteId: string, days = 30) =>
    fetchJson<any>(`/websites/${websiteId}/analytics?days=${days}`),
  getPageSpeed: (websiteId: string) => fetchJson<PageSpeedData>(`/websites/${websiteId}/pagespeed`),

  // Knowledge Base
  getKnowledgeBase: () => fetchJson<{ categories: PlaybookCategory[] }>('/knowledge-base'),
  getPlaybook: (category: string, slug: string) =>
    fetchJson<{ category: string; slug: string; title: string; content: string }>(
      `/knowledge-base/${category}/${slug}`
    ),
};
