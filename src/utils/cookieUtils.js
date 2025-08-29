/**
 * Secure cookie utilities for authentication management
 */

// Cookie names
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth_token',
  REMEMBER_ME: 'remember_me',
  CONSENT: 'cookie_consent'
};

// Cookie options
const SECURE_COOKIE_OPTIONS = {
  httpOnly: false, // Can't set httpOnly from frontend
  secure: window.location.protocol === 'https:',
  sameSite: 'Strict',
  path: '/'
};

/**
 * Set a secure cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiry in days (optional)
 * @param {object} options - Additional cookie options
 */
export const setSecureCookie = (name, value, days = null, options = {}) => {
  let cookieString = `${name}=${encodeURIComponent(value)}`;
  
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  const finalOptions = { ...SECURE_COOKIE_OPTIONS, ...options };
  
  if (finalOptions.secure) {
    cookieString += '; Secure';
  }
  
  cookieString += `; SameSite=${finalOptions.sameSite}`;
  cookieString += `; path=${finalOptions.path}`;
  
  document.cookie = cookieString;
};

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getCookie = (name) => {
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

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 * @param {string} path - Cookie path
 */
export const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; Secure; SameSite=Strict`;
};

/**
 * Set authentication token with Remember Me option
 * @param {string} token - Auth token
 * @param {boolean} rememberMe - Whether to persist login
 */
export const setAuthToken = (token, rememberMe = false) => {
  const days = rememberMe ? 30 : 1; // 30 days if remember me, 1 day otherwise
  setSecureCookie(COOKIE_NAMES.AUTH_TOKEN, token, days);
  
  if (rememberMe) {
    setSecureCookie(COOKIE_NAMES.REMEMBER_ME, 'true', 30);
  }
};

/**
 * Get authentication token
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
};

/**
 * Clear all authentication cookies
 */
export const clearAuthCookies = () => {
  deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
  deleteCookie(COOKIE_NAMES.REMEMBER_ME);
};

/**
 * Check if user has cookie consent
 * @returns {boolean} True if consent given
 */
export const hasCookieConsent = () => {
  return getCookie(COOKIE_NAMES.CONSENT) === 'accepted';
};

/**
 * Set cookie consent
 * @param {boolean} accepted - Whether cookies are accepted
 */
export const setCookieConsent = (accepted) => {
  const value = accepted ? 'accepted' : 'rejected';
  setSecureCookie(COOKIE_NAMES.CONSENT, value, 365); // 1 year
};

/**
 * Check if Remember Me is enabled
 * @returns {boolean} True if remember me is set
 */
export const isRememberMeEnabled = () => {
  return getCookie(COOKIE_NAMES.REMEMBER_ME) === 'true';
};
