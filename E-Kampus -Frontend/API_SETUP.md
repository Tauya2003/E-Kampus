# API Configuration Guide

This document explains how to use the API configuration in the E-Kampus frontend application.

## Overview

The API base URL `https://towitdhonza.softwarez.co.zw` has been configured and integrated into the frontend application with the following structure:

## Files Structure

```
src/
├── config/
│   └── api.js                 # API endpoints configuration
├── services/
│   ├── apiService.js          # Fetch-based API service
│   └── axiosApiService.js     # Axios-based API service (recommended)
└── context/
    └── ShopContext.jsx        # Updated to use API service
```

## Configuration Files

### 1. Environment Configuration (`.env`)

```env
VITE_API_BASE_URL=https://towitdhonza.softwarez.co.zw
VITE_API_TIMEOUT=10000
```

### 2. API Configuration (`src/config/api.js`)

Contains all API endpoints and configuration:
- Base URL configuration
- All endpoint definitions
- Default request configuration
- Authentication helpers

### 3. API Services

Two API service implementations are available:

#### Axios-based Service (Recommended)
- File: `src/services/axiosApiService.js`
- Uses axios library for HTTP requests
- Includes interceptors for request/response handling
- Better error handling and timeout management

#### Fetch-based Service
- File: `src/services/apiService.js`
- Uses native fetch API
- Lightweight alternative

## Available API Endpoints

### Authentication
- `POST /accounts/register/` - User registration
- `POST /accounts/login/` - User login
- `POST /accounts/logout/` - User logout
- `POST /accounts/reset-password/` - Password reset
- `POST /accounts/forgot-password/` - Forgot password

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/:id/` - Get product by ID
- `POST /api/add/` - Add new product

### Categories
- `GET /api/categories/` - Get all categories
- `GET /api/categories/groceries/` - Get groceries
- `GET /api/categories/men/` - Get men's products
- `GET /api/categories/women/` - Get women's products
- `GET /api/categories/electrical-appliances/` - Get electrical appliances

### Cart & Orders
- `GET /api/cart/` - Get user cart
- `POST /api/cart/add/` - Add item to cart
- `PUT /api/cart/update/` - Update cart item
- `DELETE /api/cart/remove/` - Remove item from cart
- `GET /api/orders/` - Get user orders
- `POST /api/orders/place/` - Place new order
- `GET /api/orders/:id/` - Get order by ID

### Search & Profile
- `GET /api/search/` - Search products
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/update/` - Update user profile

## Usage Examples

### 1. Using in Components

```jsx
import AxiosApiService from '../services/axiosApiService';
import { toast } from 'react-toastify';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await AxiosApiService.getProducts();
      setProducts(response.products || response);
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  );
};
```

### 2. Authentication Example

```jsx
import AxiosApiService from '../services/axiosApiService';

const handleLogin = async (email, password) => {
  try {
    const response = await AxiosApiService.login({ email, password });
    
    if (response.success) {
      localStorage.setItem('token', response.token);
      toast.success('Login successful!');
      navigate('/');
    }
  } catch (error) {
    toast.error(error.message);
  }
};
```

### 3. Adding Products

```jsx
const handleAddProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    // ... other fields
    
    const response = await AxiosApiService.addProduct(formData);
    toast.success('Product added successfully!');
  } catch (error) {
    toast.error('Failed to add product');
  }
};
```

## Context Integration

The `ShopContext` has been updated to:
- Fetch products from the API on app load
- Fallback to static products if API fails
- Provide loading states
- Handle errors gracefully

## Error Handling

The API services include comprehensive error handling:
- Network errors
- Server errors (4xx, 5xx)
- Timeout errors
- Authentication errors

## Authentication

The services automatically:
- Add Bearer tokens to requests
- Handle token storage in localStorage
- Include auth headers in protected requests

## Development vs Production

The API base URL is configured through environment variables:
- Development: Can override in `.env` file
- Production: Set through deployment environment

## Testing the API

To test if the API is working:

1. Check browser network tab for API calls
2. Look for API responses in console
3. Verify authentication flow
4. Test CRUD operations

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend API allows your frontend domain
2. **Authentication Errors**: Check if tokens are being sent correctly
3. **Network Errors**: Verify the API base URL is correct
4. **Timeout Errors**: Increase timeout in configuration if needed

### Debug Mode

Enable debug mode in `.env`:
```env
VITE_DEBUG_MODE=true
```

This will show additional console logs for API requests.

## Next Steps

1. Test all API endpoints
2. Implement proper error boundaries
3. Add loading states to all components
4. Implement offline capabilities
5. Add request caching if needed

## Support

For API-related issues, check:
1. Network tab in browser dev tools
2. Console for error messages
3. API server logs
4. Backend API documentation
