import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const IterativeProblemSolving = () => {
  return (
    <Article>
      <TitleBlock title="Iterative Problem Solving" />

      <TextBlock
        text="I learned that best solutions often start as complex ideas that simplify through iteration. Sections panel: opacity-based duplication → absolute positioning. Navigation: exact matches → prefix matches, static items → clickable active items. Hover effects: repeated refinement until visible. Knowing when to stop: I abandoned texture work after recognizing diminishing returns. The first clever idea is often wrong; the obvious simple solution emerges through iteration."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The sections panel story exemplifies how complex solutions can simplify through iteration. The requirement: display section titles in the left margin to help readers navigate articles. My first approach seemed logical—create a separate SectionsPanel component that renders duplicate article blocks with opacity: 0, extracts section titles, and synchronizes their vertical positions with the real content during scroll. This required tracking scroll positions, matching widths precisely between the panel and content area, handling overlapping section titles, and rendering duplicate invisible DOM elements solely for alignment.

After implementing this system with all its complexity—scroll listeners, intersection observers, width synchronization—a colleague question prompted reconsideration: 'Why duplicate the blocks at all?' The answer: there wasn't a good reason. The simple solution had been overlooked: use position: absolute with right: 100% to place section titles in the blank margin space to the left of article content. No duplication, no synchronization, no scroll tracking—just CSS. I deleted the complex system and replaced it with three lines of positioning code."
        sectionTitle="Sections Panel Evolution"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Before & After"
        caption="200+ lines → 3 lines"
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
  
  // Render duplicate blocks with opacity: 0
  return (
    <PanelContainer width={contentWidth}>
      {duplicateBlocks.map(block => (
        <OpacityBlock key={block.id}>{block.content}</OpacityBlock>
      ))}
    </PanelContainer>
  );
};

// AFTER: Simple absolute positioning
const SectionTitle = styled.div\`
  position: absolute;
  right: 100%;        // All we needed
  margin-right: 16px;
  width: 200px;
\`;`}
      />

      <TextBlock
        text="Navigation highlighting went through similar iterations. Initially, NavBar items only highlighted for exact path matches: visiting /projects highlighted Projects, but /projects/what-now left everything unhighlighted. This felt wrong—you're still in the Projects section. The fix checked if the pathname started with the item's path, with special handling for the home route.

Active items were initially disabled—clicking 'Projects' while on /projects/what-now did nothing. This seemed like the right pattern (don't navigate to where you already are), but users expected to click back to /projects. Making active items clickable improved navigation discoverability significantly. These weren't one-time decisions—each iteration revealed something I'd missed."
        sectionTitle="Navigation Refinement"
      />

      <TextBlock
        text="Hover effects on project cards went through multiple passes before feeling right. Initial implementation had subtle opacity changes (0.8 → 1.0), but they were barely noticeable. I increased the effect to include border color changes, which helped but wasn't quite there. Adding a slight scale transform (1.0 → 1.02) made the hover obvious without being jarring.

The refinement process: implement → test on real device → adjust → test again. Browser DevTools responsive mode doesn't capture how hover effects feel on actual hardware. Desktop users with mice have different expectations than laptop users with trackpads. Each iteration closed the gap between 'technically works' and 'feels right.'"
        sectionTitle="Hover Effect Iteration"
      />

      <TextBlock
        text="Some iterations lead to abandonment rather than refinement. I spent time adding texture patterns to diorama layers—noise filters, gradient overlays, subtle distortion effects. The goal was making the depth layers feel more organic and less flat. After implementing several variations, I realized the textures weren't adding value. They made the dioramas feel cluttered rather than atmospheric.

I removed all the texture work. The simple flat color layers with drop shadows created the depth effect I wanted. This was a valuable lesson: knowing when to stop iterating or abandon an approach matters as much as the iteration itself. Not every idea improves the result. Sometimes simpler is better, and recognizing that saves time and complexity."
        sectionTitle="Knowing When to Stop"
      />

      <TextBlock
        text="The pattern I've learned: start with the first 'obvious' solution, implement it, then question everything. The first clever idea is usually wrong—it solves the surface problem while missing simpler approaches. The opacity-based sections panel was clever but unnecessary. The disabled active nav items followed convention but hurt usability. The texture layers looked good in concept but cluttered in practice.

Iteration reveals these problems. You can't see the simpler solution until you've implemented the complex one and understood why it's too complicated. This process feels inefficient—why not think harder upfront?—but I've found thinking without implementing leads to different problems. You optimize for imagined constraints rather than real ones. Build it, use it, then simplify."
        sectionTitle="Iteration Philosophy"
      />
      
      <TextBlock
        text="This iterative approach demonstrates my problem-solving methodology: implement first, then simplify. The sections panel simplification (from complex opacity duplication to simple absolute positioning) reduced code by ~80% while working better. The navigation improvements (prefix matching, clickable active items) improved usability significantly. The ability to recognize when to abandon approaches (texture work) saves time and complexity. This shows I can iterate effectively, recognize overcomplicated solutions, and simplify without losing functionality. The skill of building first then simplifying is valuable in professional development where requirements evolve and initial solutions often need refinement."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default IterativeProblemSolving;
