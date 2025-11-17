import React from 'react';

export type DioramaShape = 'circle' | 'rectangle';

export interface ShapeSize {
  width: number;
  height: number;
}

/**
 * Gets the CSS clip-path value for a given shape and size.
 * 
 * @param shape - The shape type
 * @param size - The size dimensions
 * @returns CSS clip-path value
 */
export const getClipPath = (shape: DioramaShape, size: ShapeSize): string => {
  if (shape === 'circle') {
    const radius = Math.min(size.width, size.height) / 2;
    return `circle(${radius}px at 50% 50%)`;
  }

  if (shape === 'rectangle') {
    return `inset(0)`;
  }

  return 'none';
};

/**
 * Gets the SVG mask path for a frame.
 * 
 * @param shape - The shape type
 * @param outerSize - The outer frame size
 * @param innerSize - The inner cutout size
 * @returns Object with SVG path elements for the mask
 */
export const getFrameMask = (
  shape: DioramaShape,
  outerSize: ShapeSize,
  innerSize: ShapeSize
): {
  outerElement: JSX.Element;
  innerElement: JSX.Element;
} => {
  const centerX = outerSize.width / 2;
  const centerY = outerSize.height / 2;

  if (shape === 'circle') {
    const radius = Math.min(innerSize.width, innerSize.height) / 2;
    return {
      outerElement: (
        <rect x="0" y="0" width={outerSize.width} height={outerSize.height} fill="white" />
      ),
      innerElement: (
        <circle cx={centerX} cy={centerY} r={radius} fill="black" />
      ),
    };
  }

  if (shape === 'rectangle') {
    const innerX = (outerSize.width - innerSize.width) / 2;
    const innerY = (outerSize.height - innerSize.height) / 2;
    return {
      outerElement: (
        <rect x="0" y="0" width={outerSize.width} height={outerSize.height} fill="white" />
      ),
      innerElement: (
        <rect x={innerX} y={innerY} width={innerSize.width} height={innerSize.height} fill="black" />
      ),
    };
  }

  // Fallback
  return {
    outerElement: <rect x="0" y="0" width={outerSize.width} height={outerSize.height} fill="white" />,
    innerElement: <rect x="0" y="0" width={0} height={0} fill="black" />,
  };
};

