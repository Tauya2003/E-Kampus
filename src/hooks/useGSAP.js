import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hook for fade-in animation with stagger
export const useFadeInAnimation = (trigger = true, options = {}) => {
  const elementsRef = useRef([]);

  useEffect(() => {
    if (trigger && elementsRef.current.length > 0) {
      // Set initial state
      gsap.set(elementsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      });

      // Animate in with stagger
      gsap.to(elementsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        ...options
      });
    }
  }, [trigger, options]);

  return elementsRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (animationConfig = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const {
        from = { opacity: 0, y: 50 },
        to = { opacity: 1, y: 0 },
        duration = 0.8,
        ease = "power2.out",
        triggerStart = "top 80%",
        ...rest
      } = animationConfig;

      gsap.fromTo(elementRef.current, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: elementRef.current,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
        ...rest
      });
    }
  }, [animationConfig]);

  return elementRef;
};

// Hook for hover animations
export const useHoverAnimation = (hoverConfig = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const {
        scale = 1.05,
        duration = 0.3,
        ease = "power2.out"
      } = hoverConfig;

      const element = elementRef.current;

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale,
          duration,
          ease
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration,
          ease
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [hoverConfig]);

  return elementRef;
};

// Hook for section animations
export const useSectionAnimation = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      if (titleRef.current) {
        timeline.fromTo(titleRef.current, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      if (contentRef.current) {
        timeline.fromTo(contentRef.current, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3");
      }
    }
  }, []);

  return { sectionRef, titleRef, contentRef };
};
