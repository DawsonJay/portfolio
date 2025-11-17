import type { AnimationConfig } from '../../hooks/useDioramaAnimation';

/**
 * Gets the CSS animation style object based on animation configuration.
 * 
 * @param config - Animation configuration
 * @returns CSS style object with animation properties
 */
export const getAnimationStyle = (config: AnimationConfig): React.CSSProperties => {
  if (config.type === 'none') {
    return {};
  }

  if (config.type === 'custom' && config.customStyle) {
    return config.customStyle;
  }

  if (config.type === 'custom' && config.customKeyframe) {
    return {
      animation: config.customKeyframe,
    };
  }

  const duration = config.duration ?? null;
  if (!duration) {
    return {};
  }

  const timingFunction = config.timingFunction || 'linear';
  const direction = config.direction || 'counter-clockwise';

  if (config.type === 'rotation') {
    const rotationDirection = direction === 'clockwise' ? 'clockwise' : 'counter-clockwise';
    const keyframeName = rotationDirection === 'clockwise' 
      ? 'rotate-clockwise' 
      : 'rotate-counter-clockwise';
    
    return {
      animation: `${keyframeName} ${duration}ms ${timingFunction} infinite`,
    };
  }

  if (config.type === 'scroll') {
    // Determine scroll direction
    let keyframeName = 'scroll-whale'; // Default right-to-left
    if (direction === 'right') {
      keyframeName = 'scroll-whale-right';
    } else if (direction === 'up') {
      keyframeName = 'scroll-whale-up';
    } else if (direction === 'down') {
      keyframeName = 'scroll-whale-down';
    }
    // Default is left (right-to-left scroll)

    return {
      animation: `${keyframeName} ${duration}ms ${timingFunction} infinite`,
    };
  }

  return {};
};

