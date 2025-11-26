import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';

export interface Section {
  id: string;
  title: string;
  articleTitle: string;
}

export interface Article {
  id: string;
  title: string;
}

interface ArticleNavigationContextValue {
  sections: Section[];
  articles: Article[];
  activeSectionId: string | null;
  registerSection: (id: string, title: string, articleTitle: string) => void;
  registerArticle: (id: string, title: string) => void;
  scrollToSection: (id: string) => void;
  scrollToArticle: (id: string) => void;
  setActiveSection: (id: string | null) => void;
  scrollContainerRef: React.RefObject<HTMLElement> | null;
  setScrollContainerRef: (ref: React.RefObject<HTMLElement>) => void;
  updateSectionPosition: (id: string, distance: number) => void;
  updateActiveSectionFromScroll: () => void;
}

const ArticleNavigationContext = createContext<ArticleNavigationContextValue | undefined>(undefined);

interface ArticleNavigationProviderProps {
  children: ReactNode;
}

export const ArticleNavigationProvider = ({ children }: ArticleNavigationProviderProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const sectionPositionsRef = useRef<Map<string, number>>(new Map());

  const registerSection = useCallback((id: string, title: string, articleTitle: string) => {
    setSections((prev) => {
      // Check if section already exists
      if (prev.some((s) => s.id === id)) {
        return prev;
      }
      return [...prev, { id, title, articleTitle }];
    });
  }, []);

  const registerArticle = useCallback((id: string, title: string) => {
    setArticles((prev) => {
      // Check if article already exists
      if (prev.some((a) => a.id === id)) {
        return prev;
      }
      return [...prev, { id, title }];
    });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.querySelector(`[data-section-id="${id}"]`) as HTMLElement;
    if (element) {
      // Use the scroll container if available, otherwise use window
      const container = scrollContainerRef.current;
      if (container) {
        // Calculate relative position within scroll container
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const relativeTop = elementRect.top - containerRect.top + scrollTop;
        
        container.scrollTo({
          top: relativeTop,
          behavior: 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const scrollToArticle = useCallback((id: string) => {
    const element = document.querySelector(`[data-article-id="${id}"]`) as HTMLElement;
    if (element) {
      // Use the scroll container if available, otherwise use window
      const container = scrollContainerRef.current;
      if (container) {
        // Calculate relative position within scroll container
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const relativeTop = elementRect.top - containerRect.top + scrollTop;
        
        container.scrollTo({
          top: relativeTop,
          behavior: 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const setScrollContainerRef = useCallback((ref: React.RefObject<HTMLElement>) => {
    scrollContainerRef.current = ref.current;
  }, []);

  const setActiveSection = useCallback((id: string | null) => {
    setActiveSectionId(id);
  }, []);

  const updateSectionPosition = useCallback((id: string, distance: number) => {
    sectionPositionsRef.current.set(id, distance);
    
    // Find the section closest to the top
    let closestId: string | null = null;
    let closestDistance = Infinity;
    
    sectionPositionsRef.current.forEach((dist, sectionId) => {
      if (dist >= 0 && dist < closestDistance) {
        closestDistance = dist;
        closestId = sectionId;
      }
    });
    
    setActiveSectionId(closestId);
  }, []);

  const updateActiveSectionFromScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Find all section elements
    const sectionElements = document.querySelectorAll('[data-section-id]');
    if (sectionElements.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    
    let closestId: string | null = null;
    let closestDistance = Infinity;
    const threshold = 100; // Consider sections within 100px of top

    sectionElements.forEach((element) => {
      const sectionId = element.getAttribute('data-section-id');
      if (!sectionId) return;

      const rect = element.getBoundingClientRect();
      const distance = rect.top - containerTop;

      // Prefer sections that are at or just below the top (positive distance, but small)
      // Also consider sections slightly above (negative but close to 0)
      if (Math.abs(distance) < threshold && Math.abs(distance) < Math.abs(closestDistance)) {
        closestDistance = distance;
        closestId = sectionId;
      } else if (distance >= 0 && distance < closestDistance && closestDistance >= threshold) {
        // If no section is within threshold, use the closest one below
        closestDistance = distance;
        closestId = sectionId;
      }
    });

    if (closestId) {
      setActiveSectionId(closestId);
    }
  }, []);

  const value: ArticleNavigationContextValue = {
    sections,
    articles,
    activeSectionId,
    registerSection,
    registerArticle,
    scrollToSection,
    scrollToArticle,
    setActiveSection,
    scrollContainerRef,
    setScrollContainerRef,
    updateSectionPosition,
    updateActiveSectionFromScroll,
  };

  return (
    <ArticleNavigationContext.Provider value={value}>
      {children}
    </ArticleNavigationContext.Provider>
  );
};

export const useArticleNavigation = () => {
  const context = useContext(ArticleNavigationContext);
  if (context === undefined) {
    throw new Error('useArticleNavigation must be used within an ArticleNavigationProvider');
  }
  return context;
};

