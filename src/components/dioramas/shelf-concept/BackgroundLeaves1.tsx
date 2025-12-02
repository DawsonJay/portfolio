import { ReactComponent as BackgroundLeaves1Svg } from '../../../dioramas/shelf-concept/background-leaves-1.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const BackgroundLeaves1 = () => {
  const config = layerConfigs[1]; // background-leaves-1 (dioramaLayerNumber 5)
  return <DioramaLayer SvgComponent={BackgroundLeaves1Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default BackgroundLeaves1;

