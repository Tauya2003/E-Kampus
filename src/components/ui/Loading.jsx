import React from 'react';

// Main Loading Spinner Component
const Loading = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  text,
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variants = {
    primary: 'text-blue-500',
    secondary: 'text-green-500',
    campus: 'text-orange-500',
    white: 'text-white',
    neutral: 'text-gray-500'
  };

  const spinner = (
    <div className={`animate-spin ${sizes[size]} ${variants[variant]} ${className}`}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {spinner}
      {text && <span className="text-neutral-600">{text}</span>}
    </div>
  );
};

// Skeleton Loading Components
const Skeleton = ({ 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-neutral-200',
    light: 'bg-neutral-100',
    dark: 'bg-neutral-300'
  };

  return (
    <div 
      className={`skeleton animate-pulse rounded ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

// Pre-built skeleton patterns
const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

const SkeletonCard = ({ className = '' }) => (
  <div className={`card-base p-4 ${className}`}>
    <Skeleton className="aspect-square w-full mb-4" />
    <SkeletonText lines={2} />
    <div className="flex items-center justify-between mt-3">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

const SkeletonProductGrid = ({ count = 8, className = '' }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const SkeletonList = ({ count = 5, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 card-base">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
    ))}
  </div>
);

// Loading states for different components
const LoadingButton = ({ children, loading, ...props }) => (
  <button 
    disabled={loading}
    className="btn-primary relative"
    {...props}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loading size="sm" variant="white" />
      </div>
    )}
    <span className={loading ? 'opacity-0' : ''}>
      {children}
    </span>
  </button>
);

// Image with loading state
const ImageWithLoading = ({ 
  src, 
  alt, 
  className = '',
  onLoad,
  onError,
  fallback = '/placeholder-image.jpg',
  ...props 
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleLoad = (e) => {
    setLoading(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setLoading(false);
    setError(true);
    onError?.(e);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <Loading size="sm" variant="neutral" />
        </div>
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

// Page loading wrapper
const PageLoading = ({ children, loading, skeleton }) => {
  if (loading) {
    return skeleton || <Loading fullScreen text="Loading..." />;
  }
  return children;
};

// Export all components
Loading.Skeleton = Skeleton;
Loading.SkeletonText = SkeletonText;
Loading.SkeletonCard = SkeletonCard;
Loading.SkeletonProductGrid = SkeletonProductGrid;
Loading.SkeletonList = SkeletonList;
Loading.LoadingButton = LoadingButton;
Loading.ImageWithLoading = ImageWithLoading;
Loading.PageLoading = PageLoading;

export default Loading;
