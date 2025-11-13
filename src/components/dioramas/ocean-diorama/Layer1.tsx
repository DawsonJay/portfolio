import { ReactComponent as Layer1Svg } from '../../../dioramas/ocean-diorama/layer1.svg';
import LayerWrapper from './LayerWrapper';
import { colorSpectrum } from '../../../theme';

interface Layer1Props {
  themeLayerNumber: number;
}

const Layer1 = ({ themeLayerNumber }: Layer1Props) => {
  const darkestColor = colorSpectrum[0];
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer1Svg
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          filter: `drop-shadow(rgba(10, 15, 26, 0.5) 0px 2px 2px) drop-shadow(rgba(10, 15, 26, 0.4) 0px 1px 1px)`,
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </LayerWrapper>
  );
};

export default Layer1;

