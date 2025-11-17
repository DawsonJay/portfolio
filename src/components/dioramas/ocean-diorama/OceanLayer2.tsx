import { ReactComponent as Layer2Svg } from '../../../dioramas/ocean-diorama/layer2.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer2 = () => {
  const config = layerConfigs[1]; // Layer 2
  return <DioramaLayer SvgComponent={Layer2Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer2;

