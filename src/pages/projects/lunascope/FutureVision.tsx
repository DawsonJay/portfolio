import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const FutureVision = () => {
  return (
    <Article>
      <TitleBlock title="Future Vision" />

      <TextBlock
        text="TL;DR: Four-phase build: TEG power system with supercapacitor storage and voltage regulation, precision timing circuit with crystal oscillator and frequency dividers, copper clockface with heat treatment and black patina engraving, mechanical integration with stepper motor and long-term testing. Components sourced, design validated, ready for assembly."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The planning phase is complete—design validated, calculations confirmed, components ordered. The build follows a four-phase sequence where each subsystem is constructed and tested independently before integration. Phase 1 focuses on power generation and storage, ensuring the TEG can harvest sufficient energy. Phase 2 builds the timing circuit, verifying crystal accuracy and frequency division. Phase 3 creates the artistic copper clockface through heat treatment and patina. Phase 4 integrates everything and validates long-term operation through months of testing."
        sectionTitle="From Design to Assembly"
      />

      <TextBlock
        text="The 80mm × 80mm TEG module mounts behind the copper clockface with thermal interface paste ensuring maximum heat transfer. The cold side contacts the copper disc, absorbing ambient heat and sunlight. The hot side connects to a 150mm × 150mm × 15mm aluminum heatsink, dissipating to room temperature. This temperature differential generates 40-200mW depending on conditions—ambient room temperature produces 40-80mW, morning sunlight through windows boosts to 300-600mW, nearby heat sources (radiators, stoves) provide 150-400mW.

The 0.2F supercapacitor stores 2.5Wh of energy, providing 3.8 days of backup power at the 27.5mW average consumption rate. The LM7805 voltage regulator sits between the TEG and supercapacitor, maintaining stable 5V output while preventing overcharging. This protection is critical—the TEG can generate far more power than needed in direct sunlight, and the regulator prevents damage through 3-5x safety margins. Testing measures actual power output under various conditions: early morning sunlight, afternoon ambient temperature, evening cooling cycles. Real-world data validates the predicted 40-200mW range."
        sectionTitle="Phase 1: Power System"
      />

      <TextBlock
        text="The 32.768 kHz crystal oscillator provides ultra-stable frequency reference—the same crystals used in quartz watches. The CD4060 14-stage binary frequency divider reduces 32.768 kHz to 128 Hz (8 seconds per step). A frequency counter verifies crystal accuracy before building the full circuit. The CD4060 outputs connect to an A4988 stepper driver configured for 1/16th microstepping, translating 8-second pulses into precise motor movements.

Breadboard prototyping validates the circuit before permanent soldering. Each component tests independently: crystal oscillation verified with frequency counter, CD4060 division ratios checked at each stage, A4988 driver configured and tested with motor. The complete timing chain must achieve 10,835 steps per day to track the 29.53059-day lunar cycle with ±0.1 day per month accuracy. Circuit testing uses accelerated timing (shorter intervals) to verify behavior over multiple cycles before committing to the final 8-second stepping."
        sectionTitle="Phase 2: Timing Circuit"
      />

      <TextBlock
        text="A 200mm diameter, 2mm thick copper disc forms the clockface base—large enough for moon phase visibility, thick enough for structural rigidity and heat capacity. Heat treatment with a torch creates color variations through controlled oxidation: reds appear first, then oranges, purples, blues as temperature increases. These aren't pigments but thin oxide layers forming naturally. Each clockface becomes unique based on heat application patterns and timing. The disc must cool completely (24 hours) before the next step.

Liver of sulfur solution transforms the heat-treated copper into deep black patina. Both front and back surfaces receive treatment—the back isn't visible but contributes to thermal performance, increasing heat absorption by 20-30% compared to single-side treatment. The patina preserves underlying heat-treated colors as subtle variations in the black surface. After patina curing, precision engraving cuts through the black layer, exposing bright copper beneath. Moon phase markers emerge as brilliant copper crescents and circles against the black background. Small triangular markers indicate motion direction. The result is 90-95% heat absorption efficiency (functional requirement) merged with artistic lunar phase display (aesthetic goal)."
        sectionTitle="Phase 3: Clockface Fabrication"
      />

      <TextBlock
        text="The PTX05 HPM Nano Step stepper motor (13mm diameter, 0.5W) mounts behind the clockface with its shaft protruding through a center bearing. A 1:100 worm gear reduction connects motor output to the moon phase indicator mechanism. The worm gear self-locks, preventing the indicator from drifting backward when the motor isn't powered—critical for maintaining accurate phase display during low-power periods. Precise alignment ensures smooth motion without binding or excessive backlash.

System integration brings together TEG power generation, voltage regulation, timing circuit, stepper driver, and mechanical drive. Each subsystem must work correctly in isolation before integration—integration reveals interaction effects not apparent during isolated testing. Calibration adjusts timing circuit frequency to match real-world crystal accuracy, compensates for temperature effects, and aligns stepper motor step count with actual lunar cycle timing. Power management parameters tune to balance TEG charging current against motor consumption, ensuring the supercapacitor stays charged without wasting harvested energy."
        sectionTitle="Phase 4: Integration"
      />

      <TextBlock
        text="Long-term testing validates the 20-30 year operational goal through months of continuous operation. The clock runs on a south-facing windowsill where morning sunlight provides maximum thermal input. Daily monitoring tracks power generation, supercapacitor voltage, timing accuracy, and mechanical operation. Seasonal variations test system resilience: short winter days with weak sunlight, long summer days with extended thermal input, spring and fall transitions that stress energy storage capacity.

Extended testing reveals issues impossible to catch during initial assembly: thermal cycling effects on solder joints, mechanical wear patterns, timing drift over weeks, supercapacitor charging behavior under varying conditions. Does the TEG really generate 40-200mW under real conditions? Does the 0.2F supercapacitor provide 3.8 days backup as calculated? Does the timing circuit maintain ±0.1 day per month accuracy across temperature variations? Does mechanical friction increase with sustained operation? Patient observation and measurement answer these questions, separating assumptions from reality."
        sectionTitle="Long-Term Testing"
      />

      <TextBlock
        text="The specification includes future enhancements for potential implementation after the base system proves reliable: temperature compensation for timing (automatic adjustment based on ambient temperature), power management sleep modes (reduce consumption during low-light periods), user-adjustable calibration (fine-tune timing without disassembly), and LED indicators for status (power level, charging state, system health). These aren't part of the core build—they're documented possibilities for after the fundamental system operates reliably.

The four-phase approach emphasizes validated incremental assembly: build power system, verify it works; build timing circuit, verify it works; create clockface, verify aesthetics and thermal performance; integrate all systems, verify long-term operation. Each phase reduces risk by catching problems early rather than discovering integration issues after everything is assembled. The methodical progression builds confidence that the complete system will function as designed."
        sectionTitle="Technical Scope"
      />
    </Article>
  );
};

export default FutureVision;
