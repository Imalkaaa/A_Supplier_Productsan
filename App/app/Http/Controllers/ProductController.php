<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Log; // Import Log facade
use Illuminate\Support\Facades\Storage; // Import Storage facade
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        return ProductResource::collection(
            Product::query()->orderBy("id", "desc")->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/products', 'public');
            $data['image'] = $path;
        }

        // Create the product
        $product = Product::create($data);

        // Log the creation of a new product
        Log::info('New product created: ', ['product_id' => $product->id]);

        // Return the product resource
        return response((new ProductResource($product))->toArray($request), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        // Check if a new image has been uploaded
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $path = $request->file('image')->store('images/products', 'public');
            $data['image'] = $path;
        }

        // Update the product
        $product->update($data);

        // Log the update of the product
        Log::info('Product updated: ', ['product_id' => $product->id]);

        return response((new ProductResource($product))->toArray($request), 200);
    }

   
    public function destroy(Product $product)
    {
        // Delete the image if it exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        // Delete the product
        $product->delete();

        // Log the deletion of the product
        Log::info('Product deleted: ', ['product_id' => $product->id]);

        return response()->noContent();
    }
}
