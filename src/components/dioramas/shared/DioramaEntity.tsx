import type { ComponentType, SVGProps } from 'react';
import { useThemeLayer } from '../../../hooks/useThemeLayer';
import { useDioramaAnimation, type AnimationConfig } from '../../../hooks/useDioramaAnimation';

interface DioramaEntityProps {
  SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  dioramaLayerNumber: number;
  entityConfig: {
    themeLayerMapping?: Record<number, number>;
    size?: number | Record<number, number>;
    position?: {
      vertical?: string | Record<number, string>;
      horizontal?: string | Record<number, string>;
    };
    animation?: AnimationConfig | null;
    filter?: string;
    maxLayers?: number;
  };
}

/**
 * Generic entity component for dioramas (e.g., whales, characters, objects).
 * Handles theme layer mapping, color, z-index, size, position, and animations.
 */
const DioramaEntity = ({
  SvgComponent,
  dioramaLayerNumber,
  entityConfig,
}: DioramaEntityProps) => {
  const { color, zIndex } = useThemeLayer({
    dioramaLayerNumber,
    mapping: entityConfig.themeLayerMapping,
    maxLayers: entityConfig.maxLayers,
  });

  const { animationStyle } = useDioramaAnimation(entityConfig.animation);

  // Calculate size (entities are variable size, layers are always 100%)
  const sizePercent = typeof entityConfig.size === 'number'
    ? entityConfig.size
    : entityConfig.size?.[dioramaLayerNumber] ?? 100;

  // Calculate vertical position
  const verticalOffset = typeof entityConfig.position?.vertical === 'string'
    ? entityConfig.position.vertical
    : entityConfig.position?.vertical?.[dioramaLayerNumber] ?? '0%';

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
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
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          ...animationStyle,
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
          <SvgComponent
            style={{
              width: '100%',
              height: '100%',
              filter: entityConfig.filter,
            }}
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      </div>
    </div>
  );
};

export default DioramaEntity;

