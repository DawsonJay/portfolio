import BackgroundLeaves1 from './BackgroundLeaves1';
import BackgroundLeaves2 from './BackgroundLeaves2';
import Shelf from './Shelf';
import Highlights1 from './Highlights1';
import Highlights2 from './Highlights2';
import Supports from './Supports';
import DioramaContainer from '../shared/DioramaContainer';
import { dioramaSettings } from './config';

const ShelfDiorama = () => {
  return (
    <DioramaContainer
      size={dioramaSettings.size}
      shape={dioramaSettings.shape}
      backgroundColor={dioramaSettings.backgroundColor}
      overflow="visible"
    >
      <Supports />
      <BackgroundLeaves1 />
      <BackgroundLeaves2 />
      <Shelf />
      <Highlights1 />
      <Highlights2 />
    </DioramaContainer>
  );
};

export default ShelfDiorama;

