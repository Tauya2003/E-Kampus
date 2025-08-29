import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuthToken, hasCookieConsent, isRememberMeEnabled } from '../utils/cookieUtils';
import LogoutButton from '../components/LogoutButton';
import { FiCheckCircle, FiX, FiInfo, FiUser, FiShield, FiCookie } from 'react-icons/fi';

const AuthDemo = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  const authToken = getAuthToken();
  const cookieConsent = hasCookieConsent();
  const rememberMe = isRememberMeEnabled();

  const StatusIndicator = ({ status, label, description }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {status ? (
          <FiCheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <FiX className="w-5 h-5 text-red-500" />
        )}
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <span className={`px-2 py-1 text-xs rounded-full ${
        status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status ? 'Active' : 'Inactive'}
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 Authentication System Demo
          </h1>
          <p className="text-gray-600">
            Modern, secure authentication with real-time validation, cookies, and smooth animations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Authentication Status */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <FiUser className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Authentication Status</h2>
            </div>

            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Logged In</span>
                  </div>
                  {user && (
                    <div className="text-sm text-green-800">
                      <p>Name: {user.name || 'Not provided'}</p>
                      <p>Email: {user.email || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <LogoutButton 
                  variant="button" 
                  className="w-full"
                  size="lg"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiX className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Not Logged In</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Please log in to access protected features
                  </p>
                </div>

                <a 
                  href="/login"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Go to Login
                </a>
              </div>
            )}
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <FiShield className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Security Features</h2>
            </div>

            <div className="space-y-4">
              <StatusIndicator
                status={!!authToken}
                label="Secure Cookie Auth"
                description="Authentication token stored in secure cookies"
              />
              
              <StatusIndicator
                status={rememberMe}
                label="Remember Me"
                description="Persistent login across browser sessions"
              />
              
              <StatusIndicator
                status={cookieConsent}
                label="Cookie Consent"
                description="User has given consent for cookies"
              />

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full mt-4 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FiInfo className="w-4 h-4" />
                {showDetails ? 'Hide' : 'Show'} Technical Details
              </button>

              {showDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">Technical Information</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Auth Token: {authToken ? `${authToken.substring(0, 20)}...` : 'None'}</p>
                    <p>Cookie Consent: {cookieConsent ? 'Accepted' : 'Not given'}</p>
                    <p>Remember Me: {rememberMe ? 'Enabled' : 'Disabled'}</p>
                    <p>Secure Context: {window.location.protocol === 'https:' ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <FiCookie className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Implemented Features</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Modern Design', desc: 'Clean, responsive forms with Tailwind CSS' },
                { title: 'Real-time Validation', desc: 'Email format and password strength checking' },
                { title: 'Secure Cookies', desc: 'HTTP-only, Secure, SameSite=Strict cookies' },
                { title: 'Remember Me', desc: 'Persistent login with secure cookies' },
                { title: 'Session Management', desc: 'Cross-page authentication state' },
                { title: 'Logout Functionality', desc: 'Clear cookies and end session' },
                { title: 'Password Hashing', desc: 'Client-side security before transmission' },
                { title: 'Error/Success Messages', desc: 'Clear feedback with toast notifications' },
                { title: 'Cookie Consent', desc: 'GDPR-compliant cookie management' },
                { title: 'GSAP Animations', desc: 'Smooth form transitions and effects' },
                { title: 'Password Strength', desc: 'Visual indicator with requirements' },
                { title: 'Responsive Design', desc: 'Works on all devices and screen sizes' }
              ].map((feature, index) => (
                <div key={index} className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">
            🚀 All features implemented successfully! Test the login system to see everything in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
