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
  
  const baseClasses = 'card-base';
  
  const variants = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-moderate',
    flat: 'bg-white border border-neutral-200 shadow-none',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100'
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4', 
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const interactiveClasses = interactive ? 'card-hover cursor-pointer' : '';
  
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
  <div className={`border-b border-neutral-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-neutral-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-neutral-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-neutral-200 pt-4 mt-4 ${className}`} {...props}>
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
