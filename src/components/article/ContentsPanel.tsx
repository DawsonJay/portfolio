import styled from 'styled-components';
import ContentsMenu from './ContentsMenu';

const ContentsPanelContainer = styled.div`
  height: 100vh;
  width: 450px;
  overflow-y: auto;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.contentsPanelBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
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
