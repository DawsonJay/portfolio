import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TheOriginalVision = () => {
  return (
    <Article>
      <TitleBlock title="The Original Vision" />
      <TextBlock 
        text="TL;DR: $500 underwater drone with Raspberry Pi 4, Pi Pico dual processing, four brushless motors, emergency systems. Philosophy: Survivability Over Perfection."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="Atlantis began as an autonomous underwater exploration drone project with a clear mission: build a vehicle that could sink to lake beds, wander filming footage, collect sensor data, and return to the surface safely—all within a $500 CAD budget constraint. The project embodied a philosophy I called 'Survivability Over Perfection': prioritize systems that ensure the drone returns safely over technical sophistication. This wasn't about building the most advanced underwater vehicle, but rather building one that actually works under severe budget constraints." 
        sectionTitle="The $500 Challenge" 
      />
      <TextBlock 
        text="The technical architecture reflected ambitious goals: a hybrid processing system with Raspberry Pi 4 handling AI/ML and high-level control, while Raspberry Pi Pico managed real-time motor control and sensor reading. Four brushless motors would provide omnidirectional movement. A Pi Camera Module would capture footage with LED lighting. Pressure sensors would enable depth control. The IMU, compass, and ultrasonic sensors would provide navigation data. This was a complete robotics system, not a simple remote-controlled toy." 
        sectionTitle="Hybrid Processing Architecture" 
      />
      <TextBlock 
        text="Safety systems dominated the design, reflecting lessons from failed projects and realistic risk assessment. An emergency weight release mechanism using servo-actuated drops would ensure the drone could surface if anything went wrong. An acoustic beacon operating at 37kHz would help locate the drone if it became stuck. LED strobe lights and 3M reflective strips on a bright orange hull would make visual recovery easier. Software-based emergency detection would monitor for sinking, listing, or bladder failure using existing sensors—no additional hardware cost for safety monitoring." 
        sectionTitle="Safety First Design" 
      />
      <TextBlock 
        text="The drone earned its name through a thoughtful process that revealed project values. After rejecting mythological god names (too grandiose), obvious literary references like Nautilus (too well-known), and technical designations (too generic), I chose 'Momo' from the graphic novel 'Captain Momo's Secret Base.' The name reflected a philosophy: understated names that build their own legend through achievements rather than borrowing grandeur from classics. This naming decision captured the project's ethos—authentic, personal, building reputation through actual accomplishment." 
        sectionTitle="Naming The Momo" 
      />
      <TextBlock 
        text="Budget optimization drove creative solutions throughout the design. Instead of a $300 professional underwater camera, a $35 Pi Camera Module in custom waterproof housing. Instead of $200 commercial waterproofing solutions, $70 of DIY materials and techniques. Instead of $150 professional emergency systems, $18 emergency weights and software-based monitoring. The $500 constraint forced more thoughtful engineering than unlimited resources would have—every component selection required justifying its necessity and exploring cheaper alternatives." 
        sectionTitle="Constraint-Driven Innovation" 
      />
      <TextBlock 
        text="The staged development approach reflected risk management thinking. Stage 1 ordered only sensors and breadboard components ($50) to validate the control system before committing to expensive motors. Stage 2 would develop software with existing hardware. Stage 3 would add motors and propulsion ($220-300) only after proving the control system worked. Stage 4 would integrate camera and lighting. Stage 5 would design and 3D print the hull last, after all components were validated and dimensions known. This approach minimized financial risk—if early stages revealed problems, the project wouldn't have wasted money on motors or 3D printing." 
        sectionTitle="Risk-Aware Development" 
      />
      <TextBlock 
        text="The original vision was technically sound and well-planned, with comprehensive component research, detailed specifications, and careful risk management. But visions evolve when confronted with reality. The staged approach that seemed prudent for risk management inadvertently created opportunities for scope changes. Testing components revealed practical limitations. Assembly challenges emerged that weren't apparent in planning. The original underwater drone vision would transform significantly during development, but the foundational thinking—budget constraints, safety philosophy, systematic approach—would persist through all changes." 
        sectionTitle="Vision Meets Reality" 
      />
    </Article>
  );
};

export default TheOriginalVision;

