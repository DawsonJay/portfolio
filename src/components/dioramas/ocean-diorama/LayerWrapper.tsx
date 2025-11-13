import type { ReactNode } from 'react';
import { colorSpectrum, clockworkDurations } from '../../../theme';

interface LayerWrapperProps {
  themeLayerNumber: number;
  children: ReactNode;
}

const LayerWrapper = ({ themeLayerNumber, children }: LayerWrapperProps) => {
  // Map 6 layers evenly across 11 theme layers (1-11)
  // Layer 1 (surface) → theme layer 1 (colorSpectrum[0] - darkest)
  // Layer 6 (deepest) → theme layer 11 (colorSpectrum[10] - lightest)
  // Distribution: 1, 3, 4, 7, 9, 11
  // Free layers for whales: 2, 5, 6, 8, 10
  const themeLayerMap: Record<number, number> = {
    1: 1,  // Theme layer 1 - Surface - darkest
    2: 3,  // Theme layer 3
    3: 4,  // Theme layer 4 (swapped with Whale2)
    4: 7,  // Theme layer 7
    5: 9,  // Theme layer 9
    6: 11, // Theme layer 11 - Deepest - lightest
  };
  const actualThemeLayer = themeLayerMap[themeLayerNumber] ?? 1;
  const colorIndex = actualThemeLayer - 1;
  const color = colorSpectrum[colorIndex];
  
  // z-index: inversely proportional to actual theme layer number (1-11)
  // Theme layer 1 (surface/closest) should have highest z-index
  // Theme layer 11 (deepest/furthest) should have lowest z-index
  const zIndex = 12 - actualThemeLayer;

  // Map layers to animation durations (inverse mapping - deeper = faster)
  // Layer 1 (surface) = no animation
  // Smooth progression: each deeper layer rotates faster than the one above
  // Layer 2 (slowest) → Layer 6 (fastest)
  const durationMap: Record<number, number | null> = {
    1: null,        // Surface - no movement
    2: clockworkDurations[9],  // 240 seconds - slowest
    3: clockworkDurations[8],  // 120 seconds
    4: clockworkDurations[7],  // 96 seconds
    5: clockworkDurations[6],  // 60 seconds
    6: clockworkDurations[4],  // 30 seconds - fastest
  };
  const animationDuration = durationMap[themeLayerNumber];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: zIndex,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(animationDuration && {
          animation: `rotate-counter-clockwise ${animationDuration}ms linear infinite`,
        }),
      }}
    >
      {children}
    </div>
  );
};

export default LayerWrapper;

