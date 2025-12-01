import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OceanDiorama from '../components/dioramas/ocean-diorama/OceanDiorama';
import NavBar from '../components/article/NavBar';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.layers.layer1};
  padding-top: 64px;
  padding-bottom: ${(props) => props.theme.spacing['2xl']};
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.md};
  z-index: 10;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const Name = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  line-height: 1.2;
`;

const Tagline = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  margin: 0 0 ${(props) => props.theme.spacing['2xl']} 0;
  font-weight: 600;
  text-align: center;
  max-width: 600px;
`;

const DioramaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.theme.spacing['2xl']} 0;
  z-index: 1;
`;

const CTAContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => props.theme.colors.accent};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 90, 61, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: transparent;
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => props.theme.colors.layers.layer2};

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
  }
`;

const Hero = () => {
  return (
    <>
      <NavBar />
      <HeroContainer>
        <ContentWrapper>
          <NameContainer>
            <Name>James Dawson</Name>
            <Tagline>Full-Stack Developer | AI/ML & Robotics</Tagline>
          </NameContainer>

          <DioramaWrapper>
            <OceanDiorama />
          </DioramaWrapper>

          <CTAContainer>
            <CTAButton to="/projects">View Projects</CTAButton>
            <SecondaryButton to="/contact">Let's Connect</SecondaryButton>
          </CTAContainer>
        </ContentWrapper>
      </HeroContainer>
    </>
  );
};

export default Hero;



