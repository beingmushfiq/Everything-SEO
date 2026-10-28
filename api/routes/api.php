<?php

use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\ContentBriefController;
use App\Http\Controllers\Api\CrawlRunController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\KeywordController;
use App\Http\Controllers\Api\KnowledgeBaseController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\WebsiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| DevCenterPoint SEO Command Center API Routes
|--------------------------------------------------------------------------
*/

// Operational Overview
Route::get('/dashboard', [DashboardController::class, 'index']);

// Projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Target Websites & Instant Audits
Route::get('/websites', [WebsiteController::class, 'index']);
Route::post('/websites', [WebsiteController::class, 'store']);
Route::get('/websites/{id}', [WebsiteController::class, 'show']);
Route::post('/websites/{id}/crawl', [WebsiteController::class, 'startCrawl']);

// Crawl Runs & Technical Issues
Route::get('/crawl-runs/{id}', [CrawlRunController::class, 'show']);
Route::get('/crawl-runs/{id}/issues', [CrawlRunController::class, 'issues']);
Route::patch('/issues/{id}', [CrawlRunController::class, 'updateIssue']);
Route::get('/crawl-runs/{id}/export/csv', [CrawlRunController::class, 'exportCsv']);
Route::get('/crawl-runs/{id}/export/html', [CrawlRunController::class, 'exportHtml']);

// Keyword Lab & Clusters
Route::get('/projects/{projectId}/keywords', [KeywordController::class, 'index']);
Route::post('/projects/{projectId}/keywords/upload', [KeywordController::class, 'uploadCsv']);
Route::delete('/keywords/{id}', [KeywordController::class, 'destroy']);

// Content Briefs
Route::get('/projects/{projectId}/briefs', [ContentBriefController::class, 'index']);
Route::post('/projects/{projectId}/briefs', [ContentBriefController::class, 'store']);
Route::patch('/briefs/{id}', [ContentBriefController::class, 'update']);

// Search Analytics & Core Web Vitals
Route::get('/websites/{websiteId}/analytics', [AnalyticsController::class, 'performance']);
Route::get('/websites/{websiteId}/pagespeed', [AnalyticsController::class, 'pageSpeed']);

// SEO Playbooks & Knowledge Base
Route::get('/knowledge-base', [KnowledgeBaseController::class, 'index']);
Route::get('/knowledge-base/{category}/{slug}', [KnowledgeBaseController::class, 'show']);
