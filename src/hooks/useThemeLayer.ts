import { useMemo } from 'react';
import { colorSpectrum } from '../theme';
import { mapDioramaLayerToThemeLayer, getColorForThemeLayer, calculateZIndex } from '../utils/diorama/themeLayer';

interface ThemeLayerMapping {
  [dioramaLayerNumber: number]: number;
}

interface UseThemeLayerOptions {
  dioramaLayerNumber: number;
  mapping?: ThemeLayerMapping;
  maxLayers?: number;
}

interface UseThemeLayerReturn {
  themeLayerNumber: number;
  color: string;
  zIndex: number;
}

/**
 * Hook to handle theme layer mapping, color lookup, and z-index calculation.
 * 
 * @param options - Configuration options
 * @param options.dioramaLayerNumber - The diorama-specific layer number (e.g., 1-6 for ocean)
 * @param options.mapping - Optional mapping from diorama layer to theme layer (defaults to 1:1)
 * @param options.maxLayers - Maximum number of theme layers (defaults to 11)
 * @returns Theme layer number, color, and z-index
 */
export const useThemeLayer = ({
  dioramaLayerNumber,
  mapping,
  maxLayers = 11,
}: UseThemeLayerOptions): UseThemeLayerReturn => {
  return useMemo(() => {
    const themeLayerNumber = mapDioramaLayerToThemeLayer(dioramaLayerNumber, mapping);
    const color = getColorForThemeLayer(themeLayerNumber, colorSpectrum);
    const zIndex = calculateZIndex(themeLayerNumber, maxLayers);

    return {
      themeLayerNumber,
      color,
      zIndex,
    };
  }, [dioramaLayerNumber, mapping, maxLayers]);
};

