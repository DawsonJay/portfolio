import { ReactComponent as Layer2Svg } from '../../../dioramas/ocean-diorama/layer2.svg';
import LayerWrapper from './LayerWrapper';
import { colorSpectrum } from '../../../theme';

interface Layer2Props {
  themeLayerNumber: number;
}

const Layer2 = ({ themeLayerNumber }: Layer2Props) => {
  const darkestColor = colorSpectrum[0];
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer2Svg
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

export default Layer2;

