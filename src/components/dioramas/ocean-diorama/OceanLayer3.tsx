import { ReactComponent as Layer3Svg } from '../../../dioramas/ocean-diorama/layer3.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer3 = () => {
  const config = layerConfigs[2]; // Layer 3
  return <DioramaLayer SvgComponent={Layer3Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer3;

