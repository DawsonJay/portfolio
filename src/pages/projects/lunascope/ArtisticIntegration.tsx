import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const ArtisticIntegration = () => {
  return (
    <Article>
      <TitleBlock title="Artistic Integration" />
      <TextBlock 
        text="I use black copper patina that serves dual purpose: 90-95% heat absorption (power) + aesthetic beauty. I engraved moon phases to reveal bright copper through the black surface."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="The Lunascope clockface merges artistic expression with technical function through copper patina work. Copper develops rich colors when heat-treated with a torch—reds, oranges, purples, blues—creating natural patterns impossible to replicate mechanically. Applying liver of sulfur solution over these colors produces deep black patina that reveals the underlying heat treatment as subtle variations in the black surface. Engraving through this black layer exposes bright copper beneath, creating high-contrast moon phase indicators and motion markers. The patina isn't decoration added after technical design—it's integral to thermal performance, providing 90-95% heat absorption efficiency for TEG power generation while creating striking visual aesthetics." 
        sectionTitle="Copper Patina Process" 
      />
      <TextBlock 
        text="The dual-sided patina application demonstrates thinking beyond obvious requirements. Initially, only the front clockface needed black patina for aesthetics and heat absorption. Analysis revealed the back of the copper disc also faces room temperature variations and temperature gradients from the TEG system. Applying patina to both sides increases heat absorption across the entire surface, boosting power generation by 20-30% compared to single-sided treatment. This optimization came from questioning my initial assumption that only visible surfaces matter. The back side, though hidden, contributes meaningfully to thermal performance. The artistic choice (patinating both sides for visual completeness) enhances technical function (maximizing heat absorption), another instance of aesthetics and engineering reinforcing each other." 
        sectionTitle="Dual-Sided Treatment" 
      />
      <TextBlock 
        text="Moon phase engraving requires balancing information density with thermal efficiency. Dense engraving creates detailed imagery but removes black patina, reducing heat absorption. Minimal engraving maintains thermal performance but limits artistic expression and functional information. My solution: strategic engraving of essential elements only—outer ring of moon phase indicators, minimal motion markers, clean typography. This maintains 85-90% black surface area for heat absorption while providing clear, functional moon phase tracking. The constraint (thermal requirement) drives the aesthetic (minimalist engraving), producing visual simplicity that serves both artistic and technical purposes. Clean design emerges from requirement, not arbitrary style choice." 
        sectionTitle="Minimalist Engraving" 
      />
      <TextBlock 
        text="The 200mm clockface size came from thermal requirements rather than aesthetic preferences. Larger surface area provides more TEG contact area, generates more power, and creates more stable temperature gradients. The 2mm thickness provides structural rigidity and thermal mass that smooths temperature variations. These technical specifications drove the visual presence—a substantial copper disc dominating wall space. The size becomes a statement: this is a significant object, worthy of attention, celebrating lunar cycles through physical presence. Technical requirements created artistic opportunity rather than limiting it. The scale that thermal efficiency demands becomes the scale that artistic impact requires." 
        sectionTitle="Scale and Presence" 
      />
      <TextBlock 
        text="Material selection unified multiple concerns through copper's properties. Copper conducts heat excellently (critical for TEG efficiency), develops beautiful patinas through chemical reactions (artistic expression), machines and engraves easily (fabrication), and costs reasonably at the required dimensions (budget constraint). Alternative materials fail on multiple fronts: aluminum lacks patina character, steel corrodes differently, brass costs more, wood lacks thermal conductivity. Copper alone satisfies thermal, artistic, fabrication, and budget requirements simultaneously. This convergence emerged from analyzing constraints together rather than separately, revealing that the right material choice eliminates trade-offs rather than requiring them." 
        sectionTitle="Material Convergence" 
      />
      <TextBlock 
        text="The artistic integration demonstrates a broader principle I've learned about creative technical work: aesthetic choices are technical choices and vice versa. The dark patina generates power. The engraving pattern maintains thermal efficiency. The scale enables thermal mass. The material choice enables both fabrication and expression. These aren't aesthetic features added to technical work or technical features supporting aesthetic goals—they're integrated decisions where each choice serves multiple purposes. This integration only emerges from considering artistic and technical requirements together from project inception rather than treating them as separate phases: engineering first, aesthetics later. Separation creates compromise; integration creates synthesis." 
        sectionTitle="Creative Technical Work" 
      />
      <TextBlock 
        text="The metalworking skills required for proper patina development draw on silversmithing experience—torch work, chemical treatments, surface preparation, protective finishing. These craft techniques often seem separate from technical electronics work, creating perceived boundaries between artistic and engineering domains. The Lunascope bridges these domains deliberately: circuit design and chemical patina, frequency division and engraving technique, voltage regulation and heat treatment. The project demonstrates that technical capability and craft skill complement rather than compete. Embedded systems knowledge enables the control electronics. Metalworking knowledge enables the power generation. Both are required; neither is secondary. This synthesis shows value in diverse skill sets rather than narrow specialization." 
        sectionTitle="Craft and Engineering" 
      />
    </Article>
  );
};

export default ArtisticIntegration;
