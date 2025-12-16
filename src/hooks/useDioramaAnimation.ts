import { useMemo } from 'react';
import { getAnimationStyle } from '../utils/diorama/animations';

export type AnimationType = 'rotation' | 'scroll' | 'none' | 'custom';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number | null;
  delay?: number;
  direction?: 'clockwise' | 'counter-clockwise' | 'left' | 'right' | 'up' | 'down';
  timingFunction?: string;
  customKeyframe?: string;
  customStyle?: React.CSSProperties;
  transformOrigin?: string;
}

interface UseDioramaAnimationReturn {
  animationStyle: React.CSSProperties;
}

/**
 * Hook to handle animation configuration for diorama elements.
 * 
 * @param config - Animation configuration
 * @returns CSS style object with animation properties
 */
export const useDioramaAnimation = (config: AnimationConfig | null | undefined): UseDioramaAnimationReturn => {
  return useMemo(() => {
    if (!config || config.type === 'none') {
      return { animationStyle: {} };
    }

    return {
      animationStyle: getAnimationStyle(config),
    };
  }, [config]);
};

