<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

  public function rules()
{
    return [
        'supplierId' => 'required|exists:suppliers,id', 
        'productName' => 'required|string|max:255', 
        'productPrice' => 'required|numeric', 
        'image' => 'nullable|image|max:2048', 
    ];
}


    public function messages()
    {
        return [
            'supplierId.required' => 'The supplier ID is required.',
            'supplierId.exists' => 'The selected supplier does not exist.',
            'productName.required' => 'The product name is required.',
            'productPrice.required' => 'The product price is required.',
            'productPrice.numeric' => 'The product price must be a number.',
            'image.image' => 'The file must be an image.',
            'image.max' => 'The image must not be greater than 2MB.',
        ];
    }
}
