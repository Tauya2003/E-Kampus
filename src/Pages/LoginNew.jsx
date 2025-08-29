import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateField } from '../utils/validationUtils';
import PasswordStrength from '../components/PasswordStrength';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiLoader } from 'react-icons/fi';
import gsap from 'gsap';

const LoginNew = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validation, setValidation] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Refs for GSAP animations
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const fieldsRef = useRef([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // GSAP animations on mount and state change
  useEffect(() => {
    const form = formRef.current;
    const title = titleRef.current;
    const fields = fieldsRef.current;

    if (form && title) {
      // Initial animation
      gsap.fromTo(form, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(title, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );

      // Stagger animation for form fields
      gsap.fromTo(fields, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1, 
          ease: "power2.out", 
          delay: 0.3 
        }
      );
    }
  }, [currentState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const fieldValidation = validateField(name, value, formData);
    setValidation(prev => ({
      ...prev,
      [name]: fieldValidation
    }));
  };

  const handleStateChange = (newState) => {
    // Animate state transition
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentState(newState);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setValidation({});
        
        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (currentState === 'Sign Up' && formData.name) {
      const nameValidation = validateField('name', formData.name);
      if (!nameValidation.isValid) errors.name = nameValidation;
    }
    
    if (formData.email) {
      const emailValidation = validateField('email', formData.email);
      if (!emailValidation.isValid) errors.email = emailValidation;
    }
    
    if (formData.password) {
      const passwordValidation = validateField('password', formData.password);
      if (!passwordValidation.isValid) errors.password = passwordValidation;
    }
    
    if (currentState === 'Sign Up' && formData.confirmPassword) {
      const confirmValidation = validateField('confirmPassword', formData.confirmPassword, formData);
      if (!confirmValidation.isValid) errors.confirmPassword = confirmValidation;
    }

    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (currentState === 'Login') {
        const result = await login({
          email: formData.email,
          password: formData.password
        }, rememberMe);
        
        if (result.success) {
          navigate('/');
        }
      } else {
        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          handleStateChange('Login');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    if (currentState === 'Login') {
      return formData.email && formData.password && 
             (!validation.email || validation.email.isValid) &&
             (!validation.password || validation.password.isValid);
    } else {
      return formData.name && formData.email && formData.password && formData.confirmPassword &&
             (!validation.name || validation.name.isValid) &&
             (!validation.email || validation.email.isValid) &&
             (!validation.password || validation.password.isValid) &&
             (!validation.confirmPassword || validation.confirmPassword.isValid);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div 
          ref={formRef}
          className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div ref={titleRef} className="inline-flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{currentState}</h1>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            </div>
            <p className="text-gray-600">
              {currentState === 'Login' ? 'Welcome back! Please sign in to your account' : 'Create your account to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Name field for signup */}
            {currentState === 'Sign Up' && (
              <div 
                ref={el => fieldsRef.current[0] = el}
                className="space-y-1"
              >
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      validation.name && !validation.name.isValid 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {validation.name && !validation.name.isValid && (
                  <p className="text-sm text-red-600">{validation.name.message}</p>
                )}
              </div>
            )}

            {/* Email field */}
            <div 
              ref={el => fieldsRef.current[1] = el}
              className="space-y-1"
            >
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    validation.email && !validation.email.isValid 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {validation.email && !validation.email.isValid && (
                <p className="text-sm text-red-600">{validation.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div 
              ref={el => fieldsRef.current[2] = el}
              className="space-y-1"
            >
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    validation.password && !validation.password.isValid 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder={currentState === 'Login' ? 'Enter your password' : 'Create a strong password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              
              {currentState === 'Sign Up' && formData.password && (
                <PasswordStrength password={formData.password} />
              )}
              
              {validation.password && !validation.password.isValid && currentState === 'Login' && (
                <p className="text-sm text-red-600">{validation.password.errors?.[0] || validation.password.message}</p>
              )}
            </div>

            {/* Confirm Password field for signup */}
            {currentState === 'Sign Up' && (
              <div 
                ref={el => fieldsRef.current[3] = el}
                className="space-y-1"
              >
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      validation.confirmPassword && !validation.confirmPassword.isValid 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {validation.confirmPassword && !validation.confirmPassword.isValid && (
                  <p className="text-sm text-red-600">{validation.confirmPassword.message}</p>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            {currentState === 'Login' && (
              <div 
                ref={el => fieldsRef.current[4] = el}
                className="flex items-center justify-between"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting || isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                !isFormValid() || isSubmitting || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting || isLoading ? (
                <div className="flex items-center justify-center">
                  <FiLoader className="animate-spin w-5 h-5 mr-2" />
                  {currentState === 'Login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                currentState === 'Login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Switch between Login/Signup */}
            <div 
              ref={el => fieldsRef.current[5] = el}
              className="text-center"
            >
              <p className="text-gray-600">
                {currentState === 'Login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => handleStateChange(currentState === 'Login' ? 'Sign Up' : 'Login')}
                  className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
                >
                  {currentState === 'Login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
