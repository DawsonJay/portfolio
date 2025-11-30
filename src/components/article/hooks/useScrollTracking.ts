import { useRef, useEffect } from 'react';
import { useArticleNavigation } from '../ArticleNavigationContext';

export const useScrollTracking = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setScrollContainerRef, updateActiveSectionFromScroll } = useArticleNavigation();

  useEffect(() => {
    if (containerRef.current) {
      setScrollContainerRef(containerRef as React.RefObject<HTMLElement>);
    }
  }, [setScrollContainerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    let rafId: number | null = null;
    
    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Cancel any pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      // Update immediately using requestAnimationFrame for smooth updates
      // This batches DOM reads with the browser's render cycle
      rafId = requestAnimationFrame(() => {
        updateActiveSectionFromScroll();
        rafId = null;
      });
      
      // Also update after scroll ends to catch final position
      scrollTimeout = setTimeout(() => {
        updateActiveSectionFromScroll();
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    updateActiveSectionFromScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateActiveSectionFromScroll]);

  return containerRef;
};

