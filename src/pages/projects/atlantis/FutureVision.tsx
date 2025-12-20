import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const FutureVision = () => {
  return (
    <Article>
      <TitleBlock title="Future Vision" />

      <TextBlock
        text="Five-phase implementation: controller with LoRa communication, DNA-style error correction system, GPS-equipped surface boat with winch, two-part sphere probe with ultrasonic array, mapping software for 3D lake bed visualization. Current focus on 3D-printed controller design."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The Atlantis system follows a five-phase development plan, starting with the most accessible component and building toward the complete mapping system. This approach allows each phase to be tested independently before integration, reducing risk and enabling iterative refinement. The current focus is Phase 1: designing and building the controller, which provides hands-on experience with 3D printing, Arduino programming, and LoRa communication before tackling the more complex boat and probe systems."
        sectionTitle="Development Approach"
      />

      <TextBlock
        text="The controller is phone-sized (150mm × 75mm × 10mm) with a 3D-printed modular snap-fit enclosure. No glue—components fit together through careful tolerance management and integrated clips. The electronics stack includes Arduino Nano for control logic, LoRa SX1276 module for 5-20km communication range, 2.9-4.2 inch e-paper display for status information, analog joystick for two-axis movement control, and 4-6 tactile buttons for commands (start/stop mapping, winch control, emergency stop). An external USB power bank provides power.

The controller sends commands to the boat but doesn't handle positioning—the boat has its own GPS and reports coordinates back. The e-paper display shows boat status, signal strength, and battery levels. A 'home' function stores GPS coordinates and navigates the boat back automatically. The challenge is designing snap-fit enclosures that work reliably without requiring glue, while maintaining clean cable routing and component accessibility for troubleshooting."
        sectionTitle="Phase 1: Controller Design"
      />

      <TextBlock
        text="LoRa communication operates at 5-20km range using SX1276 modules with custom high-gain antennas. The controller uses a directional Yagi antenna (8-12 dBi gain) while the boat uses an omnidirectional helical antenna (6-10 dBi gain). The real innovation is DNA-style error correction: send each command 30 times per second, then use majority voting to reconstruct the correct data bit-by-bit. This approach handles massive signal degradation—even when all 30 copies are corrupted, comparing them reveals the original data.

The communication protocol uses a simple packet format: [Header][Command][Data][Checksum]. A unique header byte pattern (0xAA) identifies valid signals. Commands include direction, speed, start/stop mapping, and winch control. The boat reports back GPS coordinates, signal corruption level (used to calculate signal strength), and system status. Two-way communication enables adaptive power control—adjust transmission power based on reported corruption levels to extend battery life while maintaining reliable communication."
        sectionTitle="Phase 2: Communication System"
      />

      <TextBlock
        text="The surface boat houses GPS for positioning, automatic winch for cable management, remote-controlled motors, and LoRa communication. GPS positioning enables waypoint navigation and stop-and-wait mapping strategy—the boat moves in straight lines (lawnmower pattern), stops at turns, and waits for the probe to settle before continuing. This eliminates complex cable angle modeling during turns.

The winch system automatically adjusts cable length based on distance from shore and target depth. A rotary encoder tracks cable length deployed. The winch can retract quickly if the probe detects obstacles (ruins, rocks) using ultrasonic sensors. Motor control responds to joystick commands from the controller, with smooth acceleration and deceleration. The challenge is integrating GPS, motor control, winch management, and LoRa communication on a single Raspberry Pi 4 while maintaining responsive control."
        sectionTitle="Phase 3: Surface Boat Development"
      />

      <TextBlock
        text="The probe is a 20-30cm diameter two-part sphere that screws together with O-ring seals for waterproofing. Dense enough to sink naturally, it maintains 2m above lake bed through cable tension. Eight ultrasonic sensors mount in a hemispherical array facing downward, providing 180° coverage below the probe. Each sensor has 2-4m range—perfect for mapping from 2m altitude. An accelerometer measures probe orientation and cable angle for position correction.

The probe has self-contained power (10,000mAh USB power bank, 24+ hours runtime) so the cable only carries data—no power transmission issues or voltage drop over 50m. The two-part design allows easy battery replacement and electronics access for maintenance. Depth calculation uses cable length (from winch encoder) multiplied by cos(angle from accelerometer), eliminating pressure sensor needs. The challenge is waterproofing to 20-30m depths while maintaining sensor functionality and cable strain relief."
        sectionTitle="Phase 4: Probe Development"
      />

      <TextBlock
        text="The mapping software processes probe data into 3D point clouds. Each measurement includes GPS coordinates (from boat position plus cable angle offset), depth reading (from cable length calculation), and timestamp. The stop-and-wait strategy ensures accurate positioning—the boat stops, the probe settles to stable depth and orientation, measurements are taken, then the boat moves to the next waypoint. Post-processing interpolates between measurement points to create continuous topology maps.

Color mapping visualizes depth variations: shallow areas in warm colors, deep areas in cool colors. The lawnmower pattern (parallel straight-line transects with consistent spacing) ensures complete coverage. Resolution depends on transect spacing and measurement frequency. The data format is professional-grade 3D point clouds suitable for environmental assessment. The challenge is handling large datasets (thousands of measurements per mission), maintaining GPS accuracy, and creating intuitive visualization of underwater topology."
        sectionTitle="Phase 5: Mapping Software"
      />

      <TextBlock
        text="The complete system integrates mechanical design (boat hull, probe housing, winch system), electrical systems (motor control, sensor integration, power management), embedded programming (Arduino/Raspberry Pi, LoRa protocols, sensor reading), navigation (GPS waypoint following, stop-and-wait strategy), communication (long-range LoRa with error correction), and data processing (3D visualization, coordinate mapping). Each phase builds on previous work, with independent testing before integration.

The five-phase approach reduces risk by starting with the most accessible component (controller) and building complexity gradually. Each phase produces a working subsystem that can be tested and validated independently. This differs from attempting to build everything simultaneously and hoping it works during final integration. The controller phase is currently underway, focusing on 3D printing skills and snap-fit enclosure design before moving to the more complex boat and probe systems."
        sectionTitle="System Integration"
      />
    </Article>
  );
};

export default FutureVision;
