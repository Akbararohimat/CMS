<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TemplateController extends Controller
{
    public function index()
    {
        $templates = Template::query()
            ->orderBy('name')
            ->paginate(15);

        return response()->json($templates);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:templates,slug'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:2048'],
            'default_config' => ['nullable', 'array'],
            'version' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $template = Template::create([
            ...$validated,
            'default_config' => $validated['default_config'] ?? [],
            'version' => $validated['version'] ?? 1,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Template berhasil dibuat.',
            'data' => $template,
        ], 201);
    }
    public function show(string $id)
    {
        $template = Template::findOrFail($id);

        return response()->json([
            'data' => $template,
        ]);
    }
    public function update(Request $request, string $id)
    {
        $template = Template::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('templates', 'slug')->ignore($template->id),
            ],
            'category' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['sometimes', 'nullable', 'string'],
            'thumbnail' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'default_config' => ['sometimes', 'array'],
            'version' => ['sometimes', 'integer', 'min:1'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $template->update($validated);

        return response()->json([
            'message' => 'Template berhasil diperbarui.',
            'data' => $template->fresh(),
        ]);
    }

    public function destroy(string $id)
    {
        $template = Template::findOrFail($id);

        if ($template->websites()->exists()) {
            return response()->json([
                'message' => 'Template tidak dapat dihapus karena masih digunakan oleh website.',
            ], 409);
        }

        $template->delete();

        return response()->json([
            'message' => 'Template berhasil dihapus.',
        ]);
    }
}
