// API Configuration for E-Kampus Frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://towitdhonza.softwarez.co.zw';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  REGISTER: `${API_BASE_URL}/accounts/register/`,
  LOGIN: `${API_BASE_URL}/accounts/login/`,
  LOGOUT: `${API_BASE_URL}/accounts/logout/`,
  RESET_PASSWORD: `${API_BASE_URL}/accounts/reset-password/`,
  FORGOT_PASSWORD: `${API_BASE_URL}/accounts/forgot-password/`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products/`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}/`,
  ADD_PRODUCT: `${API_BASE_URL}/api/add/`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  GROCERIES: `${API_BASE_URL}/api/categories/groceries/`,
  MEN: `${API_BASE_URL}/api/categories/men/`,
  WOMEN: `${API_BASE_URL}/api/categories/women/`,
  ELECTRICAL_APPLIANCES: `${API_BASE_URL}/api/categories/electrical-appliances/`,
  
  // Cart & Orders
  CART: `${API_BASE_URL}/api/cart/`,
  ADD_TO_CART: `${API_BASE_URL}/api/cart/add/`,
  UPDATE_CART: `${API_BASE_URL}/api/cart/update/`,
  REMOVE_FROM_CART: `${API_BASE_URL}/api/cart/remove/`,
  ORDERS: `${API_BASE_URL}/api/orders/`,
  PLACE_ORDER: `${API_BASE_URL}/api/orders/place/`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/api/orders/${id}/`,
  
  // Search
  SEARCH: `${API_BASE_URL}/api/search/`,
  
  // User Profile
  PROFILE: `${API_BASE_URL}/api/profile/`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/profile/update/`,
  
  // Payment
  PAYMENT_METHODS: `${API_BASE_URL}/api/payment/methods/`,
  PROCESS_PAYMENT: `${API_BASE_URL}/api/payment/process/`,
};

//Default request configuration
export const DEFAULT_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000, // Default 10 seconds
};

//Helper function to get authorization headers
export const getAuthHeaders = () => {
  // Import getCookie function dynamically to avoid circular dependencies
  try {
    const getCookie = (name) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    };

    const token = getCookie('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};



//Payment method need, Need to update UI, authentication, and Jojo's have partnered up so they want to display their products on our platform


//Base URL export for direct usage
export { API_BASE_URL };
