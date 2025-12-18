import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const EnterpriseConstraints = () => {
  return (
    <Article>
      <TitleBlock title="Enterprise Constraints" />
      <TextBlock 
        text="TL;DR: Existing MFE architecture, shared dependencies, authentication integration. Must fit patterns while innovating within boundaries."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="Enterprise software development means working within constraints that don't exist in personal projects. The Nexus Job Manager had to integrate with an existing microfrontend architecture, follow established patterns for authentication and API access, use specific technologies (MUI, Recharts), and be maintainable by a team with varying skill levels. These constraints aren't limitations—they're the reality of building software that needs to work reliably in production and be maintained by people other than yourself."
        sectionTitle="Enterprise Reality"
      />
      <TextBlock 
        text="The Module Federation integration pattern was non-negotiable. Nexus uses a specific architecture where MFEs expose App and navigation components, receive props from the portal (basename, proxy, standalone), and register menu items in a specific format. I couldn't redesign this pattern—I had to understand it deeply and work within it. This meant reading ADRs (Architecture Decision Records), analyzing existing MFEs, creating atomic notes about integration patterns, and building a comprehensive setup guide so other teams could follow the same process. The documentation I created became as important as the code—it enables team collaboration and knowledge transfer."
        sectionTitle="Non-Negotiable Patterns"
      />
      <TextBlock 
        text="The styling standard decision demonstrates pragmatic constraint management. When the Block component hit 150+ lines with inline sx props, I couldn't quickly scan it to understand the layout—the JSX was lost in styling. I standardized on MUI styled components project-wide, creating named components like BlockWrapper, ContentArea, LoadingSkeleton. This wasn't just a personal preference—it established a pattern other developers could follow when building on this foundation. I documented the decision in system_docs/Styling Standards.md with real examples from Badge and Block components, defining naming conventions and best practices. The constraint became: all styling uses styled components unless there's a specific reason for sx props (like the foundation Block's customization point)."
        sectionTitle="Styling Standards"
      />
      <TextBlock 
        text="The backend API constraint shaped the entire architecture. Craig was improving the Job Manager API in parallel with my frontend work, meaning the data structure would evolve. Rather than building tightly coupled components that assumed specific API shapes, I designed for adaptability. The foundation block system accepts any children, making it easy to swap data sources. The atomic architecture means I can replace a basic graph block with a more sophisticated assembled block as better data becomes available. The context-to-pages-to-blocks data flow keeps API integration isolated at the page level, so changes don't cascade through the component tree."
        sectionTitle="Adaptable Architecture"
      />
      <TextBlock 
        text="Team collaboration constraints influenced design decisions throughout. The ratio-specific wrappers (Block1x1, Block2x1, etc.) don't simplify the code—they simplify the metaphor the code follows and therefore the readability. The concept of 2x1 blocks and how they work in a grid is intuitive in a Lego kind of way. Creating standard shaped building blocks helps communicate what's going on in the code to the casual reader. I also find that when the code itself closely matches what the frontend shows, it creates far fewer problems. You're naturally steered towards working in a way that the structure works well with, rather than diverting more and more effort to maintaining an illusion that the code is one thing when it's actually another. These decisions prioritize long-term maintainability over short-term convenience, which is the essence of enterprise software engineering."
        sectionTitle="Team Collaboration"
      />
    </Article>
  );
};

export default EnterpriseConstraints;

