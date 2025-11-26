import { type ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useArticleNavigation } from './ArticleNavigationContext';
import { useArticleTitle } from './Article';

const ArticleBlockContainer = styled.div`
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

const SectionTitle = styled.div`
  position: absolute;
  top: 2px;
  right: 100%; /* Position to the left of the block */
  margin-right: 16px; /* Increased spacing to move titles further left */
  width: 200px; /* Match spacer width */
  text-align: right;
  white-space: nowrap;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-size: ${(props) => props.theme.fontSizes.base};
`;

interface ArticleBlockProps {
  children?: ReactNode;
  sectionTitle?: string;
}

const generateSectionId = (articleTitle: string, sectionTitle: string): string => {
  // Sanitize: lowercase, replace spaces with hyphens, remove special chars
  const sanitize = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${sanitize(articleTitle)}--${sanitize(sectionTitle)}`;
};

const ArticleBlock = ({ children, sectionTitle }: ArticleBlockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerSection } = useArticleNavigation();
  const { articleTitle } = useArticleTitle();

  useEffect(() => {
    if (!sectionTitle || !articleTitle) {
      return;
    }

    const sectionId = generateSectionId(articleTitle, sectionTitle);
    
    // Register section
    registerSection(sectionId, sectionTitle, articleTitle);
  }, [sectionTitle, articleTitle, registerSection]);

  const sectionId = sectionTitle && articleTitle ? generateSectionId(articleTitle, sectionTitle) : undefined;

  return (
    <ArticleBlockContainer ref={containerRef} data-section-id={sectionId}>
      {children}
      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
    </ArticleBlockContainer>
  );
};

export default ArticleBlock;

