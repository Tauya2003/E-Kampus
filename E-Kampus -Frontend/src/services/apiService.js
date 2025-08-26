import { API_ENDPOINTS, DEFAULT_CONFIG, getAuthHeaders } from '../config/api.js';

/**
 * API Service utility for making HTTP requests
 * Provides a centralized way to handle API calls with consistent error handling
 */
class ApiService {
  constructor() {
    this.baseConfig = DEFAULT_CONFIG;
  }

  /**
   * Generic request method
   * @param {string} url - API endpoint URL
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {Object} data - Request body data
   * @param {Object} customHeaders - Additional headers
   * @returns {Promise} Response data
   */
  async request(url, method = 'GET', data = null, customHeaders = {}) {
    try {
      const config = {
        method,
        headers: {
          ...this.baseConfig.headers,
          ...getAuthHeaders(),
          ...customHeaders,
        },
      };

      if (data) {
        if (data instanceof FormData) {
          // Remove Content-Type header for FormData (browser will set it with boundary)
          delete config.headers['Content-Type'];
          config.body = data;
        } else {
          config.body = JSON.stringify(data);
        }
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    return this.request(API_ENDPOINTS.LOGIN, 'POST', credentials);
  }

  async register(userData) {
    return this.request(API_ENDPOINTS.REGISTER, 'POST', userData);
  }

  async logout() {
    return this.request(API_ENDPOINTS.LOGOUT, 'POST');
  }

  async forgotPassword(email) {
    return this.request(API_ENDPOINTS.FORGOT_PASSWORD, 'POST', { email });
  }

  async resetPassword(resetData) {
    return this.request(API_ENDPOINTS.RESET_PASSWORD, 'POST', resetData);
  }

  // Product methods
  async getProducts() {
    return this.request(API_ENDPOINTS.PRODUCTS);
  }

  async getProductById(id) {
    return this.request(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  async addProduct(productData) {
    return this.request(API_ENDPOINTS.ADD_PRODUCT, 'POST', productData);
  }

  // Category methods
  async getCategories() {
    return this.request(API_ENDPOINTS.CATEGORIES);
  }

  async getGroceries() {
    return this.request(API_ENDPOINTS.GROCERIES);
  }

  async getMenProducts() {
    return this.request(API_ENDPOINTS.MEN);
  }

  async getWomenProducts() {
    return this.request(API_ENDPOINTS.WOMEN);
  }

  async getElectricalAppliances() {
    return this.request(API_ENDPOINTS.ELECTRICAL_APPLIANCES);
  }

  // Cart methods
  async getCart() {
    return this.request(API_ENDPOINTS.CART);
  }

  async addToCart(itemData) {
    return this.request(API_ENDPOINTS.ADD_TO_CART, 'POST', itemData);
  }

  async updateCart(itemData) {
    return this.request(API_ENDPOINTS.UPDATE_CART, 'PUT', itemData);
  }

  async removeFromCart(itemId) {
    return this.request(API_ENDPOINTS.REMOVE_FROM_CART, 'DELETE', { itemId });
  }

  // Order methods
  async getOrders() {
    return this.request(API_ENDPOINTS.ORDERS);
  }

  async placeOrder(orderData) {
    return this.request(API_ENDPOINTS.PLACE_ORDER, 'POST', orderData);
  }

  async getOrderById(id) {
    return this.request(API_ENDPOINTS.ORDER_BY_ID(id));
  }

  // Search methods
  async search(query) {
    return this.request(`${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
  }

  // User profile methods
  async getProfile() {
    return this.request(API_ENDPOINTS.PROFILE);
  }

  async updateProfile(profileData) {
    return this.request(API_ENDPOINTS.UPDATE_PROFILE, 'PUT', profileData);
  }

  // Payment methods
  async getPaymentMethods() {
    return this.request(API_ENDPOINTS.PAYMENT_METHODS);
  }

  async processPayment(paymentData) {
    return this.request(API_ENDPOINTS.PROCESS_PAYMENT, 'POST', paymentData);
  }
}

// Export a singleton instance
export default new ApiService();
