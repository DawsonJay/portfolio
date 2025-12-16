import { type ReactNode } from 'react';
import styled from 'styled-components';
import Reader from './Reader';
import ContentsPanel from './ContentsPanel';
import ContentsMenu from './ContentsMenu';
import TwoPanelLayout from '../shared/TwoPanelLayout';
import MobileDrawer from '../shared/MobileDrawer';
import { ArticleNavigationProvider } from './ArticleNavigationContext';

const ReaderContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface ArticleReaderProps {
  children?: ReactNode;
}

const ArticleReader = ({ children }: ArticleReaderProps) => {
  return (
    <ArticleNavigationProvider>
      <TwoPanelLayout
        leftPanel={<ContentsPanel />}
        rightPanel={
          <ReaderContent>
            <Reader>{children}</Reader>
          </ReaderContent>
        }
        mobileMenu={
          <MobileDrawer>
            <ContentsMenu />
          </MobileDrawer>
        }
      />
    </ArticleNavigationProvider>
  );
};

export default ArticleReader;

