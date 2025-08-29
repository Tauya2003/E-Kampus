/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} Validation result
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    isValid,
    message: isValid ? '' : 'Please enter a valid email address'
  };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength level
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  let strength = 0;
  let strengthText = '';
  let strengthColor = '';
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  } else {
    strength += 1;
  }
  
  if (hasLowerCase) strength += 1;
  else errors.push('Include lowercase letters');
  
  if (hasUpperCase) strength += 1;
  else errors.push('Include uppercase letters');
  
  if (hasNumbers) strength += 1;
  else errors.push('Include numbers');
  
  if (hasSpecialChar) strength += 1;
  else errors.push('Include special characters');
  
  // Determine strength level
  switch (strength) {
    case 0:
    case 1:
      strengthText = 'Very Weak';
      strengthColor = 'text-red-500';
      break;
    case 2:
      strengthText = 'Weak';
      strengthColor = 'text-orange-500';
      break;
    case 3:
      strengthText = 'Fair';
      strengthColor = 'text-yellow-500';
      break;
    case 4:
      strengthText = 'Good';
      strengthColor = 'text-blue-500';
      break;
    case 5:
      strengthText = 'Strong';
      strengthColor = 'text-green-500';
      break;
  }
  
  return {
    isValid: strength >= 3,
    strength,
    strengthText,
    strengthColor,
    errors,
    percentage: (strength / 5) * 100
  };
};

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {object} Validation result
 */
export const validateName = (name) => {
  const minLength = 2;
  const nameRegex = /^[a-zA-Z\s]+$/;
  
  let isValid = true;
  const errors = [];
  
  if (name.length < minLength) {
    errors.push(`Name must be at least ${minLength} characters long`);
    isValid = false;
  }
  
  if (!nameRegex.test(name)) {
    errors.push('Name can only contain letters and spaces');
    isValid = false;
  }
  
  return {
    isValid,
    errors,
    message: errors.length > 0 ? errors[0] : ''
  };
};

/**
 * Validate confirm password
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirm password
 * @returns {object} Validation result
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  const isValid = password === confirmPassword && confirmPassword.length > 0;
  
  return {
    isValid,
    message: isValid ? '' : 'Passwords do not match'
  };
};

/**
 * Real-time form validation
 * @param {string} field - Field name
 * @param {string} value - Field value
 * @param {object} formData - Complete form data for cross-field validation
 * @returns {object} Validation result
 */
export const validateField = (field, value, formData = {}) => {
  switch (field) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'name':
      return validateName(value);
    case 'confirmPassword':
      return validateConfirmPassword(formData.password || '', value);
    default:
      return { isValid: true, message: '' };
  }
};
