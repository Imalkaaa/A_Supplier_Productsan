# Supplier Products Management System

This is a **Supplier Products Management System** built using **Laravel** for the backend and **Vue.js** for the frontend. The system allows users to manage suppliers and their associated products. Users can perform CRUD (Create, Read, Update, Delete) operations on suppliers and products, as well as search and list suppliers with their respective products.

## Features

- **Supplier Management**
  - Add, update, delete, and list suppliers.
  - Each supplier has a name, contact person, and phone number.
  
- **Product Management**
  - Add, update, delete, and list products for each supplier.
  - Each product has a name, price, and image.

- **Search Functionality**
  - Search for suppliers by name.
  
- **Form Validation**
  - Phone number validation (must contain 10 digits).
  - Ensure all required fields are filled before submission.

## Technologies Used

### Backend
- **Laravel 11.26.0** (PHP Framework)
  - Migrations
  - Seeders
  - Repository Pattern
  - RESTful API for Supplier and Product management
  - Validation
  
### Frontend
- **Vue.js**
  - Vue Router
  - Axios for API requests
  - Dynamic form handling (add/remove products)
  
### Development Tools
- **Visual Studio Code**
- **GitHub/Bitbucket** for version control

## Installation

### Prerequisites

Ensure you have the following installed:
- **PHP >= 8.1**
- **Composer**
- **Node.js & npm**
- **MySQL/MariaDB**

### Backend (Laravel)

1. Clone the repository:

   ```bash
   git clone https://github.com/Imalkaaa/A_Supplier_Productsan.git
   cd supplier-products-management
