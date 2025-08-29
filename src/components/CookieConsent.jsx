import React, { useState, useEffect } from "react";
import { hasCookieConsent, setCookieConsent } from "../utils/cookieUtils";
import Button from "./ui/Button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    if (!hasCookieConsent()) {
      setShowBanner(true);
      // Delay showing animation for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleReject = () => {
    setCookieConsent(false);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🍪 Cookie Settings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                We use essential cookies for login and cart functionality. We'd
                also like to use analytics cookies to improve your experience.
                You can manage your preferences anytime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleReject}
                className="w-full sm:w-auto"
              >
                Essential Only
              </Button>
              <Button
                variant="black"
                onClick={handleAccept}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
