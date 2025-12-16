import styled from 'styled-components';
import ContentsMenu from './ContentsMenu';

const ContentsPanelContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.contentsPanelBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: none;
  }
`;

const ContentsPanel = () => {
  return (
    <ContentsPanelContainer>
      <ContentsMenu />
    </ContentsPanelContainer>
  );
};

export default ContentsPanel;
