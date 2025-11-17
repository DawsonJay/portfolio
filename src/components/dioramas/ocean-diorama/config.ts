import { clockworkDurations } from '../../../theme';
import type { AnimationConfig } from '../../../hooks/useDioramaAnimation';
import type { ShapeSize, DioramaShape } from '../../../utils/diorama/shapes';

/**
 * Ocean Diorama Configuration
 * 
 * Defines the structure, layers, entities, and settings for the ocean diorama.
 */

// Diorama settings
export const dioramaSettings = {
  size: { width: 400, height: 400 } as ShapeSize,
  shape: 'circle' as DioramaShape,
  backgroundColor: '#000000',
  frameOffset: 10,
  frameOuterSize: { width: 420, height: 420 } as ShapeSize,
  frameInnerSize: { width: 390, height: 390 } as ShapeSize, // 195px radius * 2
};

// Theme layer mapping for layers
// Maps diorama layer numbers (1-6) to theme layer numbers (1-11)
export const layerThemeMapping: Record<number, number> = {
  1: 1,  // Theme layer 1 - Surface - darkest
  2: 3,  // Theme layer 3
  3: 4,  // Theme layer 4
  4: 7,  // Theme layer 7
  5: 9,  // Theme layer 9
  6: 11, // Theme layer 11 - Deepest - lightest
};

// Layer configurations
export const layerConfigs = [
  {
    dioramaLayerNumber: 1,
    themeLayerMapping: layerThemeMapping,
    animation: null as AnimationConfig | null, // Surface - no movement
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
  {
    dioramaLayerNumber: 2,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[9], // 240 seconds - slowest
      direction: 'counter-clockwise',
    },
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
  {
    dioramaLayerNumber: 3,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[8], // 120 seconds
      direction: 'counter-clockwise',
    },
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
  {
    dioramaLayerNumber: 4,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[7], // 96 seconds
      direction: 'counter-clockwise',
    },
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
  {
    dioramaLayerNumber: 5,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[6], // 60 seconds
      direction: 'counter-clockwise',
    },
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
  {
    dioramaLayerNumber: 6,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[4], // 30 seconds - fastest
      direction: 'counter-clockwise',
    },
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 4px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 2px)',
  },
];

// Entity (whale) configurations
export const entityConfigs = [
  {
    dioramaLayerNumber: 2,
    themeLayerMapping: {}, // Uses direct mapping (2 → 2)
    size: {
      2: 50, // Whale1 - 50% size
    },
    position: {
      vertical: {
        2: '-15%', // Whale1 - 15% higher than center
      },
    },
    animation: {
      type: 'scroll' as const,
      duration: clockworkDurations[8], // 120 seconds - slowest
      direction: 'left', // right-to-left scroll
    },
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
  },
  {
    dioramaLayerNumber: 5,
    themeLayerMapping: {}, // Uses direct mapping (5 → 5)
    size: {
      5: 40, // Whale2 - 40% size
    },
    position: {
      vertical: {
        5: '15%', // Whale2 - 15% lower than center
      },
    },
    animation: {
      type: 'scroll' as const,
      duration: clockworkDurations[6], // 60 seconds
      direction: 'left',
    },
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
  },
  {
    dioramaLayerNumber: 8,
    themeLayerMapping: {}, // Uses direct mapping (8 → 8)
    size: {
      8: 30, // Whale3 - 30% size
    },
    position: {
      vertical: {
        8: '0%', // Whale3 - centered
      },
    },
    animation: {
      type: 'scroll' as const,
      duration: clockworkDurations[4], // 30 seconds - fastest
      direction: 'left',
    },
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))',
  },
];

