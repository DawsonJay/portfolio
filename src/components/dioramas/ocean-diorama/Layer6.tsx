import { ReactComponent as Layer6Svg } from '../../../dioramas/ocean-diorama/layer6.svg';
import LayerWrapper from './LayerWrapper';
import { colorSpectrum } from '../../../theme';

interface Layer6Props {
  themeLayerNumber: number;
}

const Layer6 = ({ themeLayerNumber }: Layer6Props) => {
  const darkestColor = colorSpectrum[0];
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer6Svg
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

export default Layer6;

