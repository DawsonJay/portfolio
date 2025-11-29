import { type ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useArticleNavigation } from './article/ArticleNavigationContext';

const ReaderContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: ${(props) => props.theme.spacing['3xl']};
  padding-left: ${(props) => props.theme.spacing.xl};
  padding-right: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.xl};
  box-sizing: border-box;
  
  @media (max-width: 1350px) {
    padding-right: ${(props) => props.theme.spacing.xl};
  }
  
  @media (max-width: 600px) {
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
  }
  
  &::after {
    content: '';
    display: block;
    height: calc(100vh - ${(props) => props.theme.spacing['3xl']});
  }
`;

interface ReaderProps {
  children?: ReactNode;
}

const Reader = ({ children }: ReaderProps) => {
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

  return <ReaderContainer ref={containerRef}>{children}</ReaderContainer>;
};

export default Reader;

