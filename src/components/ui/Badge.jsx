import React from 'react';
import { forwardRef } from 'react';

const Badge = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
  ...props 
}, ref) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';

  const variants = {
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-green-100 text-green-700',
    campus: 'bg-orange-100 text-orange-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    neutral: 'bg-gray-100 text-gray-700',
    dark: 'bg-gray-800 text-white'
  };
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5 min-w-[1.25rem] h-5',
    md: 'text-xs px-2 py-1 min-w-[1.5rem] h-6', 
    lg: 'text-sm px-3 py-1 min-w-[2rem] h-8'
  };
  
  const dotClasses = dot ? 'w-2 h-2 p-0 min-w-0' : '';
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${dotClasses}
    ${className}
  `.trim();

  return (
    <span 
      ref={ref}
      className={classes}
      {...props}
    >
      {!dot && children}
    </span>
  );
});

Badge.displayName = 'Badge';

// Special cart badge component
const CartBadge = ({ count, className = '', ...props }) => {
  if (!count || count === 0) return null;
  
  return (
    <Badge 
      variant="dark" 
      size="sm" 
      className={`absolute -top-2 -right-2 ${className}`}
      {...props}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
};

// Notification dot badge
const NotificationDot = ({ show = false, className = '', ...props }) => {
  if (!show) return null;
  
  return (
    <Badge 
      variant="error" 
      dot 
      className={`absolute top-0 right-0 ${className}`}
      {...props}
    />
  );
};

Badge.Cart = CartBadge;
Badge.Notification = NotificationDot;

export default Badge;
