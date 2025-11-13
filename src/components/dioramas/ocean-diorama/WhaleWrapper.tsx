import type { ReactNode } from 'react';
import { colorSpectrum, clockworkDurations } from '../../../theme';

interface WhaleWrapperProps {
  themeLayerNumber: number;
  children: ReactNode;
}

const WhaleWrapper = ({ themeLayerNumber, children }: WhaleWrapperProps) => {
  // Map theme layer to color index (theme layers 2, 5, 8 for whales)
  const colorIndex = themeLayerNumber - 1;
  const color = colorSpectrum[colorIndex];
  
  // z-index: inversely proportional to theme layer number (1-11)
  // Theme layer 2 (shallower) should have higher z-index than theme layer 8 (deeper)
  const zIndex = 12 - themeLayerNumber;

  // Size based on depth - deeper whales are smaller
  // Theme layer 2 (shallower) = 50%, layer 5 = 40%, layer 8 (deeper) = 30%
  const sizeMap: Record<number, number> = {
    2: 50, // Shallower - largest
    5: 40, // Medium
    8: 30, // Deeper - smallest
  };
  const sizePercent = sizeMap[themeLayerNumber] ?? 100;

  // Scroll animation duration - deeper whales move faster
  // Using clockwork durations for consistency
  const scrollDurationMap: Record<number, number> = {
    2: clockworkDurations[8],  // 120 seconds - slowest
    5: clockworkDurations[6],  // 60 seconds
    8: clockworkDurations[4],  // 30 seconds - fastest
  };
  const scrollDuration = scrollDurationMap[themeLayerNumber] ?? 60000;

  // Vertical positioning - Whale1 (layer 2) higher, Whale2 (layer 5) lower
  // Using percentage offsets from center (50%) for responsive scaling
  const verticalOffsetMap: Record<number, string> = {
    2: '-15%', // Whale1 - 15% higher than center
    5: '15%',  // Whale2 - 15% lower than center
    8: '0%',   // Whale3 - centered
  };
  const verticalOffset = verticalOffsetMap[themeLayerNumber] ?? '0%';

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: zIndex,
        transform: `translateY(calc(-50% + ${verticalOffset}))`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          animation: `scroll-whale ${scrollDuration}ms linear infinite`,
        }}
      >
        <div
          style={{
            width: `${sizePercent}%`,
            height: `${sizePercent}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WhaleWrapper;

