import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ComponentArchitectureEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Component Architecture" />

      <TextBlock
        text="I created generic DioramaLayer and DioramaEntity components to replace tightly-coupled implementations. Configuration-driven design in config.ts files enables new dioramas without writing new components. The ArticleBlock base component provides consistent section titles and TOC registration. Simplicity wins: the sections panel evolved from complex opacity-block duplication to simple absolute positioning with right: 100%."
        sectionTitle="Overview"
      />

      <TextBlock
        text="My initial ocean diorama implementation used tightly-coupled components specific to ocean layers and whales—OceanLayer1 through OceanLayer6, OceanWhale1 through OceanWhale3. This worked for one diorama but created duplication and made it difficult to create new dioramas. I extracted the common patterns into generic DioramaLayer and DioramaEntity components that work for any diorama type.

DioramaLayer handles all layer rendering: theme layer mapping via useThemeLayer hook, animation configuration via useDioramaAnimation hook, and CSS filter application for drop shadows. Layers are always 100% size and positioned absolutely in the diorama container. DioramaEntity handles entities like whales, characters, or objects with variable size (percentage-based), positionable offsets (vertical/horizontal), and the same animation/theming capabilities as layers. The ocean-specific components became thin wrappers that import SVGs and pass configuration to the generic components."
        sectionTitle="Generic Components"
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

This provides consistency across dioramas (all use the same color palette), flexibility (each diorama can map its layers differently), and z-index management (deeper layers get higher z-index values automatically). For example, ocean diorama layer 2 maps to theme layer 3, which uses colorSpectrum[2] and gets z-index 9 (calculated as 11 - 3 + 1). The z-index inversion ensures deeper layers (lighter colors) render behind surface layers (darker colors)."
        sectionTitle="Theme Layer Mapping"
      />

      <TextBlock
        text="The article system needed consistency across all article components. Every article has a title, sections with headings, and text blocks. I created an ArticleBlock base component that all article blocks extend: TextBlock, CodeBlock, DemoBlock. ArticleBlock handles section title rendering, table of contents registration, and consistent spacing. Child components just provide the content-specific rendering."
        sectionTitle="Article System Architecture"
      />

      <TextBlock
        text="The sections panel (table of contents) went through multiple iterations. Initially, I tried using opacity blocks to create spacing between the panel and the article content—a pattern I'd seen in other codebases. This required duplicating content structure, managing synchronization between the real content and the opacity blocks, and resulted in brittle positioning that broke when content changed.

I replaced this with simple absolute positioning: position the sections panel absolutely, set right: 100% to place it left of the container, and add margin-right for spacing. This works because the article container has position: relative, creating a positioning context. The sections panel is removed from normal document flow, doesn't affect layout of other elements, and requires no duplication or synchronization. Two lines of CSS replaced a complex duplication system."
        sectionTitle="Sections Panel Simplification"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Sections Panel Positioning"
        caption="Absolute positioning eliminates duplication"
        code={`const SectionsPanel = styled.div\`
  position: absolute;
  right: 100%; // Position left of container
  margin-right: 32px; // Spacing from content
  width: 200px;
  top: 0;
  
  @media (max-width: 1400px) {
    display: none; // Hide on smaller screens
  }
\`;

const ArticleContainer = styled.div\`
  position: relative; // Create positioning context
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
\`;

// Usage - sections panel exists outside normal flow
<ArticleContainer>
  <SectionsPanel>
    {sections.map(section => <SectionLink {...section} />)}
  </SectionsPanel>
  <ArticleContent>
    {/* Article content */}
  </ArticleContent>
</ArticleContainer>`}
      />

      <TextBlock
        text="The evolution from ocean-specific components to generic, configuration-driven architecture demonstrates something I've learned: start specific, then generalize. I built the ocean diorama first without worrying about reusability. Only after completing it could I see the actual patterns worth extracting. Trying to build the generic system first would've meant guessing at requirements I didn't understand yet. The specific implementation taught me what the generic system needed to support."
        sectionTitle="Specific to Generic Evolution"
      />
    </Article>
  );
};

export default ComponentArchitectureEvolution;
