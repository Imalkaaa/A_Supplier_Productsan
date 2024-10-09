<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Remove auth:sanctum middleware
Route::apiResource('/supplier', SupplierController::class);
Route::apiResource('/suppliers', SupplierController::class);
Route::apiResource('/product', ProductController::class);
Route::apiResource('/products', ProductController::class);
