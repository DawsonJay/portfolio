import styled from 'styled-components';
import NavBar from '../../components/article/NavBar';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
  padding-top: calc(64px + ${(props) => props.theme.spacing.xl});
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  font-weight: 600;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing['2xl']} 0;
  text-align: center;
`;

const SectionCard = styled.section`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.layers.layer2};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const SectionText = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  text-align: center;
`;

const Contact = () => {
  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <PageTitle>Let's Connect</PageTitle>
        <SectionCard>
          <SectionText>
            I'm always interested in connecting with people who share my values and vision. Whether you're a potential employer, collaborator, or just someone who wants to chat about technology, environmental innovation, or Canadian immigration—I'd love to hear from you.
          </SectionText>
          <SectionText>
            Feel free to reach out through your preferred method. I'm particularly interested in opportunities with Canadian companies working in environmental technology, marine exploration, robotics, or sustainable systems.
          </SectionText>
        </SectionCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default Contact;

