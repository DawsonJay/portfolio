import { ReactComponent as Layer6Svg } from '../../../dioramas/ocean-diorama/layer6.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer6 = () => {
  const config = layerConfigs[5]; // Layer 6
  return <DioramaLayer SvgComponent={Layer6Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer6;

