import { ReactComponent as Whale1Svg } from '../../../dioramas/ocean-diorama/whale1.svg';
import DioramaEntity from '../shared/DioramaEntity';
import { entityConfigs } from './config';

const OceanWhale1 = () => {
  const config = entityConfigs[0]; // Whale1
  return <DioramaEntity SvgComponent={Whale1Svg} dioramaLayerNumber={config.dioramaLayerNumber} entityConfig={config} />;
};

export default OceanWhale1;

