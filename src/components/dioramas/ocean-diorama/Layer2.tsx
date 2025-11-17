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
          filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </LayerWrapper>
  );
};

export default Layer2;

