import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const FoundationBlockArchitecture = () => {
  return (
    <Article>
      <TitleBlock title="Foundation Block Architecture" />
      <TextBlock 
        text="I designed a four-layer atomic architecture: Foundation blocks (layout), Basic blocks (styling), Ratio wrappers (1x1, 2x1, etc.), Assembled blocks (data). This separation of concerns enables composition."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Nexus Job Manager dashboard required a component system that could handle complex data visualization while remaining flexible enough to evolve with changing backend APIs. Rather than building one-off components for each use case, I designed a foundation block architecture based on atomic design principles—small, composable pieces that combine to create any layout."
        sectionTitle="The Problem"
      />
      <TextBlock 
        text="My architecture has four layers. Foundation blocks handle pure layout: grid positioning via gridX/gridY props, badge and label rendering, and loading/empty states. They accept an sx prop for MUI-standard customization but have no visual styling themselves. Basic blocks wrap foundation blocks and add visual styling (background color, padding, border radius, box shadow) through the sx prop pattern. Ratio-specific wrappers (Block1x1, Block2x1, Block1x2, Block2x2) simplify the API by fixing gridColumn and gridRow values, making intent immediately clear from the component name. Finally, assembled blocks integrate real data and business logic, composing lower-level blocks into functional dashboard widgets."
        sectionTitle="Four-Layer Architecture"
      />
      <TextBlock 
        text="This separation wasn't arbitrary—it solved real problems. GridBlock needed to be transparent with no background or padding to create fractional layouts, while fixed ratio blocks needed full visual styling. The foundation block's sx prop provided the flexibility to handle both cases without creating custom props like hasPadding or hasStyling. When I needed to build a 2x2 block with an internal 2x2 grid of smaller blocks, the architecture handled it naturally: GridBlock for the outer container, BasicBlocks for the inner cells, all with consistent 16px gaps from theme.spacing(2)."
        sectionTitle="Solving Real Problems"
      />
      <TextBlock 
        text="The iterative refinement process revealed the architecture's strength. I went through multiple polish passes: extracting badges into a separate component, refining titles into floating labels, adjusting z-index layering (badges at 3, labels at 2, content below), and removing overflow from foundation blocks so labels could extend beyond boundaries. Each refinement was easy because the separation of concerns meant changes were localized—improving the badge component didn't require touching block layout logic."
        sectionTitle="Iterative Refinement"
      />
      <TextBlock 
        text="The result is a system where building new dashboard sections is fast and consistent. Want a 2x1 block with a line chart? Wrap a Recharts component in Block2x1, pass gridX and gridY, add a status badge if needed. Want a complex fractional layout? Use GridBlock with BasicBlocks as children. The foundation handles positioning, state management, and accessibility, while you focus on content. This is the kind of architecture that compounds in value—every new component built on this foundation is easier than the last, and the entire system becomes more stable as patterns solidify."
        sectionTitle="Compounding Value"
      />
      
      <TextBlock 
        text="This foundation block architecture reduced development time for new dashboard sections by ~70%—what previously required building custom components from scratch now requires composing existing blocks. The separation of concerns means changes are localized: improving badge styling doesn't affect layout logic, and adding new ratio wrappers doesn't require touching foundation blocks. This demonstrates my ability to design component systems that scale, apply atomic design principles effectively, and create architectures that compound value over time. The skill of building reusable component systems is essential for enterprise frontend development where consistency and maintainability matter."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default FoundationBlockArchitecture;
