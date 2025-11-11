import { colorSpectrum } from '../../../theme';

/**
 * Frame component that obscures the outer shadows of the diorama layers.
 * Uses an SVG with a square outer shape and circular inner cutout to create a frame effect.
 */
const DioramaFrame = () => {
  // Use the top layer color (same as page background) to blend seamlessly
  const frameColor = colorSpectrum[0];
  
  // Frame should be on top of all layers
  const frameZIndex = 20;
  
  // Make frame slightly larger to cover shadows that extend beyond the container
  const frameSize = 420; // Slightly larger than 400px container
  const centerX = frameSize / 2;
  const centerY = frameSize / 2;
  // Make the cutout slightly smaller than the diorama radius (200px)
  // This causes the frame to overlap the outermost layer, clipping its outer shadow
  const circleRadius = 195; // Slightly smaller to overlap and clip the shadow

  return (
    <div
      style={{
        position: 'absolute',
        top: '-10px', // Extend beyond container
        left: '-10px',
        width: `${frameSize}px`,
        height: `${frameSize}px`,
        zIndex: frameZIndex,
        pointerEvents: 'none', // Allow clicks to pass through
      }}
    >
      <svg
        width={frameSize}
        height={frameSize}
        viewBox={`0 0 ${frameSize} ${frameSize}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <mask id="frame-mask">
            {/* White covers everything */}
            <rect x="0" y="0" width={frameSize} height={frameSize} fill="white" />
            {/* Black circle cuts out the center */}
            <circle cx={centerX} cy={centerY} r={circleRadius} fill="black" />
          </mask>
        </defs>
        {/* Square frame with circular cutout using mask */}
        <rect
          x="0"
          y="0"
          width={frameSize}
          height={frameSize}
          fill={frameColor}
          mask="url(#frame-mask)"
        />
      </svg>
    </div>
  );
};

export default DioramaFrame;

