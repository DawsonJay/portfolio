import { ReactComponent as Whale3Svg } from '../../../dioramas/ocean-diorama/whale3.svg';
import DioramaEntity from '../shared/DioramaEntity';
import { entityConfigs } from './config';

const OceanWhale3 = () => {
  const config = entityConfigs[2]; // Whale3
  return <DioramaEntity SvgComponent={Whale3Svg} dioramaLayerNumber={config.dioramaLayerNumber} entityConfig={config} />;
};

export default OceanWhale3;

