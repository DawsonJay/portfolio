import { ReactComponent as Whale2Svg } from '../../../dioramas/ocean-diorama/whale2.svg';
import WhaleWrapper from './WhaleWrapper';

interface Whale2Props {
  themeLayerNumber: number;
}

const Whale2 = ({ themeLayerNumber }: Whale2Props) => {
  return (
    <WhaleWrapper themeLayerNumber={themeLayerNumber}>
      <Whale2Svg
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

export default Whale2;
