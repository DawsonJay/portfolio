import type { ShapeSize, DioramaShape } from '../../../utils/diorama/shapes';

/**
 * Shelf Diorama Configuration
 * 
 * Defines the structure and settings for the shelf diorama.
 */

// Diorama settings
// Using A4 aspect ratio (595.2:841.92 ≈ 0.707) but scaled down for display
// Keeping full viewBox for alignment purposes
export const dioramaSettings = {
  size: { width: 800, height: 1132 } as ShapeSize, // Scaled A4 (maintains aspect ratio) - 2x size
  shape: 'rectangle' as DioramaShape,
  backgroundColor: 'transparent', // Transparent background - no white
  frameOffset: 0,
  frameOuterSize: { width: 800, height: 1132 } as ShapeSize,
  frameInnerSize: { width: 800, height: 1132 } as ShapeSize,
};

// Theme layer mapping for layers
// Maps diorama layer numbers (1-6) to theme layer numbers (2-7)
// Starting from second darkest (layer2) and going lighter
// Backmost (supports) is darkest, frontmost (highlights2) is lightest
export const layerThemeMapping: Record<number, number> = {
  1: 2,  // supports → theme layer 2 (second darkest - backmost)
  2: 3,  // background-leaves-1 → theme layer 3
  3: 4,  // background-leaves-2 → theme layer 4
  4: 5,  // shelf → theme layer 5
  5: 6,  // highlights-1 → theme layer 6
  6: 7,  // highlights-2 → theme layer 7 (lightest - frontmost)
};

// Layer configurations - ordered from back to front
// dioramaLayerNumber controls z-index (higher = in front)
export const layerConfigs = [
  {
    dioramaLayerNumber: 6, // supports (backmost, but highest z-index to appear in front visually)
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 5, // background-leaves-1
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 4, // background-leaves-2
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 3, // shelf
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 2, // highlights-1
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
  {
    dioramaLayerNumber: 1, // highlights-2 (frontmost, but lowest z-index to appear in back visually)
    themeLayerMapping: layerThemeMapping,
    animation: null,
    filter: 'drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)',
  },
];

