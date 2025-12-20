import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ComponentArchitectureEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Component Architecture" />

      <TextBlock
        text="Generic DioramaLayer and DioramaEntity components replace tightly-coupled implementations. Configuration-driven design in config.ts files enables new dioramas without writing new components. ArticleBlock base component provides consistent section titles and TOC registration. Simplicity wins: sections panel evolved from complex opacity-block duplication to simple absolute positioning with right: 100%."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The initial ocean diorama implementation used tightly-coupled components specific to ocean layers and whales—OceanLayer1 through OceanLayer6, OceanWhale1 through OceanWhale3. This worked for one diorama but created duplication and made it difficult to create new dioramas. The solution extracted the common patterns into generic DioramaLayer and DioramaEntity components that work for any diorama type.

DioramaLayer handles all layer rendering: theme layer mapping via useThemeLayer hook, animation configuration via useDioramaAnimation hook, and CSS filter application for drop shadows. Layers are always 100% size and positioned absolutely in the diorama container. DioramaEntity handles entities like whales, characters, or objects with variable size (percentage-based), positionable offsets (vertical/horizontal), and the same animation/theming capabilities as layers. The ocean-specific components became thin wrappers that import SVGs and pass configuration to the generic components."
        sectionTitle="Generic Component Extraction"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Configuration-Driven Pattern"
        caption="Ocean diorama configuration in config.ts"
        code={`// src/components/dioramas/ocean-diorama/config.ts

// Layer theme mapping: diorama layers 1-6 map to theme layers 1-6
const layerThemeMapping = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

// Layer configurations
export const layerConfigs = [
  {
    dioramaLayerNumber: 1,
    themeLayerMapping: layerThemeMapping,
    animation: null, // No animation for this layer
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
  },
  {
    dioramaLayerNumber: 2,
    themeLayerMapping: layerThemeMapping,
    animation: {
      type: 'rotation' as const,
      duration: 120000, // 120 seconds
      direction: 'clockwise' as const,
    },
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
  },
  // ... configs for layers 3-6
];

// Entity configurations (whales)
export const entityConfigs = [
  {
    dioramaLayerNumber: 2,
    size: { 2: 50 }, // 50% of container size
    position: { 
      vertical: { 2: '-15%' },   // 15% above center
      horizontal: { 2: 'start' }  // Starts at left edge
    },
    animation: {
      type: 'scroll' as const,
      duration: 30000, // 30 seconds
      direction: 'left' as const,
      customKeyframe: 'scroll-whale-fast',
    },
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
  },
  // ... configs for other whales
];`}
      />

      <TextBlock
        text="Theme layer mapping solves the problem of multiple dioramas sharing a global color system. Each diorama has its own layer numbers (1-6 for ocean, potentially 1-4 for another diorama), but all dioramas share a global theme with 11 color layers. The mapping object connects diorama-specific layer numbers to theme layer numbers, and a utility function looks up the color from the colorSpectrum array.

This system provides consistency across dioramas (all use the same color palette), flexibility (each diorama can map its layers differently), and z-index management (deeper layers get higher z-index values automatically). For example, ocean diorama layer 2 maps to theme layer 3, which uses colorSpectrum[2] and gets z-index 9 (calculated as 11 - 3 + 1). The z-index inversion ensures deeper layers (lighter colors) render behind surface layers (darker colors)."
        sectionTitle="Theme Layer Mapping System"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Theme Layer Utilities"
        caption="Pure functions for theme mapping and z-index calculation"
        code={`// src/utils/diorama/themeLayer.ts

// Map diorama layer to theme layer number
export function mapDioramaLayerToThemeLayer(
  dioramaLayerNumber: number,
  mapping: Record<number, number>
): number {
  const themeLayer = mapping[dioramaLayerNumber];
  if (themeLayer === undefined) {
    throw new Error(\`No mapping for layer \${dioramaLayerNumber}\`);
  }
  return themeLayer;
}

// Get color from theme for a theme layer number
export function getColorForThemeLayer(
  themeLayerNumber: number,
  colorSpectrum: readonly string[]
): string {
  const index = themeLayerNumber - 1; // Theme layers 1-11, array indices 0-10
  if (index < 0 || index >= colorSpectrum.length) {
    throw new Error(\`Theme layer \${themeLayerNumber} out of bounds\`);
  }
  return colorSpectrum[index];
}

// Calculate z-index based on depth (inverse relationship)
export function calculateZIndex(themeLayerNumber: number): number {
  // Deeper layers (higher numbers, lighter colors) = lower z-index
  // Surface layers (lower numbers, darker colors) = higher z-index
  return 11 - themeLayerNumber + 1;
}

// Example usage:
// Ocean layer 2 -> theme layer 3
// -> color: colorSpectrum[2] (dark orange)
// -> z-index: 11 - 3 + 1 = 9`}
      />

      <TextBlock
        text="The article system needed section titles displayed in the left margin to help readers navigate content. The first approach seemed logical: create a SectionsPanel component that rendered duplicate article blocks with opacity:0 to maintain alignment, extract the section titles, and display them synchronized with scroll position. This design had several fatal flaws: width matching complexity (left panel needed identical width as article content), potential overlapping issues (what if titles are at similar scroll positions?), and unnecessary DOM duplication (rendering invisible content just for alignment).

After implementing this complex system, a simpler solution became obvious: use absolutely positioned section titles that extend into the blank spacer area to the left of article content. No duplicate blocks, no width synchronization, no complex scroll tracking—just CSS. Sometimes the first idea that seems clever is actually the wrong approach, and the obvious solution you overlooked is the right one."
        sectionTitle="Sections Panel Simplification"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="ArticleBlock Base Component"
        caption="Simple absolute positioning replaces complex synchronization"
        code={`// src/components/article/ArticleBlock.tsx
import styled from 'styled-components';
import { type ReactNode } from 'react';

const BlockContainer = styled.div\`
  position: relative; // Positioning context for section title
  margin-bottom: \${(props) => props.theme.spacing['2xl']};
\`;

const SectionTitle = styled.div\`
  position: absolute;
  top: 2px;             // Slight offset from block edge
  right: 100%;          // Position to left of block
  margin-right: 16px;   // Spacing from article edge
  width: 200px;         // Fixed width for section titles
  text-align: right;    // Right-align within the 200px
  white-space: nowrap;  // Prevent wrapping
  font-family: \${(props) => props.theme.fonts.body};
  color: \${(props) => props.theme.colors.layers.layer11};
  font-size: \${(props) => props.theme.fontSizes.base};
\`;

interface ArticleBlockProps {
  children: ReactNode;
  sectionTitle?: string;
}

const ArticleBlock = ({ children, sectionTitle }: ArticleBlockProps) => {
  return (
    <BlockContainer>
      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
      {children}
    </BlockContainer>
  );
};

export default ArticleBlock;

// Usage in TextBlock:
// <ArticleBlock sectionTitle={sectionTitle}>
//   <StyledText>{text}</StyledText>
// </ArticleBlock>`}
      />

      <TextBlock
        text="The ArticleBlock pattern provides additional benefits beyond section titles. It creates a consistent interface for all article content blocks (TextBlock, TitleBlock, CodeBlock, DemoBlock), enables table of contents registration through ArticleNavigationContext, and allows future enhancements (like anchor links or expand/collapse) without modifying individual block components.

This evolution from complex to simple mirrors the broader architectural journey: start with specific implementations to understand the problem, extract generic patterns when duplication emerges, then simplify when complexity becomes a burden. The best architectures often feel obvious in hindsight, but reaching that simplicity requires working through the complex versions first."
        sectionTitle="Base Component Pattern"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Hook-Based Architecture"
        caption="Hooks separate concerns and enable reusability"
        code={`// src/hooks/useThemeLayer.ts
import { useTheme } from './useTheme';
import { 
  mapDioramaLayerToThemeLayer, 
  getColorForThemeLayer, 
  calculateZIndex 
} from '../utils/diorama/themeLayer';

export function useThemeLayer(
  dioramaLayerNumber: number,
  mapping: Record<number, number>
) {
  const theme = useTheme();
  
  const themeLayerNumber = mapDioramaLayerToThemeLayer(
    dioramaLayerNumber, 
    mapping
  );
  
  const color = getColorForThemeLayer(
    themeLayerNumber, 
    theme.colors.colorSpectrum
  );
  
  const zIndex = calculateZIndex(themeLayerNumber);
  
  return { themeLayerNumber, color, zIndex };
}

// src/hooks/useDioramaAnimation.ts
import { getAnimationStyle } from '../utils/diorama/animations';

export function useDioramaAnimation(
  animationConfig: AnimationConfig | null
) {
  if (!animationConfig) {
    return { animationStyle: {} };
  }
  
  const animationStyle = getAnimationStyle(animationConfig);
  return { animationStyle };
}

// Clean separation: hooks handle React integration,
// utilities provide pure functions for calculations`}
      />
    </Article>
  );
};

export default ComponentArchitectureEvolution;

