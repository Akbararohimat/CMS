<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Template;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class WebsiteController extends Controller
{
    /**
     * Display a listing of websites.
     */
    public function index()
    {
        $websites = Website::with([
            'customer:id,company_name,contact_name',
            'template:id,name,slug,category',
            'config:id,website_id,version',
        ])
            ->latest()
            ->paginate(15);

        return response()->json($websites);
    }

    /**
     * Create a website and clone its template config.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => [
                'required',
                'integer',
                'exists:customers,id',
            ],
            'template_id' => [
                'required',
                'integer',
                'exists:templates,id',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('websites', 'slug'),
            ],
            'domain' => [
                'nullable',
                'string',
                'max:255',
                'unique:websites,domain',
            ],
            'status' => [
                'sometimes',
                Rule::in(['draft', 'active', 'inactive']),
            ],
        ]);

        $customer = Customer::findOrFail($validated['customer_id']);

        $template = Template::where('is_active', true)
            ->findOrFail($validated['template_id']);

        $website = DB::transaction(function () use (
            $validated,
            $customer,
            $template
        ) {
            $website = $customer->websites()->create([
                'template_id' => $template->id,
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'domain' => $validated['domain'] ?? null,
                'status' => $validated['status'] ?? 'draft',
            ]);

            $website->config()->create([
                'config' => $template->default_config,
                'version' => 1,
            ]);

            return $website;
        });

        return response()->json([
            'message' => 'Website berhasil dibuat.',
            'data' => $website->load([
                'customer',
                'template',
                'config',
            ]),
        ], 201);
    }

    /**
     * Display a specific website.
     */
    public function show(string $id)
    {
        $website = Website::with([
            'customer',
            'template',
            'config',
            'media',
        ])->findOrFail($id);

        return response()->json([
            'data' => $website,
        ]);
    }

    /**
     * Update website information.
     */
    public function update(Request $request, string $id)
    {
        $website = Website::findOrFail($id);

        $validated = $request->validate([
            'customer_id' => [
                'sometimes',
                'integer',
                'exists:customers,id',
            ],
            'template_id' => [
                'sometimes',
                'integer',
                'exists:templates,id',
            ],
            'name' => [
                'sometimes',
                'string',
                'max:255',
            ],
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('websites', 'slug')
                    ->ignore($website->id),
            ],
            'domain' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('websites', 'domain')
                    ->ignore($website->id),
            ],
            'status' => [
                'sometimes',
                Rule::in(['draft', 'active', 'inactive']),
            ],
        ]);

        if (isset($validated['template_id'])) {
            $template = Template::where('is_active', true)
                ->findOrFail($validated['template_id']);

            // Mengubah template tidak otomatis mengganti config website.
        }

        $website->update($validated);

        return response()->json([
            'message' => 'Website berhasil diperbarui.',
            'data' => $website->fresh()->load([
                'customer',
                'template',
                'config',
            ]),
        ]);
    }

    /**
     * Delete a website.
     */
    public function destroy(string $id)
    {
        $website = Website::findOrFail($id);

        $website->delete();

        return response()->json([
            'message' => 'Website berhasil dihapus.',
        ]);
    }
}
