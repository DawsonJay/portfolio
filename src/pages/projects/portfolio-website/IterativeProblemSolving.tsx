import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const IterativeProblemSolving = () => {
  return (
    <Article>
      <TitleBlock title="Iterative Problem Solving" />

      <TextBlock
        text="Best solutions often start as complex ideas that simplify through iteration. Sections panel: opacity-based duplication → absolute positioning. Navigation: exact matches → prefix matches, static items → clickable active items. Hover effects: repeated refinement until visible. Knowing when to stop: texture work abandoned after recognizing diminishing returns. First clever idea is often wrong; obvious simple solution emerges through iteration."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The sections panel story exemplifies how complex solutions can simplify through iteration. The requirement: display section titles in the left margin to help readers navigate articles. The first approach seemed logical—create a separate SectionsPanel component that renders duplicate article blocks with opacity: 0, extracts section titles, and synchronizes their vertical positions with the real content during scroll. This required tracking scroll positions, matching widths precisely between the panel and content area, handling overlapping section titles, and rendering duplicate invisible DOM elements solely for alignment.

After implementing this system with all its complexity—scroll listeners, intersection observers, width synchronization—a colleague question prompted reconsideration: 'Why duplicate the blocks at all?' The answer: there wasn't a good reason. The simple solution had been overlooked: use position: absolute with right: 100% to place section titles in the blank margin space to the left of article content. No duplication, no synchronization, no scroll tracking—just CSS. The complex system was deleted and replaced with three lines of positioning code."
        sectionTitle="Sections Panel Evolution"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Complex vs Simple Solution"
        caption="Before and after: 200+ lines → 3 lines"
        code={`// BEFORE: Complex approach with duplication and synchronization
const SectionsPanel = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Measure content width for matching
  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Track scroll to determine visible sections
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Complex intersection logic...
    });
    // Observe all sections...
  }, []);
  
  return (
    <PanelContainer style={{ width: contentWidth }}>
      {/* Render duplicate blocks with opacity: 0 */}
      <OpacityContainer style={{ opacity: 0 }}>
        {articles.map(article => renderDuplicateForAlignment(article))}
      </OpacityContainer>
      {/* Extract and display section titles */}
      {visibleSections.map(section => (
        <SectionTitle>{section}</SectionTitle>
      ))}
    </PanelContainer>
  );
};

// AFTER: Simple approach with absolute positioning
const SectionTitle = styled.div\`
  position: absolute;
  top: 2px;
  right: 100%;        // Position to left of content
  margin-right: 16px;
  width: 200px;
  text-align: right;
\`;

// Section titles render directly in ArticleBlock
// No duplication, no synchronization, no scroll tracking`}
      />

      <TextBlock
        text="This pattern repeats throughout the project: the first solution that seems clever often proves overcomplicated, and the simple obvious solution emerges only after experiencing the complex version. The key is recognizing when complexity signals misalignment between problem and approach, being willing to delete working code when a better solution appears, and understanding that iteration toward simplicity is how you find the right answer.

Navigation highlighting started with exact route matching—visiting /projects highlighted the Projects nav item, but visiting /projects/preview/what-now left it unhighlighted even though you're conceptually still in the projects section. The solution checked if location.pathname starts with the route path (plus trailing slash), with special handling for home route that only highlights on exact match. This required multiple iterations to get edge cases correct: paths without trailing slashes, nested routes at different depths, avoiding false matches like /projects matching /projects-archive."
        sectionTitle="When Complexity Signals Wrong Approach"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Navigation Refinements"
        caption="Multiple iterations to handle edge cases"
        code={`// Iteration 1: Exact matching only
const isActive = (path: string) => {
  return location.pathname === path;
};
// Problem: /projects/preview/what-now doesn't highlight Projects

// Iteration 2: Starts with path
const isActive = (path: string) => {
  return location.pathname.startsWith(path);
};
// Problem: Home (/) matches everything

// Iteration 3: Special case for home
const isActive = (path: string) => {
  if (path === '/') {
    return location.pathname === '/';
  }
  return location.pathname.startsWith(path);
};
// Problem: /projects might match /projects-archive

// Iteration 4: Require trailing slash or exact match
const isActive = (path: string) => {
  if (path === '/') {
    return location.pathname === '/';
  }
  return location.pathname === path || 
         location.pathname.startsWith(path + '/');
};
// Solution: Handles all edge cases correctly

// Additional refinement: Active items should remain clickable
// Users can click 'Projects' from /projects/preview/what-now to return
// Changed from <span> to <Link> component for active state`}
      />

      <TextBlock
        text="Hover effects underwent similar refinement. Progress bars on project menu items needed visual feedback, but the initial implementation showed no visible effect. Multiple debugging iterations revealed the issue: insufficient color contrast between default and hover states, pointer events being blocked by child elements, and CSS specificity conflicts with parent styles. The solution increased contrast between layer2 and layer3 colors in hover state, added explicit pointer-events management, and increased selector specificity.

Even after fixing these issues, the hover effect remained subtle due to theme color choices. Rather than continuing to adjust colors (risking visual inconsistency), the decision was to accept the subtle effect as 'good enough.' This demonstrates knowing when to stop—when further iteration provides diminishing returns or risks introducing new problems. Perfect is the enemy of good, especially when 'good enough' doesn't impact usability."
        sectionTitle="Hover Effect Refinement"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Progress Bar Hover Debugging"
        caption="Multiple iterations to achieve visible hover effect"
        code={`// Iteration 1: Basic hover on container
const MenuItem = styled.div\`
  &:hover {
    background-color: \${(props) => props.theme.colors.layers.layer3};
  }
\`;
// Problem: No visible effect (insufficient contrast)

// Iteration 2: Increase contrast
const MenuItem = styled.div\`
  background-color: \${(props) => props.theme.colors.layers.layer2};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: \${(props) => props.theme.colors.layers.layer4}; // More contrast
  }
\`;
// Problem: Child elements blocking hover

// Iteration 3: Pointer events management
const ProgressFill = styled.div\`
  pointer-events: none; // Don't block hover on parent
\`;
// Problem: Still subtle due to theme colors

// Iteration 4: Accept 'good enough'
// Further contrast increases would break visual consistency
// Current effect is functional even if subtle
// Time to stop iterating and move to next feature`}
      />

      <TextBlock
        text="Texture work represents a documented failure that provides valuable learning. The goal was adding paper texture to diorama layers for enhanced theatrical feel, matching the shadow theatre aesthetic. The first approach used SVG pattern fills with texture images, but resulted in tiled repetition that looked obviously artificial. The second approach tried CSS mask-image with texture overlays, but created aliasing artifacts and performance issues with multiple layers.

After two full days of experimentation with various texture techniques—Canvas API for dynamic generation, blend modes for compositing, filter effects for grain—the honest assessment was: none of these solutions looked good enough to justify the complexity they added. The dioramas already worked well with flat colors. Adding texture would require ongoing maintenance as new dioramas were built, increase file sizes with texture assets, and introduce rendering performance concerns on lower-end devices."
        sectionTitle="Documented Failures"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Texture Attempts"
        caption="Documenting what didn't work and why"
        code={`// Attempt 1: SVG pattern fills
const TexturedLayer = () => (
  <svg>
    <defs>
      <pattern id="paper-texture" patternUnits="userSpaceOnUse" width="200" height="200">
        <image href="/textures/paper.png" width="200" height="200" />
      </pattern>
    </defs>
    <path d="..." fill="url(#paper-texture)" />
  </svg>
);
// Result: Visible tiling, artificial appearance, poor scaling

// Attempt 2: CSS mask-image
const TexturedDiv = styled.div\`
  background-color: \${(props) => props.color};
  mask-image: url('/textures/paper.png');
  mask-size: cover;
\`;
// Result: Aliasing artifacts, performance issues, lost color fidelity

// Attempt 3: Blend modes
const TextureOverlay = styled.div\`
  background-image: url('/textures/paper.png');
  mix-blend-mode: multiply;
  opacity: 0.3;
\`;
// Result: Muddy colors, inconsistent across dioramas, high complexity

// Decision: Stop texture work
// - Flat colors already look good and match theme
// - Texture adds complexity without proportional value
// - Development time better spent on content and functionality
// - Document the attempts to avoid repeating this investigation`}
      />

      <TextBlock
        text="The texture work failure illustrates an important principle: knowing when to stop. The sunk cost fallacy suggests continuing investment because you've already spent time on something, but good engineering means recognizing when an approach isn't working and cutting losses. Documenting the failed attempts prevents future revisiting of the same dead ends and provides learning for similar future challenges.

Iterative problem solving means starting with solutions that seem clever, discovering their flaws through implementation, simplifying toward obvious approaches, recognizing when complexity signals wrong direction, accepting 'good enough' when perfection is costly, and documenting failures to prevent repetition. The best solutions often feel obvious in hindsight, but reaching that obviousness requires working through the complex versions first."
        sectionTitle="Knowing When to Stop"
      />
    </Article>
  );
};

export default IterativeProblemSolving;

