import OceanLayer1 from './OceanLayer1';
import OceanLayer2 from './OceanLayer2';
import OceanLayer3 from './OceanLayer3';
import OceanLayer4 from './OceanLayer4';
import OceanLayer5 from './OceanLayer5';
import OceanLayer6 from './OceanLayer6';
import OceanWhale1 from './OceanWhale1';
import OceanWhale2 from './OceanWhale2';
import OceanWhale3 from './OceanWhale3';
import DioramaContainer from '../shared/DioramaContainer';
import DioramaFrame from '../shared/DioramaFrame';
import { dioramaSettings } from './config';
import { useTheme } from '../../../hooks/useTheme';

const OceanDiorama = () => {
  const theme = useTheme();
  const surfaceColor = theme.colors.layers.layer1;

  return (
    <DioramaContainer
      size={dioramaSettings.size}
      shape={dioramaSettings.shape}
      backgroundColor={dioramaSettings.backgroundColor}
      overflow="visible"
      frame={
        <DioramaFrame
          shape={dioramaSettings.shape}
          outerSize={dioramaSettings.frameOuterSize}
          innerSize={dioramaSettings.frameInnerSize}
          color={surfaceColor}
          zIndex={20}
          offset={dioramaSettings.frameOffset}
        />
      }
    >
      <OceanLayer1 />
      <OceanLayer2 />
      <OceanLayer3 />
      <OceanLayer4 />
      <OceanLayer5 />
      <OceanLayer6 />
      <OceanWhale1 />
      <OceanWhale2 />
      <OceanWhale3 />
    </DioramaContainer>
  );
};

export default OceanDiorama;
