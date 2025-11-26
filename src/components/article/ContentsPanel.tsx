import styled from 'styled-components';
import { useArticleNavigation } from './ArticleNavigationContext';

const ContentsPanelContainer = styled.div`
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
`;

const ArticleTitle = styled.h2<{ $isActive: boolean }>`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${(props) => 
    props.$isActive 
      ? props.theme.colors.accent 
      : props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const SectionTitle = styled.div<{ $isActive: boolean }>`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => 
    props.$isActive 
      ? props.theme.colors.accent 
      : props.theme.colors.layers.layer11};
  padding-left: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: ${(props) => props.$isActive ? 600 : 400};

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ArticleGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const generateArticleId = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const ContentsPanel = () => {
  const { sections, articles, activeSectionId, scrollToSection, scrollToArticle } = useArticleNavigation();

  // Group sections by article title
  const sectionsByArticle = sections.reduce((acc, section) => {
    if (!acc[section.articleTitle]) {
      acc[section.articleTitle] = [];
    }
    acc[section.articleTitle].push(section);
    return acc;
  }, {} as Record<string, typeof sections>);

  // Check if an article has an active section
  const isArticleActive = (articleTitle: string): boolean => {
    return sectionsByArticle[articleTitle]?.some(
      (section) => section.id === activeSectionId
    ) || false;
  };

  const handleArticleClick = (articleTitle: string) => {
    const articleId = generateArticleId(articleTitle);
    scrollToArticle(articleId);
  };

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <ContentsPanelContainer>
      {Object.entries(sectionsByArticle).map(([articleTitle, articleSections]) => {
        const articleIsActive = isArticleActive(articleTitle);
        return (
          <ArticleGroup key={articleTitle}>
            <ArticleTitle 
              $isActive={articleIsActive}
              onClick={() => handleArticleClick(articleTitle)}
            >
              {articleTitle}
            </ArticleTitle>
            {articleSections.map((section) => (
              <SectionTitle
                key={section.id}
                $isActive={section.id === activeSectionId}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.title}
              </SectionTitle>
            ))}
          </ArticleGroup>
        );
      })}
    </ContentsPanelContainer>
  );
};

export default ContentsPanel;
