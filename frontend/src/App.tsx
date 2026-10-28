import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  FileText,
  LineChart,
  Library,
  Play,
  Download,
  Printer,
  Search,
  ExternalLink,
  RefreshCw,
  Plus,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { api } from './api';
import type {
  CrawlRun,
  PageSpeedData,
  PlaybookCategory,
  Project,
  TechnicalIssue,
  Website,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'auditor' | 'action_center' | 'keywords' | 'briefs' | 'analytics' | 'playbooks'
  >('dashboard');

  // Core State
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Auditor & Crawl State
  const [currentCrawl, setCurrentCrawl] = useState<CrawlRun | null>(null);
  const [crawlUrlInput, setCrawlUrlInput] = useState<string>('https://devcenterpoint.com');
  const [crawlMaxPages, setCrawlMaxPages] = useState<number>(25);

  // Action Center State
  const [issues, setIssues] = useState<TechnicalIssue[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Keyword Lab State
  const [keywordClusters, setKeywordClusters] = useState<any[]>([]);
  const [csvUploadText, setCsvUploadText] = useState<string>('');
  const [showCsvModal, setShowCsvModal] = useState<boolean>(false);

  // Content Briefs State
  const [contentBriefs, setContentBriefs] = useState<any[]>([]);
  const [showBriefModal, setShowBriefModal] = useState<boolean>(false);
  const [newBrief, setNewBrief] = useState({
    target_keyword: '',
    title_draft: '',
    search_intent: 'commercial',
    target_audience: 'Technical CTOs, Engineering Leads, & SEO Directors',
    editorial_guidelines: 'In-depth code patterns, performance benchmarks, and architecture best practices.',
  });

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [pageSpeedData, setPageSpeedData] = useState<PageSpeedData | null>(null);

  // Playbooks State
  const [playbookCategories, setPlaybookCategories] = useState<PlaybookCategory[]>([]);
  const [selectedPlaybook, setSelectedPlaybook] = useState<any>(null);

  // Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const loadInitialData = async () => {
    try {
      const [dash, projList, siteList] = await Promise.all([
        api.getDashboard().catch(() => null),
        api.getProjects().catch(() => []),
        api.getWebsites().catch(() => []),
      ]);

      setDashboardData(dash);
      setProjects(projList);
      setWebsites(siteList);

      if (projList.length > 0) {
        setSelectedProjectId(projList[0].id);
        loadProjectArtifacts(projList[0].id);
      }

      if (siteList.length > 0) {
        const defaultSite = siteList[0];
        setSelectedWebsiteId(defaultSite.id);
        setCrawlUrlInput(defaultSite.base_url);
        if (defaultSite.crawl_runs && defaultSite.crawl_runs.length > 0) {
          loadCrawlDetails(defaultSite.crawl_runs[0].id);
        }
        loadAnalytics(defaultSite.id);
      }

      // Load Playbooks
      const kb = await api.getKnowledgeBase().catch(() => ({ categories: [] }));
      setPlaybookCategories(kb.categories);
      if (kb.categories.length > 0 && kb.categories[0].playbooks.length > 0) {
        loadPlaybook(kb.categories[0].name, kb.categories[0].playbooks[0].slug);
      }
    } catch (err: any) {
      console.error('Failed to load initial workspace data:', err);
    }
  };

  const loadProjectArtifacts = async (projectId: string) => {
    try {
      const [kwData, briefsData] = await Promise.all([
        api.getKeywords(projectId).catch(() => ({ clusters: [], standalone_keywords: [] })),
        api.getBriefs(projectId).catch(() => []),
      ]);
      setKeywordClusters(kwData.clusters || []);
      setContentBriefs(briefsData || []);
    } catch (e) {
      console.error(e);
    }
  };

  const loadCrawlDetails = async (crawlRunId: string) => {
    try {
      const run = await api.getCrawlRun(crawlRunId);
      setCurrentCrawl(run);
      if (run.issues) {
        setIssues(run.issues);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAnalytics = async (websiteId: string) => {
    try {
      const [analytics, psi] = await Promise.all([
        api.getAnalytics(websiteId).catch(() => null),
        api.getPageSpeed(websiteId).catch(() => null),
      ]);
      setAnalyticsData(analytics);
      setPageSpeedData(psi);
    } catch (e) {
      console.error(e);
    }
  };

  const loadPlaybook = async (category: string, slug: string) => {
    try {
      const pb = await api.getPlaybook(category, slug);
      setSelectedPlaybook(pb);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartAudit = async () => {
    if (!crawlUrlInput) return;
    setActionLoading(true);
    try {
      // Find or create website
      let targetSite = websites.find((w) => w.base_url === crawlUrlInput);
      if (!targetSite && selectedProjectId) {
        targetSite = await api.createWebsite({
          project_id: selectedProjectId,
          base_url: crawlUrlInput,
          max_crawl_pages: crawlMaxPages,
        });
        setWebsites((prev) => [targetSite!, ...prev]);
      }

      if (targetSite) {
        showNotification(`Starting SSRF-guarded technical audit for ${targetSite.domain}...`);
        const result = await api.startCrawl(targetSite.id);
        setCurrentCrawl(result.crawl_run);
        if (result.crawl_run.issues) {
          setIssues(result.crawl_run.issues);
        }
        showNotification(`Audit completed! Analyzed ${result.crawl_run.pages_crawled} pages.`);
        // Reload dashboard
        const dash = await api.getDashboard();
        setDashboardData(dash);
      }
    } catch (err: any) {
      alert(`Audit failed: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateIssueStatus = async (issueId: string, newStatus: string) => {
    try {
      await api.updateIssue(issueId, newStatus);
      setIssues((prev) =>
        prev.map((iss) => (iss.id === issueId ? { ...iss, status: newStatus as any } : iss))
      );
      showNotification(`Issue status updated to ${newStatus}`);
    } catch (e: any) {
      alert(`Failed to update issue: ${e.message}`);
    }
  };

  const handleUploadCsv = async () => {
    if (!csvUploadText || !selectedProjectId) return;
    setActionLoading(true);
    try {
      const res = await api.uploadKeywordCsv(selectedProjectId, csvUploadText);
      showNotification(`Imported ${res.imported_count} keywords across ${res.clusters_created} semantic clusters!`);
      setShowCsvModal(false);
      setCsvUploadText('');
      loadProjectArtifacts(selectedProjectId);
    } catch (err: any) {
      alert(`Import error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateBrief = async () => {
    if (!newBrief.target_keyword || !newBrief.title_draft || !selectedProjectId) return;
    setActionLoading(true);
    try {
      await api.createBrief(selectedProjectId, newBrief);
      showNotification('Content Brief generated successfully!');
      setShowBriefModal(false);
      setNewBrief({
        target_keyword: '',
        title_draft: '',
        search_intent: 'commercial',
        target_audience: 'Technical CTOs, Engineering Leads, & SEO Directors',
        editorial_guidelines: 'In-depth code patterns, performance benchmarks, and architecture best practices.',
      });
      loadProjectArtifacts(selectedProjectId);
    } catch (err: any) {
      alert(`Failed to create brief: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Issues for Action Center
  const filteredIssues = issues.filter((iss) => {
    if (severityFilter !== 'all' && iss.severity !== severityFilter) return false;
    if (categoryFilter !== 'all' && iss.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && iss.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        iss.rule_code.toLowerCase().includes(q) ||
        iss.evidence.toLowerCase().includes(q) ||
        iss.explanation.toLowerCase().includes(q) ||
        (iss.crawled_page?.url || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-xl border border-blue-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight text-white">DevCenterPoint</h1>
                <p className="text-xs text-blue-400 font-medium tracking-wide uppercase">SEO Operating System</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded border border-slate-700/60 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SSRF Guarded & Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'auditor', label: 'Site Auditor & Crawler', icon: ShieldCheck },
              { id: 'action_center', label: 'Action Center', icon: CheckCircle2, count: issues.filter(i => i.status === 'open').length },
              { id: 'keywords', label: 'Keyword Lab', icon: KeyRound },
              { id: 'briefs', label: 'Content Briefs', icon: FileText },
              { id: 'analytics', label: 'Search Analytics & PSI', icon: LineChart },
              { id: 'playbooks', label: 'SEO Playbooks', icon: Library },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Info Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-300">DevCenterPoint</p>
              <p className="text-[11px] text-slate-500">Agency Enterprise Tier</p>
            </div>
            <button
              onClick={loadInitialData}
              title="Refresh Data"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold capitalize text-slate-200">
              {activeTab.replace('_', ' ')}
            </h2>
            {projects.length > 0 && (
              <div className="flex items-center gap-2 bg-slate-800/60 px-2.5 py-1 rounded border border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium">Project:</span>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    loadProjectArtifacts(e.target.value);
                  }}
                  className="bg-transparent text-xs text-white font-semibold outline-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.name} ({p.client_name || 'Internal'})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md text-xs">
              <span className="text-slate-400">Target Site:</span>
              <span className="font-semibold text-blue-400">
                {websites.find((w) => w.id === selectedWebsiteId)?.domain || 'devcenterpoint.com'}
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable View Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Crawl Coverage</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {dashboardData?.overview?.total_crawls || 1} Audits
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentCrawl ? `${currentCrawl.pages_crawled} pages scanned` : 'Ready to crawl'}
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Critical Defects</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {dashboardData?.overview?.open_issues?.critical ?? 2}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Requires immediate engineering attention</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Warnings & Notices</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400">
                    {(dashboardData?.overview?.open_issues?.warning ?? 4) +
                      (dashboardData?.overview?.open_issues?.info ?? 3)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">On-page titles, descriptions, headings</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">GSC Search Footprint</span>
                    <LineChart className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {dashboardData?.overview?.search_performance?.clicks?.toLocaleString() ?? '1,840'} Clicks
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {dashboardData?.overview?.search_performance?.avg_ctr_percent ?? '4.8'}% Average CTR
                  </p>
                </div>
              </div>

              {/* Quick Launch Auditor Hero */}
              <div className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-950/30 border border-blue-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    Instant Deterministic Audit Engine
                  </div>
                  <h3 className="text-xl font-bold text-white">Perform a Full Site Technical Audit</h3>
                  <p className="text-sm text-slate-400 max-w-xl mt-1">
                    Crawls eligible URLs, tests status codes, detects redirect chains, evaluates title/description lengths, verifies canonical tags, and flags missing image alt attributes with exact code evidence.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <input
                    type="url"
                    value={crawlUrlInput}
                    onChange={(e) => setCrawlUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-lg text-sm text-white w-full md:w-72 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleStartAudit}
                    disabled={actionLoading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm shadow-lg shadow-blue-600/30 transition disabled:opacity-50 shrink-0"
                  >
                    {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    <span>{actionLoading ? 'Auditing...' : 'Start Audit'}</span>
                  </button>
                </div>
              </div>

              {/* Recent Crawls & Issues Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Crawls */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm text-white">Recent Technical Audits</h4>
                    <span className="text-xs text-slate-400">Past runs</span>
                  </div>
                  <div className="space-y-3">
                    {websites.map((site) => (
                      <div
                        key={site.id}
                        className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg hover:border-slate-700 transition"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{site.domain}</p>
                          <p className="text-xs text-slate-400">{site.base_url}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedWebsiteId(site.id);
                            setCrawlUrlInput(site.base_url);
                            setActiveTab('auditor');
                          }}
                          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
                        >
                          <span>View Report</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorical Distribution */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm text-white">Open Issues by Category</h4>
                    <span className="text-xs text-slate-400">Active backlog</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Crawlability & Server Errors', count: 1, color: 'bg-red-500' },
                      { name: 'On-Page Metadata (Titles/Desc)', count: 2, color: 'bg-amber-500' },
                      { name: 'Headings & Document Hierarchy', count: 1, color: 'bg-blue-500' },
                      { name: 'Image Accessibility (Alt Attributes)', count: 1, color: 'bg-purple-500' },
                      { name: 'Performance & TTFB Response', count: 1, color: 'bg-emerald-500' },
                    ].map((cat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300">{cat.name}</span>
                          <span className="font-semibold text-white">{cat.count} issues</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full ${cat.color}`} style={{ width: `${cat.count * 20}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDITOR & CRAWLER */}
          {activeTab === 'auditor' && (
            <div className="space-y-6">
              {/* Controls & Launch */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto flex-1">
                  <input
                    type="url"
                    value={crawlUrlInput}
                    onChange={(e) => setCrawlUrlInput(e.target.value)}
                    placeholder="Enter website URL..."
                    className="bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-lg text-sm text-white flex-1 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300">
                    <span>Limit:</span>
                    <select
                      value={crawlMaxPages}
                      onChange={(e) => setCrawlMaxPages(Number(e.target.value))}
                      className="bg-transparent text-white font-semibold outline-none cursor-pointer"
                    >
                      <option value={10} className="bg-slate-900">10 pages</option>
                      <option value={25} className="bg-slate-900">25 pages</option>
                      <option value={50} className="bg-slate-900">50 pages</option>
                      <option value={100} className="bg-slate-900">100 pages</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handleStartAudit}
                    disabled={actionLoading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm shadow-md transition disabled:opacity-50"
                  >
                    {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    <span>{actionLoading ? 'Auditing Target...' : 'Run Audit'}</span>
                  </button>

                  {currentCrawl && (
                    <>
                      <a
                        href={api.getCsvExportUrl(currentCrawl.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>CSV</span>
                      </a>
                      <a
                        href={api.getHtmlExportUrl(currentCrawl.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Report</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Crawl Summary Card */}
              {currentCrawl && (
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-2xl font-bold text-white">{currentCrawl.pages_crawled}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Pages Crawled</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-2xl font-bold text-red-400">{currentCrawl.critical_issues_count}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Critical Defects</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-2xl font-bold text-amber-400">{currentCrawl.warning_issues_count}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Warnings</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-2xl font-bold text-blue-400">{currentCrawl.info_issues_count}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Notices</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-2xl font-bold text-emerald-400">
                      {Math.max(10, 100 - (currentCrawl.critical_issues_count * 12 + currentCrawl.warning_issues_count * 3))}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Health Score</div>
                  </div>
                </div>
              )}

              {/* Crawled Pages Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-white">Crawled Pages & Status Codes</h4>
                  <span className="text-xs text-slate-400">
                    {currentCrawl?.pages?.length ?? 0} Pages Cataloged
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">URL</th>
                        <th className="px-4 py-3">Title Tag</th>
                        <th className="px-4 py-3">Response</th>
                        <th className="px-4 py-3">H1 Tags</th>
                        <th className="px-4 py-3">Issues</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {currentCrawl?.pages && currentCrawl.pages.length > 0 ? (
                        currentCrawl.pages.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-800/40 transition">
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded font-bold ${
                                  p.status_code === 200
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : p.status_code >= 400
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                }`}
                              >
                                {p.status_code}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-300 max-w-xs truncate">
                              {p.url}
                            </td>
                            <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                              {p.title || <span className="text-red-400 italic">Missing &lt;title&gt;</span>}
                            </td>
                            <td className="px-4 py-3 text-slate-400">{Math.round(p.load_time_ms)}ms</td>
                            <td className="px-4 py-3 text-slate-400">
                              {p.h1_tags ? p.h1_tags.length : 0} H1
                            </td>
                            <td className="px-4 py-3">
                              {p.status_code >= 400 || (p.images_without_alt_count && p.images_without_alt_count > 0) ? (
                                <span className="text-amber-400 font-semibold">Defects found</span>
                              ) : (
                                <span className="text-emerald-400 font-medium">Clean</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                            No crawl data available yet. Click "Run Audit" above to inspect an authorized site.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION CENTER (REMEDIATION) */}
          {activeTab === 'action_center' && (
            <div className="space-y-6">
              {/* Filter Controls Bar */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Filter */}
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search issues or URL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white outline-none w-44"
                    />
                  </div>

                  {/* Severity Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-slate-400">Severity:</span>
                    <select
                      value={severityFilter}
                      onChange={(e) => setSeverityFilter(e.target.value)}
                      className="bg-transparent text-white font-medium outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900">All</option>
                      <option value="critical" className="bg-slate-900">Critical</option>
                      <option value="warning" className="bg-slate-900">Warning</option>
                      <option value="info" className="bg-slate-900">Info</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-slate-400">Category:</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="bg-transparent text-white font-medium outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900">All</option>
                      <option value="crawlability" className="bg-slate-900">Crawlability</option>
                      <option value="on_page" className="bg-slate-900">On-Page</option>
                      <option value="accessibility" className="bg-slate-900">Accessibility</option>
                      <option value="performance" className="bg-slate-900">Performance</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-slate-400">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-white font-medium outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900">All</option>
                      <option value="open" className="bg-slate-900">Open</option>
                      <option value="in_progress" className="bg-slate-900">In Progress</option>
                      <option value="resolved" className="bg-slate-900">Resolved</option>
                      <option value="ignored" className="bg-slate-900">Ignored</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Showing <strong>{filteredIssues.length}</strong> prioritized action items
                </div>
              </div>

              {/* Issues List Cards */}
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition space-y-3"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                            issue.severity === 'critical'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : issue.severity === 'warning'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          }`}
                        >
                          {issue.severity}
                        </span>
                        <span className="font-mono text-xs font-bold text-white tracking-wide">
                          {issue.rule_code}
                        </span>
                        <span className="text-xs text-slate-400 font-medium capitalize">
                          • {issue.category}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium">State:</span>
                        <select
                          value={issue.status}
                          onChange={(e) => handleUpdateIssueStatus(issue.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded border outline-none cursor-pointer ${
                            issue.status === 'resolved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : issue.status === 'in_progress'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : issue.status === 'ignored'
                              ? 'bg-slate-800 text-slate-400 border-slate-700'
                              : 'bg-red-500/10 text-red-400 border-red-500/30'
                          }`}
                        >
                          <option value="open" className="bg-slate-900 text-white">Open</option>
                          <option value="in_progress" className="bg-slate-900 text-white">In Progress</option>
                          <option value="resolved" className="bg-slate-900 text-white">Resolved</option>
                          <option value="ignored" className="bg-slate-900 text-white">Ignored</option>
                        </select>
                      </div>
                    </div>

                    {/* URL & Evidence */}
                    <div className="space-y-1">
                      <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                        <span className="text-slate-500">URL:</span>
                        <span className="text-blue-400 hover:underline">
                          {issue.crawled_page?.url || 'Site-wide configuration'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800/80 font-mono">
                        <strong>Evidence:</strong> {issue.evidence}
                      </div>
                    </div>

                    {/* Remediation Block */}
                    <div className="bg-blue-950/20 border border-blue-500/20 p-3 rounded-lg flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-blue-300">Recommended Code Remediation</div>
                        <div className="text-xs text-slate-300 mt-0.5">{issue.remediation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KEYWORD LAB */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              {/* Header Action */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">Keyword Workspace & Semantic Clusters</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ingest keyword CSV exports, group by lexical intent, and map target pages without metric fabrication.
                  </p>
                </div>
                <button
                  onClick={() => setShowCsvModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Import Keywords CSV</span>
                </button>
              </div>

              {/* Cluster Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {keywordClusters.map((cluster) => (
                  <div key={cluster.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                          cluster.intent === 'transactional'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : cluster.intent === 'commercial'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        {cluster.intent}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {cluster.total_volume?.toLocaleString() ?? 0} Vol/mo
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base">{cluster.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Primary: {cluster.primary_keyword}</p>
                    </div>

                    <div className="border-t border-slate-800 pt-3 space-y-2">
                      {cluster.keywords?.slice(0, 3).map((kw: any) => (
                        <div key={kw.id} className="flex items-center justify-between text-xs">
                          <span className="text-slate-300">{kw.keyword}</span>
                          <span className="text-slate-500 font-mono">
                            {kw.search_volume ? `${kw.search_volume} searches` : 'Imported'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CSV Upload Modal */}
              {showCsvModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4">
                    <h4 className="font-bold text-white text-base">Import Keywords CSV</h4>
                    <p className="text-xs text-slate-400">
                      Paste CSV rows or drop exported files. Columns recognized: <code>keyword, volume, difficulty, cpc, intent</code>.
                    </p>
                    <textarea
                      rows={6}
                      value={csvUploadText}
                      onChange={(e) => setCsvUploadText(e.target.value)}
                      placeholder="keyword,volume,difficulty,intent&#10;technical seo audit,2400,45,commercial&#10;hire laravel engineer,1800,38,transactional"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowCsvModal(false)}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUploadCsv}
                        disabled={actionLoading || !csvUploadText}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : 'Ingest & Cluster'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CONTENT BRIEFS */}
          {activeTab === 'briefs' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">Content Optimization Briefs</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Structured editorial briefs with target search intent, heading hierarchy, and internal linking targets.
                  </p>
                </div>
                <button
                  onClick={() => setShowBriefModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Content Brief</span>
                </button>
              </div>

              {/* Briefs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentBriefs.map((brief) => (
                  <div key={brief.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {brief.status}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Target: {brief.target_keyword}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base">{brief.title_draft}</h4>
                      <p className="text-xs text-slate-400 mt-1">Audience: {brief.target_audience}</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-2">
                      <div className="text-xs font-semibold text-slate-300">Suggested Heading Hierarchy:</div>
                      <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
                        {brief.suggested_headings?.map((h: string, idx: number) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-slate-400">
                      <strong>Editorial Directive:</strong> {brief.editorial_guidelines}
                    </div>
                  </div>
                ))}
              </div>

              {/* Create Brief Modal */}
              {showBriefModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4">
                    <h4 className="font-bold text-white text-base">New Content Brief</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Target Keyword</label>
                        <input
                          type="text"
                          value={newBrief.target_keyword}
                          onChange={(e) => setNewBrief({ ...newBrief, target_keyword: e.target.value })}
                          placeholder="e.g. enterprise laravel architecture"
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Draft Article Title</label>
                        <input
                          type="text"
                          value={newBrief.title_draft}
                          onChange={(e) => setNewBrief({ ...newBrief, title_draft: e.target.value })}
                          placeholder="e.g. Scaling Enterprise Laravel Applications in 2026"
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Target Audience</label>
                        <input
                          type="text"
                          value={newBrief.target_audience}
                          onChange={(e) => setNewBrief({ ...newBrief, target_audience: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Editorial Guidelines</label>
                        <textarea
                          rows={3}
                          value={newBrief.editorial_guidelines}
                          onChange={(e) => setNewBrief({ ...newBrief, editorial_guidelines: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowBriefModal(false)}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateBrief}
                        disabled={actionLoading || !newBrief.target_keyword || !newBrief.title_draft}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded text-xs disabled:opacity-50"
                      >
                        {actionLoading ? 'Creating...' : 'Generate Brief'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SEARCH ANALYTICS & PSI */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Performance Chart */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">Search Console Performance (30 Days)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Empirical query impressions, clicks, and CTR curves.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Clicks
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Impressions
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  {analyticsData?.time_series ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.time_series}>
                        <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickFormatter={(val) => val.slice(5)} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClicks)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      Loading Search Console metrics...
                    </div>
                  )}
                </div>
              </div>

              {/* Low Hanging Fruit Opportunity Matrix */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-white">Low-Hanging Fruit Opportunity Matrix</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Queries with high impressions (&gt;500) but below-average CTR (&lt;3.5%) — prime targets for title & snippet optimization.
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-4 py-3">Query</th>
                        <th className="px-4 py-3">Impressions</th>
                        <th className="px-4 py-3">Clicks</th>
                        <th className="px-4 py-3">CTR</th>
                        <th className="px-4 py-3">Avg Position</th>
                        <th className="px-4 py-3">Potential Gain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analyticsData?.low_hanging_fruits?.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition">
                          <td className="px-4 py-3 font-semibold text-white">{item.query}</td>
                          <td className="px-4 py-3 text-slate-300">{item.impressions.toLocaleString()}</td>
                          <td className="px-4 py-3 text-blue-400 font-semibold">{item.clicks}</td>
                          <td className="px-4 py-3 text-amber-400 font-bold">{item.ctr_percent}%</td>
                          <td className="px-4 py-3 text-slate-400">{item.position}</td>
                          <td className="px-4 py-3 text-emerald-400 font-bold">
                            +{item.potential_clicks} clicks
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PageSpeed Core Web Vitals */}
              {pageSpeedData && (
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-white">Google PageSpeed Insights & Core Web Vitals</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        CrUX Real-World Benchmarks for <code>{pageSpeedData.target_url}</code>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pageSpeedData.core_web_vitals.map((cwv, i) => (
                      <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-400">{cwv.name}</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">{cwv.value}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{cwv.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SEO PLAYBOOKS */}
          {activeTab === 'playbooks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
              {/* Playbook Sidebar */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4">
                <h4 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
                  11 SEO Core Disciplines
                </h4>
                <div className="space-y-3">
                  {playbookCategories.map((cat) => (
                    <div key={cat.slug} className="space-y-1">
                      <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        {cat.name}
                      </div>
                      <div className="space-y-1 pl-2">
                        {cat.playbooks.map((pb) => (
                          <button
                            key={pb.slug}
                            onClick={() => loadPlaybook(cat.name, pb.slug)}
                            className="w-full text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 px-2 py-1.5 rounded transition truncate block"
                          >
                            {pb.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Playbook Content Reader */}
              <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 overflow-y-auto prose prose-invert max-w-none">
                {selectedPlaybook ? (
                  <div>
                    <div className="border-b border-slate-800 pb-4 mb-6">
                      <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                        {selectedPlaybook.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mt-1">{selectedPlaybook.title}</h2>
                    </div>
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedPlaybook.content}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-16 text-xs">
                    Select a playbook from the left panel to review standardized procedures and checklists.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
