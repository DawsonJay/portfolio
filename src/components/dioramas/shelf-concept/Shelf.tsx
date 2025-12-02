import { ReactComponent as ShelfSvg } from '../../../dioramas/shelf-concept/shelf.svg';
import DioramaLayer from '../shared/DioramaLayer';
import { layerConfigs } from './config';

const Shelf = () => {
  const config = layerConfigs[3]; // shelf (dioramaLayerNumber 3)
  return <DioramaLayer SvgComponent={ShelfSvg} dioramaLayerNumber={config.dioramaLayerNumber} layerConfig={config} />;
};

export default Shelf;

