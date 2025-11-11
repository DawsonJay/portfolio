import { ReactNode } from 'react';
import { colorSpectrum, clockworkDurations } from '../../../theme';

interface LayerWrapperProps {
  themeLayerNumber: number;
  children: ReactNode;
}

const LayerWrapper = ({ themeLayerNumber, children }: LayerWrapperProps) => {
  // Map 6 layers evenly across 10 theme layers (1-10)
  // Layer 1 (surface) → theme layer 1 (colorSpectrum[0] - darkest)
  // Layer 6 (deepest) → theme layer 10 (colorSpectrum[9] - lightest)
  // Even distribution: 1, 3, 5, 6, 8, 10
  // Free layers for whales: 2, 4, 7, 9 (but skipping 9, so whales use 2, 4, 7)
  const themeLayerMap: Record<number, number> = {
    1: 1,  // Theme layer 1 - Surface - darkest
    2: 3,  // Theme layer 3
    3: 5,  // Theme layer 5
    4: 6,  // Theme layer 6
    5: 8,  // Theme layer 8
    6: 10, // Theme layer 10 - Deepest - lightest
  };
  const actualThemeLayer = themeLayerMap[themeLayerNumber] ?? 1;
  const colorIndex = actualThemeLayer - 1;
  const color = colorSpectrum[colorIndex];
  
  // z-index: inversely proportional to actual theme layer number (1-10)
  // Theme layer 1 (surface/closest) should have highest z-index
  // Theme layer 10 (deepest/furthest) should have lowest z-index
  const zIndex = 11 - actualThemeLayer;

  // Map layers to animation durations (inverse mapping - deeper = faster)
  // Layer 1 (surface) = no animation
  // Ocean diorama uses clockworkDurations indices 4, 6, 8, 9, 10 (30s, 60s, 120s, 240s, 480s)
  // where 30s is the fastest (Layer 6) and 480s is the slowest (Layer 2)
  const durationMap: Record<number, number | null> = {
    1: null,        // Surface - no movement
    2: clockworkDurations[10], // 480 seconds - slowest
    3: clockworkDurations[9],  // 240 seconds
    4: clockworkDurations[8],  // 120 seconds
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

