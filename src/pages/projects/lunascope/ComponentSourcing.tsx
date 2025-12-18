import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const ComponentSourcing = () => {
  return (
    <Article>
      <TitleBlock title="Component Sourcing Strategy" />
      <TextBlock 
        text="TL;DR: Hybrid sourcing: AliExpress for expensive long-lead items (£20-30 savings), Amazon Prime for testing components (immediate). Volume ordering provides spares and future project stock."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="Component sourcing for the Lunascope required balancing cost, quality, delivery time, and availability across multiple suppliers. The total project budget of $128 (approximately £100) left minimal room for expensive mistakes or premium pricing. AliExpress offered significant savings (30-50% lower than Amazon) but required 2-4 week shipping. Amazon provided next-day delivery at premium prices. DigiKey and Mouser offered excellent selection and reliability at higher cost. The solution: hybrid sourcing strategy that captured benefits from each platform while minimizing weaknesses. This approach saved £20-30 while maintaining quality and providing fast delivery for critical testing components." 
        sectionTitle="Multi-Platform Strategy" 
      />
      <TextBlock 
        text="The ordering timeline optimized for parallel work rather than sequential completion. AliExpress components (TEG modules £14.93, NEMA 8 motor £13.62, supercapacitors £5.60, crystal oscillators £3.59) represented expensive long-lead items ordered first. These ship over 2-4 weeks but represent the bulk of component cost. Amazon Prime items (voltage regulators £4.99, stepper drivers £7.99, heatsinks £11.98) ordered for next-day delivery provided immediate testing capability while waiting for AliExpress shipments. This parallel approach enabled breadboard testing of power regulation and motor control circuits using Amazon parts while cost-critical items slowly shipped from overseas." 
        sectionTitle="Parallel Ordering" 
      />
      <TextBlock 
        text="Volume purchasing decisions reflected thinking beyond immediate project needs. Crystal oscillators: 100 pieces for £3.59 (£0.036 each). Supercapacitors: 5 pieces each of 1.5F and 4.0F values. Voltage regulators: 10 pieces. TEG modules: 5 pieces. This volume approach provides spares for damage (inevitable during testing), enables trying different values (1.5F vs 4.0F supercapacitors), and builds component inventory for future projects. The per-unit cost at volume becomes trivial—10 voltage regulators for £4.99 costs only £0.50 each. Ordering single units would save £2-3 initially but cost significantly more in future shipping charges and missed experimental opportunities." 
        sectionTitle="Volume Thinking" 
      />
      <TextBlock 
        text="The gear system addition demonstrated adaptive sourcing when initial components proved insufficient. The NEMA 8 motor arrived larger than expected, requiring right-angle drive with precision reduction. Rather than abandoning the component or accepting poor mounting, I sourced a complete gear solution: 0.3 Modulus worm gear set with 1:100 reduction (£8.59), bearings for both gears (£3.56), and brass rod for clock hands (£1.84). Total cost £13.99 achieved requirements that commercial gearboxes would address for £20-50. This adaptive response—identifying the new requirement, finding cost-effective components, ordering immediately—prevented project delay while maintaining budget discipline." 
        sectionTitle="Adaptive Response" 
      />
      <TextBlock 
        text="Quality considerations separated critical components (where quality matters significantly) from standard components (where cheaper sources work fine). Critical components included TEG modules (core functionality), supercapacitors (safety and reliability), crystal oscillators (timing accuracy), and copper disc (thermal performance). These received careful sourcing with attention to specifications and supplier reputation. Standard components included voltage regulators, logic ICs, stepper drivers, mounting hardware—all common items with standardized specifications where quality variance is minimal. This separation enabled spending more on items that matter while accepting lowest-cost options for commodity parts." 
        sectionTitle="Quality Hierarchy" 
      />
      <TextBlock 
        text="Supplier selection considered factors beyond just price. AliExpress sellers with 95%+ ratings, thousands of orders, and detailed product photos provided confidence in receiving correct components despite long shipping times. Amazon sellers with Prime eligibility offered accountability and easy returns if components failed. DigiKey and Mouser provided guaranteed specifications and authentic parts for critical timing components. This risk assessment drove sourcing decisions: experimental components from AliExpress (can wait, cheaper), testing components from Amazon (need fast, return friendly), precision components from major distributors (need guaranteed specs). Each supplier served different risk profiles in the overall strategy." 
        sectionTitle="Risk Assessment" 
      />
      <TextBlock 
        text="The sourcing strategy revealed broader principles about hardware project planning. First, identify long-lead items and order early—these drive timeline regardless of other preparations. Second, separate critical-path from parallel-path items—what needs to arrive first versus what enables early testing. Third, consider total cost including shipping rather than per-item cost—volume ordering often costs less overall than multiple small orders. Fourth, maintain flexibility for adaptive response—problems will emerge, having budget and timeline slack enables solutions. Fifth, document everything—supplier names, order dates, costs, specifications enable tracking and future reference. These practices transform sourcing from transaction to strategy." 
        sectionTitle="Strategic Principles" 
      />
    </Article>
  );
};

export default ComponentSourcing;

