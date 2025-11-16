import { ReactComponent as Whale3Svg } from '../../../dioramas/ocean-diorama/whale3.svg';
import WhaleWrapper from './WhaleWrapper';

interface Whale3Props {
  themeLayerNumber: number;
}

const Whale3 = ({ themeLayerNumber }: Whale3Props) => {
  return (
    <WhaleWrapper themeLayerNumber={themeLayerNumber}>
      <Whale3Svg
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </WhaleWrapper>
  );
};

export default Whale3;
