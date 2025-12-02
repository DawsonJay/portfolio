import { ReactComponent as Highlights1Svg } from '../../../dioramas/shelf-concept/highlights-1.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const Highlights1 = () => {
  const config = layerConfigs[4]; // highlights-1 (dioramaLayerNumber 2)
  return <DioramaLayer SvgComponent={Highlights1Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default Highlights1;

