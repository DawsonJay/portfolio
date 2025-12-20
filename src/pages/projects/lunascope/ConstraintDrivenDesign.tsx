import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const ConstraintDrivenDesign = () => {
  return (
    <Article>
      <TitleBlock title="Constraint-Driven Design" />
      <TextBlock 
        text="$128 budget and 27.5mW power constraint forced creative solutions. NEMA 8 motor instead of unavailable PTX05. Worm gear £14 vs commercial gearbox £50. Constraints shaped better design."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="The Lunascope operates under severe constraints: $128 budget, 27.5mW average power, 20-30 year reliability requirement, and self-powered operation. These limitations could cripple the design, forcing compromises that reduce functionality or aesthetics."
        sectionTitle="Constraints as Advantages" 
      />
      <TextBlock 
        text="Instead, constraints became design drivers, forcing creative solutions that improved the final system. The $128 budget eliminated expensive commercial solutions, leading to simpler designs with fewer failure points. The power constraint drove environmental solutions that work better than adding more power generation. The longevity requirement forced component selection favoring reliability over performance. Constraints didn't limit the project—they shaped it into something more elegant than unlimited resources would have produced." 
        sectionTitle="Design Drivers" 
      />
      <TextBlock 
        text="The motor selection demonstrates this principle clearly. Initial specifications called for a PTX05 HPM Nano Step motor (13mm diameter, 0.5W, ~£20). During sourcing, PTX05 proved difficult to find with limited availability. The obvious alternative was NEMA 11 stepper motors (28mm diameter, widely available). But NEMA 11 draws 0.8A—four times the power budget and completely unsuitable for TEG power. The constraint forced finding a different solution: NEMA 8 motors with 0.2A single-shaft variants. These work perfectly—0.2A stays within power budget, 28mm diameter allows standard mounting, and they're readily available. The power constraint that seemed to eliminate NEMA alternatives actually led to discovering the ideal component." 
        sectionTitle="Motor Selection" 
      />
      <TextBlock 
        text="The NEMA 8 created a new problem: the motor was larger than expected and would protrude from a wall-mounted clock. This required right-angle drive with gear reduction to meet precision requirements (0.001125° per step for lunar tracking). Commercial gearboxes cost £20-50 and add bulk. The solution: a 0.3 Modulus worm gear set with 1:100 reduction ratio for £8.59, plus bearings and brass rod for £5.40. Total gear system: £13.99 versus £20-50 commercial alternatives. The mounting challenge that emerged from component size actually led to better mechanical design—compact right-angle drive with perfect precision. Problems from constraints revealed better solutions than the original plan." 
        sectionTitle="Gear System Solution" 
      />
      <TextBlock 
        text="The clockface design shows constraint-driven aesthetic integration. A black surface absorbs heat efficiently for TEG power generation—this is a thermal requirement. Copper develops beautiful patinas when heat-treated and exposed to liver of sulfur—this is an artistic technique. These aren't separate concerns requiring compromise. The black copper patina serves both purposes simultaneously: 90-95% heat absorption for maximum power generation, and striking aesthetic that reveals bright copper through engraved moon phases. The thermal requirement drives the artistic choice, and the artistic result enhances thermal performance. This integration only emerged from analyzing both constraints together rather than treating aesthetics and engineering as separate problems." 
        sectionTitle="Aesthetic Integration" 
      />
      <TextBlock 
        text="Budget constraints forced sourcing strategy that became a strength. AliExpress offers significantly lower prices but requires 2-4 week shipping. Amazon provides next-day delivery at premium prices. The solution: hybrid sourcing that optimizes both. Expensive long-lead components (TEG modules £14.93, NEMA 8 motor £13.62, supercapacitors £5.60) ordered from AliExpress saved £20-30 versus Amazon equivalents. Fast-delivery items (voltage regulators £4.99, stepper drivers £7.99) ordered from Amazon Prime arrived while waiting for AliExpress shipments. This approach provided Amazon convenience for testing components immediately while capturing AliExpress savings on expensive parts. The budget constraint forced strategic thinking about component timing and sourcing rather than just buying everything from convenient but expensive sources." 
        sectionTitle="Strategic Sourcing" 
      />
      <TextBlock 
        text="Component quantities demonstrate thinking beyond immediate needs. Ordered 100 crystal oscillators for £3.59 (£0.036 each), 5 supercapacitors of each value, 10 voltage regulators, and multiple TEG modules. This provides spares for damage, extras for testing different configurations, and components for future projects. The per-unit cost becomes trivial at volume, and having components available enables experimentation. Ordering exactly what's needed saves money initially but costs more long-term through shipping charges for replacement parts and missed opportunities to test alternatives. The volume approach emerged from recognizing that component cost is often secondary to shipping cost and opportunity cost of not having parts available." 
        sectionTitle="Volume Thinking" 
      />
      <TextBlock 
        text="The constraint-driven approach reveals a broader principle about resource-limited engineering: limitations force examining the entire problem space rather than applying standard solutions. Unlimited budget enables buying the obvious answer—commercial gearbox, high-power motor, oversized TEG module. Limited budget requires asking whether those solutions are actually necessary. Does the project need that much power, or can consumption be reduced? Does the motor need that much torque, or can microstepping compensate? Can gear reduction be achieved with simple components instead of complete assemblies? Constraints force these questions, and the answers often reveal simpler, more reliable, more elegant solutions than the standard approach would provide." 
        sectionTitle="Resource-Limited Engineering" 
      />
    </Article>
  );
};

export default ConstraintDrivenDesign;

