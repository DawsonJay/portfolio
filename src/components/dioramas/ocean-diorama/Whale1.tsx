import { ReactComponent as Whale1Svg } from '../../../dioramas/ocean-diorama/whale1.svg';
import whale1SvgUrl from '../../../dioramas/ocean-diorama/whale1.svg?url';
import WhaleWrapper from './WhaleWrapper';
import TexturedSvg from './TexturedSvg';

interface Whale1Props {
  themeLayerNumber: number;
}

const Whale1 = ({ themeLayerNumber }: Whale1Props) => {
  const textureUrl = 'https://www.transparenttextures.com/patterns/asfalt-light.png';
  const textureOpacity = 0.6;

  return (
    <WhaleWrapper themeLayerNumber={themeLayerNumber}>
      <TexturedSvg
        SvgComponent={Whale1Svg}
        svgUrl={whale1SvgUrl}
        textureUrl={textureUrl}
        textureOpacity={textureOpacity}
        svgProps={{
          style: {
            filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
          },
        }}
      />
    </WhaleWrapper>
  );
};

export default Whale1;

