import { ReactComponent as Layer3Svg } from '../../../dioramas/ocean-diorama/layer3.svg';
import LayerWrapper from './LayerWrapper';

interface Layer3Props {
  themeLayerNumber: number;
}

const Layer3 = ({ themeLayerNumber }: Layer3Props) => {
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer3Svg
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </LayerWrapper>
  );
};

export default Layer3;

