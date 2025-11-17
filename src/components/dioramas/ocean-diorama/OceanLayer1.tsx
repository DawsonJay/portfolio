import { ReactComponent as Layer1Svg } from '../../../dioramas/ocean-diorama/layer1.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer1 = () => {
  const config = layerConfigs[0]; // Layer 1
  return <DioramaLayer SvgComponent={Layer1Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer1;

