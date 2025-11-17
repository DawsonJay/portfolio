import { ReactComponent as Layer4Svg } from '../../../dioramas/ocean-diorama/layer4.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer4 = () => {
  const config = layerConfigs[3]; // Layer 4
  return <DioramaLayer SvgComponent={Layer4Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer4;

