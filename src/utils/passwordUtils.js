/**
 * Password hashing utilities for client-side security
 * Note: This provides basic client-side security. Server-side hashing is still required.
 */

/**
 * Simple hash function for client-side password obfuscation
 * WARNING: This is NOT secure for production use. Use proper backend hashing.
 * @param {string} password - Password to hash
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  try {
    // Use SubtleCrypto API if available
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } else {
      // Fallback: Simple obfuscation (NOT secure)
      console.warn('SubtleCrypto not available. Using fallback method.');
      return btoa(password).split('').reverse().join('');
    }
  } catch (error) {
    console.error('Password hashing failed:', error);
    // Return the original password if hashing fails
    return password;
  }
};

/**
 * Verify password against hash (for client-side verification only)
 * @param {string} password - Plain password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if password matches
 */
export const verifyPassword = async (password, hash) => {
  try {
    const hashedPassword = await hashPassword(password);
    return hashedPassword === hash;
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
};

/**
 * Generate a secure random salt
 * @returns {string} Random salt
 */
export const generateSalt = () => {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } else {
    // Fallback for older browsers
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
};

/**
 * Hash password with salt
 * @param {string} password - Password to hash
 * @param {string} salt - Salt to use
 * @returns {Promise<string>} Salted hash
 */
export const hashPasswordWithSalt = async (password, salt) => {
  try {
    const saltedPassword = password + salt;
    return await hashPassword(saltedPassword);
  } catch (error) {
    console.error('Salted password hashing failed:', error);
    return password;
  }
};

/**
 * Prepare password for transmission (client-side hashing before sending to server)
 * Note: Server should still perform proper hashing with bcrypt or similar
 * @param {string} password - Plain password
 * @returns {Promise<object>} Object with hashed password and salt
 */
export const preparePasswordForTransmission = async (password) => {
  try {
    const salt = generateSalt();
    const hashedPassword = await hashPasswordWithSalt(password, salt);
    
    return {
      password: hashedPassword,
      salt: salt,
      originalLength: password.length // For validation purposes
    };
  } catch (error) {
    console.error('Password preparation failed:', error);
    // Fallback: return original password
    return {
      password: password,
      salt: '',
      originalLength: password.length
    };
  }
};
