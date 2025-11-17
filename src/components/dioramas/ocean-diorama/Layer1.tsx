import { ReactComponent as Layer1Svg } from '../../../dioramas/ocean-diorama/layer1.svg';
import LayerWrapper from './LayerWrapper';

interface Layer1Props {
  themeLayerNumber: number;
}

const Layer1 = ({ themeLayerNumber }: Layer1Props) => {
  return (
    <LayerWrapper themeLayerNumber={themeLayerNumber}>
      <Layer1Svg
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

export default Layer1;

