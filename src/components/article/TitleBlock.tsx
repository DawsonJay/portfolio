import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ArticleBlock from './ArticleBlock';
import { useArticleNavigation } from './ArticleNavigationContext';

const TitleBlockStyled = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  font-weight: 600;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.xl} 0;
`;

interface TitleBlockProps {
  title: string;
  sectionTitle?: string;
}

const generateArticleId = (title: string): string => {
  // Sanitize: lowercase, replace spaces with hyphens, remove special chars
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const TitleBlock = ({ title, sectionTitle }: TitleBlockProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { registerArticle } = useArticleNavigation();

  useEffect(() => {
    const articleId = generateArticleId(title);
    registerArticle(articleId, title);
  }, [title, registerArticle]);

  const articleId = generateArticleId(title);

  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <TitleBlockStyled ref={titleRef} data-article-id={articleId}>
        {title}
      </TitleBlockStyled>
    </ArticleBlock>
  );
};

TitleBlock.displayName = 'TitleBlock';

export default TitleBlock;

