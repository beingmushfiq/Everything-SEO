<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class KnowledgeBaseController extends Controller
{
    /**
     * Get knowledge base categories and available playbooks.
     */
    public function index(): JsonResponse
    {
        $kbPath = base_path('../knowledge-base');

        if (!File::exists($kbPath)) {
            return response()->json(['categories' => []]);
        }

        $categories = [];
        $directories = File::directories($kbPath);

        foreach ($directories as $dir) {
            $catName = basename($dir);
            $files = File::files($dir);

            $playbooks = [];
            foreach ($files as $file) {
                if ($file->getExtension() === 'md') {
                    $content = File::get($file->getRealPath());
                    $title = $this->extractTitle($content) ?: basename($file->getFilename(), '.md');

                    $playbooks[] = [
                        'slug' => basename($file->getFilename(), '.md'),
                        'title' => $title,
                        'filename' => $file->getFilename(),
                        'size_kb' => round($file->getSize() / 1024, 1),
                    ];
                }
            }

            $categories[] = [
                'name' => $catName,
                'slug' => strtolower(str_replace(' ', '-', $catName)),
                'playbooks' => $playbooks,
            ];
        }

        return response()->json(['categories' => $categories]);
    }

    /**
     * Show a specific playbook's markdown content.
     */
    public function show(string $category, string $slug): JsonResponse
    {
        $kbPath = base_path('../knowledge-base');
        $targetFile = "{$kbPath}/{$category}/{$slug}.md";

        if (!File::exists($targetFile)) {
            // Case-insensitive fallback
            $found = null;
            foreach (File::directories($kbPath) as $dir) {
                if (strtolower(basename($dir)) === strtolower($category)) {
                    foreach (File::files($dir) as $f) {
                        if (strtolower(basename($f->getFilename(), '.md')) === strtolower($slug)) {
                            $found = $f->getRealPath();
                            break 2;
                        }
                    }
                }
            }
            if ($found) {
                $targetFile = $found;
            } else {
                return response()->json(['error' => 'Playbook not found.'], 404);
            }
        }

        $content = File::get($targetFile);

        return response()->json([
            'category' => $category,
            'slug' => $slug,
            'title' => $this->extractTitle($content),
            'content' => $content,
        ]);
    }

    protected function extractTitle(string $markdown): ?string
    {
        if (preg_match('/^#\s+(.+)$/m', $markdown, $matches)) {
            return trim($matches[1]);
        }
        if (preg_match('/title:\s*["\']?([^"\']+)["\']?/i', $markdown, $matches)) {
            return trim($matches[1]);
        }
        return null;
    }
}
