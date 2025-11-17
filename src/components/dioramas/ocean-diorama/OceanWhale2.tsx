import { ReactComponent as Whale2Svg } from '../../../dioramas/ocean-diorama/whale2.svg';
import DioramaEntity from '../shared/DioramaEntity';
import { entityConfigs } from './config';

const OceanWhale2 = () => {
  const config = entityConfigs[1]; // Whale2
  return <DioramaEntity SvgComponent={Whale2Svg} dioramaLayerNumber={config.dioramaLayerNumber} entityConfig={config} />;
};

export default OceanWhale2;

