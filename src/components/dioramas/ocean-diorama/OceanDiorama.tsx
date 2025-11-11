import Layer1 from './Layer1';
import Layer2 from './Layer2';
import Layer3 from './Layer3';
import Layer4 from './Layer4';
import Layer5 from './Layer5';
import Layer6 from './Layer6';
import Whale1 from './Whale1';
import Whale2 from './Whale2';
import Whale3 from './Whale3';
import DioramaFrame from './DioramaFrame';

const OceanDiorama = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        overflow: 'visible', // Allow frame to extend beyond
      }}
    >
      {/* Clipped content container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden', // Clip whales to circular diorama area
          backgroundColor: '#000000', // Dark background to see the layers
          clipPath: 'circle(200px at 50% 50%)', // Circular clip to match diorama
        }}
      >
        <Layer1 themeLayerNumber={1} />
        <Layer2 themeLayerNumber={2} />
        <Layer3 themeLayerNumber={3} />
        <Layer4 themeLayerNumber={4} />
        <Layer5 themeLayerNumber={5} />
        <Layer6 themeLayerNumber={6} />
        <Whale1 themeLayerNumber={2} />
        <Whale2 themeLayerNumber={4} />
        <Whale3 themeLayerNumber={7} />
      </div>
      {/* Frame outside clipped container so it can extend beyond */}
      <DioramaFrame />
    </div>
  );
};

export default OceanDiorama;

