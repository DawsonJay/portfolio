import { clockworkDurations } from '../../../theme';
import type { AnimationConfig } from '../../../hooks/useDioramaAnimation';
import type { ShapeSize, DioramaShape } from '../../../utils/diorama/shapes';

/**
 * Shelf Concept Diorama Configuration
 * 
 * Defines the structure, layers, and settings for the shelf with lightbulb diorama.
 */

// Diorama settings - based on shelf viewBox (448.56 x 54.96)
// Scaled to a reasonable display size
export const dioramaSettings = {
  size: { width: 800, height: 100 } as ShapeSize, // Scaled proportionally
  shape: 'rectangle' as DioramaShape,
  backgroundColor: 'transparent',
  frameOffset: 0,
  frameOuterSize: { width: 800, height: 100 } as ShapeSize,
  frameInnerSize: { width: 800, height: 100 } as ShapeSize,
};

// Theme layer mapping for layers
// Shelf layers (back) use darker colors, lightbulb layers (front) use lighter colors
export const layerThemeMapping: Record<number, number> = {
  1: 2,  // Shelf layer 1 (backmost) → theme layer 2 (second darkest)
  2: 3,  // Shelf layer 2 → theme layer 3
  3: 2,  // Lightbulb layer 1 (topmost) → theme layer 2 (matches shelf layer 1)
  4: 5,  // Lightbulb layer 2 → theme layer 5
  5: 6,  // Lightbulb layer 3 → theme layer 6
  6: 7,  // Lightbulb layer 4 → theme layer 7
  7: 8,  // Lightbulb layer 5 → theme layer 8
  8: 9,  // Lightbulb layer 6 (lowest) → theme layer 9 (lighter)
};

// Layer configurations
export const layerConfigs = [
  {
    dioramaLayerNumber: 1, // Shelf layer 1
    themeLayerMapping: layerThemeMapping,
    animation: null as AnimationConfig | null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 2, // Shelf layer 2
    themeLayerMapping: layerThemeMapping,
    animation: null as AnimationConfig | null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 3, // Lightbulb layer 1 (topmost)
    themeLayerMapping: layerThemeMapping,
    animation: null as AnimationConfig | null,
    filter: undefined,
  },
  {
    dioramaLayerNumber: 4, // Lightbulb layer 2
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: 5000, // 5 seconds for testing
      direction: 'counter-clockwise' as const,
      transformOrigin: '37% 51%', // Pivot point left and up from center
    },
    filter: undefined,
  },
  {
    dioramaLayerNumber: 5, // Lightbulb layer 3
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[7], // 96 seconds
      direction: 'counter-clockwise' as const,
      transformOrigin: '37% 51%', // Pivot point left and up from center
    },
    filter: undefined,
  },
  {
    dioramaLayerNumber: 6, // Lightbulb layer 4
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[6], // 60 seconds
      direction: 'counter-clockwise' as const,
      transformOrigin: '37% 51%', // Pivot point left and up from center
    },
    filter: undefined,
  },
  {
    dioramaLayerNumber: 7, // Lightbulb layer 5
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: clockworkDurations[5], // 48 seconds
      direction: 'counter-clockwise' as const,
      transformOrigin: '37% 51%', // Pivot point left and up from center
    },
    filter: undefined,
  },
  {
    dioramaLayerNumber: 8, // Lightbulb layer 6 (lowest)
    themeLayerMapping: layerThemeMapping,
    animation: null as AnimationConfig | null,
    filter: undefined,
  },
];

