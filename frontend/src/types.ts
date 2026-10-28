export type IssueSeverity = 'critical' | 'warning' | 'info';
export type IssueStatus = 'open' | 'in_progress' | 'ignored' | 'resolved';
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

export interface Project {
  id: string;
  workspace_id: string;
  name: string;
  client_name?: string;
  target_country: string;
  primary_language: string;
  objectives?: string;
  websites?: Website[];
  websites_count?: number;
  keywords_count?: number;
  content_briefs_count?: number;
  created_at: string;
}

export interface Website {
  id: string;
  project_id: string;
  domain: string;
  base_url: string;
  respect_robots: boolean;
  max_crawl_pages: number;
  crawl_delay_ms: number;
  last_crawled_at?: string;
  project?: Project;
  crawl_runs?: CrawlRun[];
}

export interface CrawlRun {
  id: string;
  website_id: string;
  trigger_type: string;
  status: 'pending' | 'crawling' | 'completed' | 'failed';
  pages_discovered: number;
  pages_crawled: number;
  critical_issues_count: number;
  warning_issues_count: number;
  info_issues_count: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  website?: Website;
  pages?: CrawledPage[];
  issues?: TechnicalIssue[];
}

export interface CrawledPage {
  id: string;
  crawl_run_id: string;
  url: string;
  status_code: number;
  content_type?: string;
  load_time_ms: number;
  content_length: number;
  title?: string;
  title_length: number;
  meta_description?: string;
  meta_description_length: number;
  h1_tags?: string[];
  canonical_url?: string;
  meta_robots?: string;
  is_indexable: boolean;
  inlinks_count: number;
  outlinks_count: number;
  images_without_alt_count: number;
  has_schema: boolean;
  schema_types?: string[];
}

export interface TechnicalIssue {
  id: string;
  crawl_run_id: string;
  crawled_page_id?: string;
  rule_code: string;
  category: string;
  severity: IssueSeverity;
  evidence: string;
  explanation: string;
  remediation: string;
  status: IssueStatus;
  assigned_to?: string;
  resolution_notes?: string;
  created_at: string;
  crawled_page?: CrawledPage;
}

export interface KeywordCluster {
  id: string;
  project_id: string;
  name: string;
  intent: SearchIntent;
  primary_keyword?: string;
  total_volume: number;
  keywords?: Keyword[];
  keywords_count?: number;
}

export interface Keyword {
  id: string;
  project_id: string;
  cluster_id?: string;
  keyword: string;
  target_country: string;
  search_intent: SearchIntent;
  search_volume?: number;
  keyword_difficulty?: number;
  cpc?: string | number;
  target_url?: string;
  source_dataset: string;
}

export interface ContentBrief {
  id: string;
  project_id: string;
  target_keyword: string;
  title_draft: string;
  search_intent: string;
  target_audience?: string;
  editorial_guidelines?: string;
  suggested_headings?: string[];
  internal_link_recommendations?: string[];
  competitor_references?: string[];
  status: 'draft' | 'review' | 'approved' | 'published';
  created_at: string;
}

export interface TimeSeriesPoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface LowHangingFruit {
  query: string;
  page: string;
  impressions: number;
  clicks: number;
  ctr_percent: number;
  position: number;
  potential_clicks: number;
}

export interface CoreWebVital {
  name: string;
  value: string;
  status: string;
  benchmark: string;
  description: string;
}

export interface PageSpeedData {
  target_url: string;
  measured_at: string;
  scores: {
    performance: number;
    accessibility: number;
    best_practices: number;
    seo: number;
  };
  core_web_vitals: CoreWebVital[];
  recommendations: string[];
}

export interface PlaybookFile {
  slug: string;
  title: string;
  filename: string;
  size_kb: number;
}

export interface PlaybookCategory {
  name: string;
  slug: string;
  playbooks: PlaybookFile[];
}
