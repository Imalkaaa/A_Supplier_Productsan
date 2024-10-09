import {createBrowserRouter} from 'react-router-dom';
import Suppliers from './views/suppliers';
import SupplierForm from './views/supplierForm';
import Products from './views/products';
import ProductForm from './views/productForm';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <Suppliers />
    },
    {
        path: '/supplier',
        element: <SupplierForm key="add" />
    },
    {
        path: '/supplier/:id',
        element: <SupplierForm key="update" />
    },
    {
        path: '/products/:id',
        element: <Products />
    },
    {
        path: '/product/:id',
        element: <ProductForm />
    }
]);

export default router;