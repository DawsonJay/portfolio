import styled from 'styled-components';
import NavBar from '../components/article/NavBar';
import ShelfDiorama from '../components/dioramas/shelf-concept/ShelfDiorama';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  padding: ${(props) => props.theme.spacing.xl};
  padding-top: calc(64px + ${(props) => props.theme.spacing.xl});
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaygroundArea = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.layers.layer1};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SvgPlayground = () => {
  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <PlaygroundArea>
          <ShelfDiorama />
        </PlaygroundArea>
      </ContentContainer>
    </PageContainer>
  );
};

export default SvgPlayground;

