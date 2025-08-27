import React from 'react';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}, ref) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-none transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md focus:ring-blue-200',
    secondary: 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md focus:ring-green-200',
    campus: 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md focus:ring-orange-200',
    black: 'bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md focus:ring-black-200',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-200',
    ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-blue-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md focus:ring-red-200',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md focus:ring-green-200'
  };
  
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5', 
    lg: 'text-lg px-8 py-3',
    xl: 'text-xl px-10 py-4'
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button 
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
