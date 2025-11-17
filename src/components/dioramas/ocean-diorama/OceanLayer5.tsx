import { ReactComponent as Layer5Svg } from '../../../dioramas/ocean-diorama/layer5.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const OceanLayer5 = () => {
  const config = layerConfigs[4]; // Layer 5
  return <DioramaLayer SvgComponent={Layer5Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default OceanLayer5;

