import styled from 'styled-components';
import OceanDiorama from '../components/dioramas/ocean-diorama/OceanDiorama';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.layers.layer1};
`;

const Hero = () => {
  return (
    <HeroContainer>
      <OceanDiorama />
    </HeroContainer>
  );
};

export default Hero;



