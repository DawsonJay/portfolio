import { type ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useArticleNavigation } from './ArticleNavigationContext';
import { useArticleTitle } from './Article';

const ArticleBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SectionTitleColumn = styled.div`
  width: 200px;
  margin-right: ${(props) => props.theme.spacing.xl};
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const SectionTitle = styled.div`
  text-align: right;
  white-space: nowrap;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-size: ${(props) => props.theme.fontSizes.base};
  margin-top: 2px;
`;

const ContentColumn = styled.div`
  flex: 1;
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
      <SectionTitleColumn>
        {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
      </SectionTitleColumn>
      <ContentColumn>
        {children}
      </ContentColumn>
    </ArticleBlockContainer>
  );
};

export default ArticleBlock;

