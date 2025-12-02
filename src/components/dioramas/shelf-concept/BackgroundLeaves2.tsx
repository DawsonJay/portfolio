import { ReactComponent as BackgroundLeaves2Svg } from '../../../dioramas/shelf-concept/background-leaves-2.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const BackgroundLeaves2 = () => {
  const config = layerConfigs[2]; // background-leaves-2 (dioramaLayerNumber 4)
  return <DioramaLayer SvgComponent={BackgroundLeaves2Svg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default BackgroundLeaves2;

