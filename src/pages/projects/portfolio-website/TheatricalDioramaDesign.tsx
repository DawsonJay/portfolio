import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TheatricalDioramaDesign = () => {
  return (
    <Article>
      <TitleBlock title="Diorama Design System" />

      <TextBlock
        text="Shadow theatre aesthetic with 11-layer color spectrum transitioning from dark tech surface (#0F1218) to warm paper lantern colors. SVG viewBox optimization shrinks files 66% and eliminates whitespace. DioramaFrame uses SVG masks to clip outer shadows while preserving depth between layers."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The portfolio needed a visual identity that felt both professional and theatrical—a dark, sleek tech surface that, when 'cut open,' reveals warm organic colors underneath. The theatrical diorama system emerged from this concept: layered SVG elements with carefully chosen colors creating visual depth through a shadow theatre aesthetic. Each layer is colored from a spectrum that transitions from dark navy at the surface to warm cream tones at the deepest layer, like paper lanterns glowing behind cut paper silhouettes.

The color spectrum uses indices 0-10 (11 colors total) where darker colors represent surface layers closest to the viewer and lighter colors represent deeper layers furthest away. This creates the paper-cut diorama effect where the deepest layers appear almost white, as if lit from behind, while surface layers remain very dark. The metaphor is consistent: you're looking at a dark tech surface that's been cut to reveal the warm, theatrical world underneath."
        sectionTitle="Shadow Theatre Aesthetic"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Color Spectrum System"
        caption="11-color array ordered from dark to light for depth perception"
        code={`// Shadow theatre palette: dark surface transitioning to warm paper lantern colors
export const colorSpectrum = [
  '#0F1218', // Dark sleek tech surface (index 0 - surface layer 1)
  '#C85A3D', // Deep warm orange-red (paper lantern)
  '#D97A4F', // Rich warm orange
  '#E89A61', // Bright warm orange
  '#F0B073', // Warm orange-yellow
  '#F5C685', // Bright warm yellow-orange
  '#F9D897', // Warm yellow
  '#FBE5A9', // Pale warm yellow
  '#FDEFBB', // Light warm cream-yellow
  '#FEF7CD', // Very light warm cream
  '#FFF9DF', // Warm off-white cream (index 10 - deepest layer)
] as const;

// Usage in theme system
export const theme = {
  colors: {
    surface: colorSpectrum[0],
    accent: colorSpectrum[1],
    layers: {
      layer1: colorSpectrum[0],  // Surface (darkest)
      layer2: colorSpectrum[1],
      // ... through layer11
      layer11: colorSpectrum[10], // Deepest (lightest)
    },
  },
  // ... other theme properties
};`}
      />

      <TextBlock
        text="SVG assets needed significant optimization to work efficiently on the web. The initial exports from Krita were A4-sized (595.2 × 841.92) with actual content taking much less space, resulting in unnecessary whitespace and bloated file sizes. Three optimization steps transformed these files: SVGO reduced file sizes by 66% (1.1MB → 376KB), removing hardcoded stroke attributes and adding fill='currentColor' enabled CSS styling, and viewBox fitting eliminated whitespace by calculating actual bounding boxes.

The viewBox fitting process used the svg-path-bbox library to parse path data and calculate combined bounding boxes for all paths in each SVG file. For the ocean diorama, all six background layers had identical bounding boxes (520.44 × 520.44 starting at coordinates 37.38, 146.34), while whale entities had unique sizes based on their shapes. Adding 1% padding to the calculated bounds prevented edge clipping during rendering. This optimization dramatically improved the visual appearance by eliminating ghost whitespace around the SVG content."
        sectionTitle="SVG Optimization Strategy"
      />

      <CodeBlock
        language="javascript"
        sectionTitle="ViewBox Fitting Script"
        caption="Automated bounding box calculation to eliminate whitespace"
        code={`const fs = require('fs');
const path = require('path');
const { svgPathBbox } = require('svg-path-bbox');
const { JSDOM } = require('jsdom');

// Calculate bounding box for all paths in an SVG
function calculateBoundingBox(svgContent) {
  const dom = new JSDOM(svgContent);
  const document = dom.window.document;
  const paths = document.querySelectorAll('path');
  
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;
  
  paths.forEach(path => {
    const d = path.getAttribute('d');
    if (!d) return;
    
    try {
      // Returns [minX, minY, maxX, maxY]
      const [x1, y1, x2, y2] = svgPathBbox(d);
      minX = Math.min(minX, x1);
      minY = Math.min(minY, y1);
      maxX = Math.max(maxX, x2);
      maxY = Math.max(maxY, y2);
    } catch (e) {
      console.warn('Failed to parse path:', e);
    }
  });
  
  // Add 1% padding to prevent edge clipping
  const width = maxX - minX;
  const height = maxY - minY;
  const padding = Math.max(width, height) * 0.01;
  
  return {
    x: minX - padding,
    y: minY - padding,
    width: width + (padding * 2),
    height: height + (padding * 2)
  };
}

// Update viewBox attribute
function fitViewBox(svgPath) {
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  const bbox = calculateBoundingBox(svgContent);
  
  const newViewBox = \`\${bbox.x} \${bbox.y} \${bbox.width} \${bbox.height}\`;
  const updated = svgContent.replace(
    /viewBox="[^"]*"/,
    \`viewBox="\${newViewBox}"\`
  );
  
  fs.writeFileSync(svgPath, updated);
  console.log(\`Updated \${path.basename(svgPath)}: \${newViewBox}\`);
}

// Process all SVG files
const files = fs.readdirSync('./').filter(f => f.endsWith('.svg'));
files.forEach(fitViewBox);`}
      />

      <TextBlock
        text="The diorama layers needed drop-shadow filters to create depth between overlapping elements, but these shadows appeared around the outer circular edge as an unwanted halo effect. The goal was shadows only between layers—not around the outer perimeter. Multiple approaches failed: applying the filter to container divs created rectangular shadows, adjusting filter parameters couldn't prevent outer shadows, and CSS tricks like overflow:hidden clipped the content incorrectly.

The solution used visual masking rather than preventing shadow generation. A DioramaFrame component sits on top of all layers with a z-index higher than any layer, extending 10px beyond the diorama container to cover shadows that extend outside. The frame uses an SVG mask with a white square and a black circular cutout—the mask allows the frame color to show through except where the circle cuts out. The circular cutout is 5px smaller than the diorama radius (195px vs 200px), causing the frame to overlap the outermost layer slightly and clip its outer shadow while the interior shadows between layers remain visible."
        sectionTitle="Shadow Masking Problem"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="DioramaFrame SVG Mask"
        caption="Masks outer shadows while preserving depth between layers"
        code={`import { colorSpectrum } from '../../../theme';

const DioramaFrame = () => {
  const frameColor = colorSpectrum[0]; // Matches page background
  const frameZIndex = 20; // Higher than all layers (1-10)
  const frameSize = 420; // Extends 10px beyond 400px container
  const centerX = frameSize / 2;
  const centerY = frameSize / 2;
  const circleRadius = 195; // 5px smaller than 200px diorama radius
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        width: \`\${frameSize}px\`,
        height: \`\${frameSize}px\`,
        zIndex: frameZIndex,
        pointerEvents: 'none',
      }}
    >
      <svg
        width={frameSize}
        height={frameSize}
        viewBox={\`0 0 \${frameSize} \${frameSize}\`}
      >
        <defs>
          <mask id="frame-mask">
            {/* White rectangle = visible */}
            <rect 
              x="0" 
              y="0" 
              width={frameSize} 
              height={frameSize} 
              fill="white" 
            />
            {/* Black circle = transparent cutout */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={circleRadius} 
              fill="black" 
            />
          </mask>
        </defs>
        {/* Frame uses mask to show everywhere except circle */}
        <rect
          x="0"
          y="0"
          width={frameSize}
          height={frameSize}
          fill={frameColor}
          mask="url(#frame-mask)"
        />
      </svg>
    </div>
  );
};`}
      />

      <TextBlock
        text="The 5px overlap is critical—too small and the outer shadow shows through, too large and the frame becomes visually noticeable. The frame blends seamlessly because it uses the same color as the page background (colorSpectrum[0]), appearing invisible while still performing its masking function. This solution demonstrates a key problem-solving pattern: when you can't prevent an effect from rendering, mask it visually. The drop-shadow filter stays on the SVG elements where it belongs, and the frame simply obscures the parts we don't want to see.

The clockwork animation system uses predefined duration arrays to create synchronized, mechanical timing across all animated layers. Different dioramas can select different ranges from the array—the ocean diorama uses indices 4-8 (30s, 48s, 60s, 96s, 120s) for slow, ambient movement. This creates the feeling of a mechanical theatrical stage where everything moves at deliberately chosen speeds, reinforcing the shadow theatre aesthetic."
        sectionTitle="Visual Masking Pattern"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Clockwork Duration System"
        caption="Predefined timing for synchronized mechanical animations"
        code={`// Pattern: multiples for different diorama speeds
export const clockworkDurations = [
  3000,    // 3 seconds - fastest
  6000,    // 6 seconds
  12000,   // 12 seconds
  24000,   // 24 seconds
  30000,   // 30 seconds (ocean diorama uses 4-8)
  48000,   // 48 seconds
  60000,   // 60 seconds
  96000,   // 96 seconds
  120000,  // 120 seconds
  240000,  // 240 seconds
  480000,  // 480 seconds - slowest
  // ... continues for longer durations
] as const;

// Ocean whale animations use different speeds
const whale1Config = {
  animation: {
    type: 'scroll',
    duration: clockworkDurations[4], // 30 seconds - fastest whale
    direction: 'left',
    customKeyframe: 'scroll-whale-fast',
  },
};

const whale2Config = {
  animation: {
    type: 'scroll',
    duration: clockworkDurations[6], // 60 seconds - medium whale
    direction: 'left',
    customKeyframe: 'scroll-whale-medium',
  },
};

// Layers can rotate at different speeds
const layer3Config = {
  animation: {
    type: 'rotation',
    duration: clockworkDurations[8], // 120 seconds - slow rotation
    direction: 'clockwise',
  },
};`}
      />
    </Article>
  );
};

export default TheatricalDioramaDesign;

