import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const DesignEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Design Evolution" />
      <TextBlock 
        text="TL;DR: Pivoted from underwater drone to surface boat + towed probe. Eliminated waterproofing complexity while keeping lake bed mapping capability. Adapted to constraints rather than abandoning project."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Atlantis project underwent a major architectural shift from autonomous underwater drone to surface boat with towed probe. This wasn't failure—it was adapting to discovered constraints and clearer understanding of achievable scope. The underwater drone required waterproofing motors, building a complex hull, managing buoyancy control, and solving underwater navigation. The surface boat eliminated these challenges while preserving the core value: lake bed exploration and mapping. The towed probe could descend on a tether, eliminating autonomous navigation complexity while maintaining sensor capabilities." 
        sectionTitle="The Pivot" 
      />
      <TextBlock 
        text="The surface boat architecture simplified significantly while remaining technically interesting. A small boat hull (easier to waterproof than a submarine) would house the control system and power. A towed probe on a tether would contain sensors for depth, orientation, and eventually imaging. A LoRa radio system would provide long-range control from shore (up to several kilometers). The boat could map lake bed topology by recording probe depth while the boat traces patterns on the surface. This approach worked within budget constraints and timeline reality while demonstrating robotics, embedded systems, and data collection capabilities." 
        sectionTitle="Simplified Architecture" 
      />
      <TextBlock 
        text="Component selection shifted from underwater drone requirements to surface system needs. The expensive brushless motors and ESCs became unnecessary—simple DC motors could propel a surface boat. The complex hybrid Pi 4 + Pico processing system simplified to just Arduino Nano for control and LoRa communication. The emergency weight release and acoustic beacon became irrelevant for a surface vessel. Camera systems moved from underwater housing challenges to simpler above-water mounting. The budget dropped from $487 to under $200, with components focusing on control, communication, and mapping rather than underwater survival." 
        sectionTitle="Component Realignment" 
      />
      <TextBlock 
        text="The design pivot revealed important project management insights. The original staged development approach that seemed prudent actually enabled scope creep—buying components gradually meant the project vision could shift between stages without forcing hard decisions upfront. If all components had been purchased initially, the financial commitment would have locked the design. The staged approach provided flexibility but at the cost of architectural consistency. Future projects would need to balance staged risk management with design stability through clearer commitment milestones." 
        sectionTitle="Staged Development Impact" 
      />
      <TextBlock 
        text="Naming remained constant through the pivot, which provided interesting continuity. 'The Momo' originally referred to the underwater drone but transferred to the surface boat concept. This continuity helped maintain project identity despite significant technical changes. The name's philosophy—understated, building its own legend—became more appropriate as the project scope moderated from ambitious underwater autonomy to practical surface mapping. The name reminded me that project value comes from completion and real capability, not from chasing the most impressive vision." 
        sectionTitle="Identity Through Change" 
      />
      <TextBlock 
        text="The evolution from underwater drone to surface boat demonstrates a key project principle: adapt to constraints rather than abandoning projects when initial visions prove overscoped. The surface boat preserves core value (lake bed exploration) while eliminating unnecessary complexity (underwater navigation, motor waterproofing, buoyancy control). It maintains technical interest (LoRa communication, sensor systems, 3D printed enclosures) while becoming actually achievable within timeline and budget. Some might view this as scaling back ambition, but it's really about focusing on what matters: completing working systems that demonstrate real capabilities." 
        sectionTitle="Adaptive Engineering" 
      />
      <TextBlock 
        text="The design evolution also reflected learning about personal strengths and interests. The original underwater drone emphasized autonomous navigation and AI—capabilities I wanted to demonstrate. The surface boat emphasized hardware integration, 3D design, and embedded systems—areas I found more engaging during actual development. Projects reveal preferences through work itself, not just initial planning. The pivot allowed focusing on parts I enjoyed (designing enclosures, testing components, solving hardware problems) while maintaining portfolio value. Recognizing and adapting to these discoveries makes projects more sustainable and ultimately more successful." 
        sectionTitle="Discovering Focus" 
      />
    </Article>
  );
};

export default DesignEvolution;

