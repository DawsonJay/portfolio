import { ReactComponent as Highlights2Svg } from '../../../dioramas/shelf-concept/highlights-2.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const Highlights2 = () => {
  const config = layerConfigs[5]; // highlights-2 (dioramaLayerNumber 1)
  return <DioramaLayer SvgComponent={Highlights2Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default Highlights2;

