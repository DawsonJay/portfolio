import { ReactComponent as Layer3Svg } from '../../../dioramas/ocean-diorama/layer3.svg';
import LayerWrapper from './LayerWrapper';
import { colorSpectrum } from '../../../theme';

interface Layer3Props {
  themeLayerNumber: number;
}

const Layer3 = ({ themeLayerNumber }: Layer3Props) => {
  const darkestColor = colorSpectrum[0];

  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer3Svg
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          filter: `drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)`,
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </LayerWrapper>
  );
};

export default Layer3;

