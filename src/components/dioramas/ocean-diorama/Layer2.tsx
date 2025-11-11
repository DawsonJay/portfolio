import { ReactComponent as Layer2Svg } from '../../../dioramas/ocean-diorama/layer2.svg';
import LayerWrapper from './LayerWrapper';

interface Layer2Props {
  themeLayerNumber: number;
}

const Layer2 = ({ themeLayerNumber }: Layer2Props) => {
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer2Svg
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

export default Layer2;

