import { ReactComponent as Layer4Svg } from '../../../dioramas/ocean-diorama/layer4.svg';
import LayerWrapper from './LayerWrapper';
import { colorSpectrum } from '../../../theme';

interface Layer4Props {
  themeLayerNumber: number;
}

const Layer4 = ({ themeLayerNumber }: Layer4Props) => {
  const darkestColor = colorSpectrum[0];
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer4Svg
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

export default Layer4;

