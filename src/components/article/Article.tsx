import { type ReactNode, createContext, useContext, Children, isValidElement, type ReactElement } from 'react';
import styled from 'styled-components';
import TitleBlock from './TitleBlock';

const ArticleContainer = styled.article`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
`;

interface ArticleContextValue {
  articleTitle: string | null;
}

const ArticleContext = createContext<ArticleContextValue>({ articleTitle: null });

export const useArticleTitle = () => {
  return useContext(ArticleContext);
};

interface ArticleProps {
  children?: ReactNode;
}

const Article = ({ children }: ArticleProps) => {
  // Extract article title from first TitleBlock child
  let articleTitle: string | null = null;
  
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    
    const childElement = child as ReactElement;
    if (childElement.type === TitleBlock && !articleTitle) {
      articleTitle = childElement.props.title || null;
    }
  });

  return (
    <ArticleContext.Provider value={{ articleTitle }}>
      <ArticleContainer>{children}</ArticleContainer>
    </ArticleContext.Provider>
  );
};

Article.displayName = 'Article';

export default Article;

