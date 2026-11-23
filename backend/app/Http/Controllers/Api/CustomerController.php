<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::query()
            ->withCount('websites')
            ->latest()
            ->paginate(10);

        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        $customer = Customer::create($validated);

        return response()->json([
            'message' => 'Customer berhasil ditambahkan.',
            'data' => $customer,
        ], 201);
    }

    public function show(Customer $customer)
    {
        $customer->load([
            'websites.template',
            'websites.config',
        ]);

        return response()->json([
            'data' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'company_name' => ['sometimes', 'required', 'string', 'max:255'],
            'contact_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:30'],
            'address' => ['sometimes', 'nullable', 'string'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        $customer->update($validated);

        return response()->json([
            'message' => 'Customer berhasil diperbarui.',
            'data' => $customer->fresh()->loadCount('websites'),
        ]);
    }

    public function destroy(Customer $customer)
    {
        if ($customer->websites()->exists() || $customer->users()->exists()) {
            return response()->json([
                'message' => 'customer tidak dapat dihapus karena masih memiliki website atau akun pengguna.',
            ], 409);
        }

        $customer->delete();
        return response()->json([
            'message' => 'Customer berhasil dihapus.',
        ]);
    }
}
