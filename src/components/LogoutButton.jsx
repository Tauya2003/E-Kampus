import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiLoader } from 'react-icons/fi';

const LogoutButton = ({ 
  variant = 'button', // 'button', 'dropdown', 'icon'
  className = '',
  showText = true,
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getSizeClasses()} ${className}`}
        title="Logout"
      >
        {isLoggingOut ? (
          <FiLoader className={`animate-spin ${getIconSize()}`} />
        ) : (
          <FiLogOut className={getIconSize()} />
        )}
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoggingOut ? (
          <FiLoader className="w-4 h-4 mr-3 animate-spin" />
        ) : (
          <FiLogOut className="w-4 h-4 mr-3" />
        )}
        {showText && (isLoggingOut ? 'Logging out...' : 'Logout')}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`inline-flex items-center justify-center rounded-lg border border-red-300 bg-white text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getSizeClasses()} ${className}`}
    >
      {isLoggingOut ? (
        <>
          <FiLoader className={`animate-spin ${getIconSize()} ${showText ? 'mr-2' : ''}`} />
          {showText && 'Logging out...'}
        </>
      ) : (
        <>
          <FiLogOut className={`${getIconSize()} ${showText ? 'mr-2' : ''}`} />
          {showText && 'Logout'}
        </>
      )}
    </button>
  );
};

export default LogoutButton;
