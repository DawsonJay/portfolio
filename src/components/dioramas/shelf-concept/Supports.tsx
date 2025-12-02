import { ReactComponent as SupportsSvg } from '../../../dioramas/shelf-concept/supports.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const Supports = () => {
  const config = layerConfigs[0]; // supports (dioramaLayerNumber 6)
  return <DioramaLayer SvgComponent={SupportsSvg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default Supports;

