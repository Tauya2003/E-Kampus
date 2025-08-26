import axios from 'axios';
import { API_ENDPOINTS, DEFAULT_CONFIG, getAuthHeaders } from '../config/api.js';

/**
 * Axios-based API Service utility for making HTTP requests
 * Provides a centralized way to handle API calls with consistent error handling
 */
class AxiosApiService {
  constructor() {
    // Create axios instance with default config
    this.axiosInstance = axios.create({
      timeout: DEFAULT_CONFIG.timeout,
      headers: DEFAULT_CONFIG.headers,
    });

    // Request interceptor to add auth headers
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const authHeaders = getAuthHeaders();
        config.headers = { ...config.headers, ...authHeaders };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for consistent error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.error('API Error:', error);
        
        if (error.response) {
          // Server responded with error status
          const errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
          throw new Error(errorMessage);
        } else if (error.request) {
          // Request made but no response received
          throw new Error('Network error: No response from server');
        } else {
          // Something else happened
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  // Authentication methods
  async login(credentials) {
    return this.axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
  }

  async register(userData) {
    return this.axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
  }

  async logout() {
    return this.axiosInstance.post(API_ENDPOINTS.LOGOUT);
  }

  async forgotPassword(email) {
    return this.axiosInstance.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  }

  async resetPassword(resetData) {
    return this.axiosInstance.post(API_ENDPOINTS.RESET_PASSWORD, resetData);
  }

  // Product methods
  async getProducts() {
    return this.axiosInstance.get(API_ENDPOINTS.PRODUCTS);
  }

  async getProductById(id) {
    return this.axiosInstance.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  async addProduct(productData) {
    return this.axiosInstance.post(API_ENDPOINTS.ADD_PRODUCT, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Category methods
  async getCategories() {
    return this.axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  }

  async getGroceries() {
    return this.axiosInstance.get(API_ENDPOINTS.GROCERIES);
  }

  async getMenProducts() {
    return this.axiosInstance.get(API_ENDPOINTS.MEN);
  }

  async getWomenProducts() {
    return this.axiosInstance.get(API_ENDPOINTS.WOMEN);
  }

  async getElectricalAppliances() {
    return this.axiosInstance.get(API_ENDPOINTS.ELECTRICAL_APPLIANCES);
  }

  // Cart methods
  async getCart() {
    return this.axiosInstance.get(API_ENDPOINTS.CART);
  }

  async addToCart(itemData) {
    return this.axiosInstance.post(API_ENDPOINTS.ADD_TO_CART, itemData);
  }

  async updateCart(itemData) {
    return this.axiosInstance.put(API_ENDPOINTS.UPDATE_CART, itemData);
  }

  async removeFromCart(itemId) {
    return this.axiosInstance.delete(API_ENDPOINTS.REMOVE_FROM_CART, { 
      data: { itemId } 
    });
  }

  // Order methods
  async getOrders() {
    return this.axiosInstance.get(API_ENDPOINTS.ORDERS);
  }

  async placeOrder(orderData) {
    return this.axiosInstance.post(API_ENDPOINTS.PLACE_ORDER, orderData);
  }

  async getOrderById(id) {
    return this.axiosInstance.get(API_ENDPOINTS.ORDER_BY_ID(id));
  }

  // Search methods
  async search(query) {
    return this.axiosInstance.get(`${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
  }

  // User profile methods
  async getProfile() {
    return this.axiosInstance.get(API_ENDPOINTS.PROFILE);
  }

  async updateProfile(profileData) {
    return this.axiosInstance.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
  }

  // Payment methods
  async getPaymentMethods() {
    return this.axiosInstance.get(API_ENDPOINTS.PAYMENT_METHODS);
  }

  async processPayment(paymentData) {
    return this.axiosInstance.post(API_ENDPOINTS.PROCESS_PAYMENT, paymentData);
  }
}

// Export a singleton instance
export default new AxiosApiService();
