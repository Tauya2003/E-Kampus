import React from 'react';
import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  variant = 'default',
  interactive = false,
  className = '',
  padding = 'md',
  ...props 
}, ref) => {
  
  const baseClasses = 'bg-white rounded-2xl shadow-sm transition-all duration-300';

  const variants = {
    default: 'border border-gray-200',
    elevated: 'shadow-lg',
    flat: 'border border-gray-200 shadow-none',
    glass: 'bg-white/20 backdrop-blur-sm border border-white/30',
    gradient: 'bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100'
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const interactiveClasses = interactive ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${interactiveClasses}
    ${className}
  `.trim();

  return (
    <div 
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components for better composition
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
