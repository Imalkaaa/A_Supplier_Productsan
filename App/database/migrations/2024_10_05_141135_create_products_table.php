<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplierId')->constrained('suppliers')->onDelete('cascade'); // Foreign key to suppliers table
            $table->string('productName'); // Add product name column
            $table->decimal('productPrice', 10, 2); // Add product price column
            $table->string('image')->nullable(); // Add image column (nullable if you want)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
