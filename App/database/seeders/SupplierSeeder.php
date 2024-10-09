<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::create([
            'supplierName' => 'ABC Distributors',
            'contactPerson' => 'Kamal Jayasekara',
            'phone' => '0776543210',
        ]);
        
        Supplier::create([
            'supplierName' => 'Sunrise Supplies',
            'contactPerson' => 'Nimal Perera',
            'phone' => '0712345678',
        ]);
        
        Supplier::create([
            'supplierName' => 'Lanka Traders',
            'contactPerson' => 'Ruwan Wickrama',
            'phone' => '0771234567',
        ]);
        
        Supplier::create([
            'supplierName' => 'Global Imports',
            'contactPerson' => 'Mahesh Fernando',
            'phone' => '0719876543',
        ]);
        
        Supplier::create([
            'supplierName' => 'Prime Distributors',
            'contactPerson' => 'Suresh Rajapaksha',
            'phone' => '0778901234',
        ]);
        
        Supplier::create([
            'supplierName' => 'Eastern Ventures',
            'contactPerson' => 'Ashen Kumarasinghe',
            'phone' => '0713456789',
        ]);
        
        Supplier::create([
            'supplierName' => 'Western Traders',
            'contactPerson' => 'Lasitha Rathnayake',
            'phone' => '0774321098',
        ]);
        
        Supplier::create([
            'supplierName' => 'Islandwide Imports',
            'contactPerson' => 'Ranga Jayasinghe',
            'phone' => '0717654321',
        ]);
        
        Supplier::create([
            'supplierName' => 'North Suppliers',
            'contactPerson' => 'Sandun Perera',
            'phone' => '0772345678',
        ]);
        
        Supplier::create([
            'supplierName' => 'Ceylon Exporters',
            'contactPerson' => 'Chamara Wijesinghe',
            'phone' => '0715432109',
        ]);
        
        Supplier::create([
            'supplierName' => 'Quality Wholesalers',
            'contactPerson' => 'Udara Kumara',
            'phone' => '0778765432',
        ]);
        
        Supplier::create([
            'supplierName' => 'Pinnacle Traders',
            'contactPerson' => 'Kasun De Silva',
            'phone' => '0716789012',
        ]);
        
        Supplier::create([
            'supplierName' => 'Elite Distributors',
            'contactPerson' => 'Nadeesha Gunaratne',
            'phone' => '0772109876',
        ]);
        
        Supplier::create([
            'supplierName' => 'Prestige Imports',
            'contactPerson' => 'Heshan Gunawardena',
            'phone' => '0713456709',
        ]);
        
        Supplier::create([
            'supplierName' => 'Citywide Distributors',
            'contactPerson' => 'Anura Wijeratne',
            'phone' => '0778904321',
        ]);
        
        Supplier::create([
            'supplierName' => 'Greenleaf Traders',
            'contactPerson' => 'Samantha Senanayake',
            'phone' => '0710987654',
        ]);
        
        Supplier::create([
            'supplierName' => 'Urban Supplies',
            'contactPerson' => 'Roshan Abeysekera',
            'phone' => '0775678901',
        ]);
        
        Supplier::create([
            'supplierName' => 'Southern Enterprises',
            'contactPerson' => 'Dilshan Ranatunga',
            'phone' => '0717654987',
        ]);
        
        Supplier::create([
            'supplierName' => 'New Horizons Traders',
            'contactPerson' => 'Thilina Karunaratne',
            'phone' => '0773210987',
        ]);
        
        Supplier::create([
            'supplierName' => 'Everest Supplies',
            'contactPerson' => 'Ravindra Weerasinghe',
            'phone' => '0714321098',
        ]);
    }
}
