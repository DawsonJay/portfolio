import type { ComponentType, SVGProps } from 'react';

interface TexturedSvgProps {
  SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  svgUrl: string;
  textureUrl: string;
  textureOpacity?: number;
  svgProps?: SVGProps<SVGSVGElement>;
}

const TexturedSvg = ({
  SvgComponent,
  svgUrl,
  textureUrl,
  textureOpacity = 0.6,
  svgProps = {},
}: TexturedSvgProps) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Base SVG */}
      <SvgComponent
        {...svgProps}
        style={{
          width: '100%',
          height: '100%',
          ...svgProps.style,
        }}
        preserveAspectRatio="xMidYMid meet"
      />
      {/* Texture overlay clipped to SVG shape */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${textureUrl})`,
          backgroundRepeat: 'repeat',
          maskImage: `url(${svgUrl})`,
          WebkitMaskImage: `url(${svgUrl})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          opacity: textureOpacity,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default TexturedSvg;

