import { ReactComponent as Layer4Svg } from '../../../dioramas/ocean-diorama/layer4.svg';
import LayerWrapper from './LayerWrapper';

interface Layer4Props {
  themeLayerNumber: number;
}

const Layer4 = ({ themeLayerNumber }: Layer4Props) => {
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer4Svg
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

export default Layer4;

