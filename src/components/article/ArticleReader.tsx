import { type ReactNode } from 'react';
import styled from 'styled-components';
import Reader from './Reader';
import ContentsPanel from './ContentsPanel';
import MobileContentsBar from './MobileContentsBar';
import NavBar from './NavBar';
import { ArticleNavigationProvider } from './ArticleNavigationContext';

const ArticleReaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
  box-sizing: border-box;
`;

const ReaderWrapper = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ReaderContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: calc(64px + ${(props) => props.theme.spacing.md});
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
          <NavBar />
          <ReaderContent>
            <Reader>{children}</Reader>
          </ReaderContent>
        </ReaderWrapper>
        <MobileContentsBar />
      </ArticleReaderContainer>
    </ArticleNavigationProvider>
  );
};

export default ArticleReader;

