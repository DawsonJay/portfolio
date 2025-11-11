import { ReactComponent as Whale1Svg } from '../../../dioramas/ocean-diorama/whale1.svg';
import WhaleWrapper from './WhaleWrapper';

interface Whale1Props {
  themeLayerNumber: number;
}

const Whale1 = ({ themeLayerNumber }: Whale1Props) => {
  return (
    <WhaleWrapper themeLayerNumber={themeLayerNumber}>
      <Whale1Svg
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

export default Whale1;

