import React from 'react';
import { validatePassword } from '../utils/validationUtils';

const PasswordStrength = ({ password, showDetails = true }) => {
  const validation = validatePassword(password);
  
  if (!password) return null;

  const getStrengthBarColor = () => {
    switch (validation.strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-blue-500';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getStrengthBarColor()}`}
            style={{ width: `${validation.percentage}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${validation.strengthColor}`}>
          {validation.strengthText}
        </span>
      </div>

      {/* Detailed requirements */}
      {showDetails && validation.errors.length > 0 && (
        <div className="text-xs text-gray-600">
          <p className="font-medium mb-1">Password requirements:</p>
          <ul className="space-y-1">
            {validation.errors.map((error, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="text-red-500">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
