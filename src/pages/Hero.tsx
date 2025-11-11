import OceanDiorama from '../components/dioramas/ocean-diorama/OceanDiorama';
import { colorSpectrum } from '../theme';

const Hero = () => {
  // Layer 1 (surface/top layer) uses themeLayerNumber 1, which maps to colorSpectrum[0]
  const topLayerColor = colorSpectrum[0];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: topLayerColor,
      }}
    >
      <OceanDiorama />
    </div>
  );
};

export default Hero;



