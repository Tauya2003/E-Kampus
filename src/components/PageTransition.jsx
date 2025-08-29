import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const pageRef = useRef(null);
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;

    // Only animate if the path actually changed
    if (currentPath !== prevPath && pageRef.current) {
      // Set initial state for incoming page
      gsap.set(pageRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.98
      });

      // Animate the page in
      const tl = gsap.timeline();
      
      tl.to(pageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      // Store current path for next comparison
      prevLocationRef.current = currentPath;
    } else if (pageRef.current) {
      // For initial load, just ensure the page is visible
      gsap.set(pageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1
      });
    }
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef}
      className="page-transition-wrapper"
      style={{ 
        minHeight: '100vh',
        width: '100%' 
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
