import { type ReactNode } from 'react';
import styled from 'styled-components';
import Reader from './Reader';
import ContentsPanel from './article/ContentsPanel';
import { ArticleNavigationProvider } from './article/ArticleNavigationContext';

const ArticleReaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
`;

const ReaderWrapper = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
`;

interface ArticleReaderProps {
  children?: ReactNode;
}

const ArticleReader = ({ children }: ArticleReaderProps) => {
  return (
    <ArticleNavigationProvider>
      <ArticleReaderContainer>
        <ContentsPanel />
        <ReaderWrapper>
          <Reader>{children}</Reader>
        </ReaderWrapper>
      </ArticleReaderContainer>
    </ArticleNavigationProvider>
  );
};

export default ArticleReader;

