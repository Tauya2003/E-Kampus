import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const pageRef = useRef(null);
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  // Define different transition types for different routes
  const getTransitionConfig = (currentPath, prevPath) => {
    // Special transitions for specific routes
    if (currentPath === '/' || prevPath === '/') {
      // Home page - more dramatic transition
      return {
        from: { opacity: 0, y: 50, scale: 0.95 },
        to: { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      };
    }

    if (currentPath.includes('/product/')) {
      // Product pages - slide from right
      return {
        from: { opacity: 0, x: 100, scale: 0.98 },
        to: { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "power2.out" }
      };
    }

    if (currentPath === '/Collection' || currentPath === '/Accoms') {
      // Collection/Accommodation pages - fade and slight zoom
      return {
        from: { opacity: 0, y: 20, scale: 0.99 },
        to: { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      };
    }

    if (currentPath.includes('/login') || currentPath.includes('/register')) {
      // Auth pages - slide from bottom
      return {
        from: { opacity: 0, y: 40, scale: 0.97 },
        to: { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      };
    }

    // Default transition
    return {
      from: { opacity: 0, y: 30, scale: 0.98 },
      to: { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    };
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;

    // Only animate if the path actually changed
    if (currentPath !== prevPath && pageRef.current) {
      const config = getTransitionConfig(currentPath, prevPath);

      // Set initial state for incoming page
      gsap.set(pageRef.current, config.from);

      // Animate the page in with a slight delay for smoother transition
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(pageRef.current, config.to);

      // Store current path for next comparison
      prevLocationRef.current = currentPath;
    } else if (pageRef.current) {
      // For initial load, just ensure the page is visible
      gsap.set(pageRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
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
        width: '100%',
        transform: 'translate3d(0, 0, 0)', // Enable hardware acceleration
        backfaceVisibility: 'hidden', // Smooth animations
        perspective: 1000 // 3D perspective for smoother transforms
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
