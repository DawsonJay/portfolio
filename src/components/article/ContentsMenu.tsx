import styled from 'styled-components';
import { useArticleNavigation } from './ArticleNavigationContext';

const ContentsMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

const ArticleTitle = styled.h2<{ $isActive: boolean }>`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${(props) => 
    props.$isActive 
      ? props.theme.colors.accent 
      : props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  cursor: pointer;
  transition: color 0.2s ease;
  text-align: left;

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
  margin-bottom: ${(props) => props.theme.spacing.xs};
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: ${(props) => props.$isActive ? 600 : 400};
  text-align: left;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ArticleGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  width: auto;
  display: flex;
  flex-direction: column;
`;

const generateArticleId = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

interface ContentsMenuProps {
  onItemClick?: () => void;
}

const ContentsMenu = ({ onItemClick }: ContentsMenuProps = {}) => {
  const { sections, activeSectionId, scrollToSection, scrollToArticle } = useArticleNavigation();

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
    onItemClick?.();
  };

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onItemClick?.();
  };

  return (
    <ContentsMenuWrapper>
      {Object.entries(sectionsByArticle).map(([articleTitle, articleSections]) => {
        const articleIsActive = isArticleActive(articleTitle);
        const shouldShowSections = articleIsActive;
        
        return (
          <ArticleGroup key={articleTitle}>
            <ArticleTitle 
              $isActive={articleIsActive}
              onClick={() => handleArticleClick(articleTitle)}
            >
              {articleTitle}
            </ArticleTitle>
            {shouldShowSections && articleSections.map((section) => (
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
    </ContentsMenuWrapper>
  );
};

export default ContentsMenu;

