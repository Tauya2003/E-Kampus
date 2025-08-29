import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateField } from '../utils/validationUtils';
import { FiMail, FiArrowLeft, FiLoader, FiCheckCircle } from 'react-icons/fi';
import gsap from 'gsap';

const ForgotPasswordNew = () => {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { forgotPassword } = useAuth();
  
  // Refs for GSAP animations
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const fieldRef = useRef(null);

  // GSAP animations on mount
  useEffect(() => {
    const form = formRef.current;
    const title = titleRef.current;
    const field = fieldRef.current;

    if (form && title && field) {
      // Initial animation
      gsap.fromTo(form, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(title, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(field, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.3 }
      );
    }
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Real-time validation
    const emailValidation = validateField('email', value);
    setValidation({ email: emailValidation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValidation = validateField('email', email);
    if (!emailValidation.isValid) {
      setValidation({ email: emailValidation });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setIsSuccess(true);
        // Animate success state
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            gsap.fromTo(formRef.current, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
          }
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return email && (!validation.email || validation.email.isValid);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div 
            ref={formRef}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
              <p className="text-gray-600">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                    setValidation({});
                  }}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Try another email
                </button>
                
                <Link 
                  to="/login" 
                  className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div 
          ref={formRef}
          className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
        >
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/login"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div ref={titleRef} className="inline-flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            </div>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              ref={fieldRef}
              className="space-y-1"
            >
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    validation.email && !validation.email.isValid 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              {validation.email && !validation.email.isValid && (
                <p className="text-sm text-red-600">{validation.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                !isFormValid() || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <FiLoader className="animate-spin w-5 h-5 mr-2" />
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Help text */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordNew;
