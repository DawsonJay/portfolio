import { useMemo, useId } from 'react';
import { getFrameMask, type DioramaShape, type ShapeSize } from '../../../utils/diorama/shapes';

interface DioramaFrameProps {
  shape: DioramaShape;
  outerSize: ShapeSize;
  innerSize: ShapeSize;
  color: string;
  zIndex?: number;
  offset?: number;
}

/**
 * Generic frame component that obscures the outer shadows of diorama layers.
 * Uses an SVG with an outer shape and inner cutout to create a frame effect.
 */
const DioramaFrame = ({
  shape,
  outerSize,
  innerSize,
  color,
  zIndex = 20,
  offset = 10,
}: DioramaFrameProps) => {
  const uniqueId = useId();
  const { outerElement, innerElement } = useMemo(
    () => getFrameMask(shape, outerSize, innerSize),
    [shape, outerSize, innerSize]
  );
  const maskId = `frame-mask-${uniqueId}`;

  return (
    <div
      style={{
        position: 'absolute',
        top: `-${offset}px`,
        left: `-${offset}px`,
        width: `${outerSize.width}px`,
        height: `${outerSize.height}px`,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <svg
        width={outerSize.width}
        height={outerSize.height}
        viewBox={`0 0 ${outerSize.width} ${outerSize.height}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <mask id={maskId}>
            {outerElement}
            {innerElement}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width={outerSize.width}
          height={outerSize.height}
          fill={color}
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
};

export default DioramaFrame;

