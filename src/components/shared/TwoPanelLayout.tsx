import { type ReactNode } from 'react';
import styled from 'styled-components';
import NavBar from '../article/NavBar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const NavBarContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  z-index: 100;
  
  /* Override NavBar's fixed positioning when used in layout */
  & nav {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
  }
`;

const PanelsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
`;

const LeftPanel = styled.div`
  height: 100%;
  width: 450px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.contentsPanelBackground};
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface TwoPanelLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  mobileMenu?: ReactNode;
}

const TwoPanelLayout = ({ leftPanel, rightPanel, mobileMenu }: TwoPanelLayoutProps) => {
  return (
    <Container>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>
      <PanelsContainer>
        <LeftPanel>{leftPanel}</LeftPanel>
        <RightPanel>{rightPanel}</RightPanel>
      </PanelsContainer>
      {mobileMenu}
    </Container>
  );
};

export default TwoPanelLayout;

