
/**
 * Maps a diorama layer number to a theme layer number.
 * 
 * @param dioramaLayerNumber - The diorama-specific layer number
 * @param mapping - Optional mapping object (defaults to 1:1 mapping)
 * @returns The theme layer number
 */
export const mapDioramaLayerToThemeLayer = (
  dioramaLayerNumber: number,
  mapping?: Record<number, number>
): number => {
  if (mapping && mapping[dioramaLayerNumber] !== undefined) {
    return mapping[dioramaLayerNumber];
  }
  // Default to 1:1 mapping
  return dioramaLayerNumber;
};

/**
 * Gets the color for a given theme layer number.
 * 
 * @param themeLayerNumber - The theme layer number (1-based)
 * @param colorSpectrum - The color spectrum array
 * @returns The color string
 */
export const getColorForThemeLayer = (
  themeLayerNumber: number,
  colorSpectrum: readonly string[]
): string => {
  const colorIndex = themeLayerNumber - 1;
  if (colorIndex < 0 || colorIndex >= colorSpectrum.length) {
    // Fallback to first color if out of range
    return colorSpectrum[0] || '#000000';
  }
  return colorSpectrum[colorIndex];
};

/**
 * Calculates z-index based on theme layer number.
 * Higher theme layer numbers (deeper layers) get lower z-index values.
 * 
 * @param themeLayerNumber - The theme layer number (1-based)
 * @param maxLayers - Maximum number of layers (defaults to 11)
 * @returns The z-index value
 */
export const calculateZIndex = (themeLayerNumber: number, maxLayers: number = 11): number => {
  // Theme layer 1 (surface/closest) should have highest z-index
  // Theme layer maxLayers (deepest/furthest) should have lowest z-index
  return maxLayers + 1 - themeLayerNumber;
};

