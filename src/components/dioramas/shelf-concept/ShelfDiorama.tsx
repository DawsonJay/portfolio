import styled from 'styled-components';
// TODO: Shelf and Lightbulb components need to be created
// import Shelf from './Shelf';
// import Lightbulb from './Lightbulb';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShelfWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 100px;
  overflow: visible;
`;

// TODO: Uncomment when Lightbulb component is created
// const LightbulbWrapper = styled.div<{ left: string }>`
//   position: absolute;
//   top: -60%;
//   left: ${(props) => props.left};
//   transition: transform 0.3s ease;
//   cursor: pointer;
//
//   &:hover {
//     animation: jiggle 1.5s ease-in-out infinite;
//   }
//
//   &:hover .rotating-layer svg {
//     animation: brightness-pulse 2s ease-in-out infinite;
//   }
// `;

const ShelfDiorama = () => {
  // TODO: Implement when Shelf and Lightbulb components are created
  return (
    <Container>
      <ShelfWrapper>
        {/* <Shelf />
        <LightbulbWrapper left="10%">
          <Lightbulb />
        </LightbulbWrapper>
        <LightbulbWrapper left="40%">
          <Lightbulb />
        </LightbulbWrapper>
        <LightbulbWrapper left="70%">
          <Lightbulb />
        </LightbulbWrapper> */}
      </ShelfWrapper>
    </Container>
  );
};

export default ShelfDiorama;

