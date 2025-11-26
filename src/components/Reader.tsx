import { type ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useArticleNavigation } from './article/ArticleNavigationContext';

const ReaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

interface ReaderProps {
  children?: ReactNode;
}

const Reader = ({ children }: ReaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setScrollContainerRef, updateActiveSectionFromScroll } = useArticleNavigation();

  useEffect(() => {
    if (containerRef.current) {
      setScrollContainerRef(containerRef);
    }
  }, [setScrollContainerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Update immediately on scroll
      updateActiveSectionFromScroll();
      
      // Also update after scroll ends (for scroll snapping)
      scrollTimeout = setTimeout(() => {
        updateActiveSectionFromScroll();
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    updateActiveSectionFromScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [updateActiveSectionFromScroll]);

  return <ReaderContainer ref={containerRef}>{children}</ReaderContainer>;
};

export default Reader;

