import type { ReactNode } from 'react';
import { getClipPath, type DioramaShape, type ShapeSize } from '../../../utils/diorama/shapes';

interface DioramaContainerProps {
  size: ShapeSize;
  shape: DioramaShape;
  backgroundColor?: string;
  overflow?: 'visible' | 'hidden';
  children: ReactNode;
  frame?: ReactNode;
}

/**
 * Generic container component for dioramas.
 * Handles clipping, sizing, and background.
 * Frame is rendered outside the clipped container so it can extend beyond.
 */
const DioramaContainer = ({
  size,
  shape,
  backgroundColor = '#000000',
  overflow = 'visible',
  children,
  frame,
}: DioramaContainerProps) => {
  const clipPath = getClipPath(shape, size);

  return (
    <div
      style={{
        position: 'relative',
        width: `${size.width}px`,
        height: `${size.height}px`,
        overflow,
      }}
    >
      {/* Clipped content container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor,
          clipPath,
        }}
      >
        {children}
      </div>
      {/* Frame outside clipped container so it can extend beyond */}
      {frame}
    </div>
  );
};

export default DioramaContainer;

