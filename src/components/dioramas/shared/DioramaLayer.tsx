import type { ComponentType, SVGProps } from 'react';
import { useThemeLayer } from '../../../hooks/useThemeLayer';
import { useDioramaAnimation, type AnimationConfig } from '../../../hooks/useDioramaAnimation';

interface DioramaLayerProps {
  SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  dioramaLayerNumber: number;
  layerConfig: {
    themeLayerMapping?: Record<number, number>;
    animation?: AnimationConfig | null;
    filter?: string;
    maxLayers?: number;
  };
}

/**
 * Generic layer component for dioramas.
 * Handles theme layer mapping, color, z-index, and animations.
 */
const DioramaLayer = ({
  SvgComponent,
  dioramaLayerNumber,
  layerConfig,
}: DioramaLayerProps) => {
  const { color, zIndex } = useThemeLayer({
    dioramaLayerNumber,
    mapping: layerConfig.themeLayerMapping,
    maxLayers: layerConfig.maxLayers,
  });

  const { animationStyle } = useDioramaAnimation(layerConfig.animation);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...animationStyle,
      }}
    >
      <SvgComponent
        style={{
          width: '100%',
          height: '100%',
          filter: layerConfig.filter,
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default DioramaLayer;

