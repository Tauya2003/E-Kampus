import React from 'react';
import { forwardRef, useState } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  type = 'text',
  size = 'md',
  variant = 'default',
  icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  required = false,
  ...props 
}, ref) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;
  
  const baseClasses = 'w-full px-4 py-3 rounded-xl focus:ring-4 transition-all duration-200 bg-white';

  const variants = {
    default: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-200',
    error: 'border border-red-500 focus:border-red-500 focus:ring-red-200',
    success: 'border border-green-500 focus:border-green-500 focus:ring-green-200'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  const currentVariant = error ? 'error' : variant;
  
  const inputClasses = `
    ${baseClasses}
    ${variants[currentVariant]}
    ${sizes[size]}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${isPasswordType ? 'pr-10' : ''}
    ${className}
  `.trim();

  const EyeIcon = ({ show }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {show ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.464 6.464m3.414 3.414l4.242 4.242m0 0L17.656 17.656" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      )}
    </svg>
  );

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
            <span className="text-neutral-400">
              {icon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          {...props}
        />
        
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon show={showPassword} />
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Search Input variant
const SearchInput = forwardRef(({ 
  onClear,
  showClearButton = true,
  className = '',
  ...props 
}, ref) => {
  
  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
  
  const CloseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
  
  return (
    <div className="relative">
      <Input
        ref={ref}
        icon={<SearchIcon />}
        iconPosition="left"
        className={`pr-10 ${className}`}
        {...props}
      />
      {showClearButton && props.value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

Input.Search = SearchInput;

export default Input;
