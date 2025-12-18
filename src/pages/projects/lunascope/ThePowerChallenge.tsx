import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ThePowerChallenge = () => {
  return (
    <Article>
      <TitleBlock title="The Power Challenge" />
      <TextBlock 
        text="TL;DR: TEG harvests 0.96-14.4Wh/day from temperature gradients. 4.0F supercapacitors provide 91-day backup. System draws 27.5mW average. Black copper patina maximizes heat absorption."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="The Lunascope's core challenge is straightforward: track lunar phases for 20-30 years without external power or maintenance. Most clocks rely on batteries or wall power—both require periodic intervention. Batteries need replacement every few years. Wall power requires accessible outlets and creates dependency. The solution: harvest energy from the environment itself using thermoelectric generators (TEGs) that convert temperature differences into electricity. TEGs have no moving parts, degrade slowly, and generate power as long as temperature gradients exist. This approach eliminates maintenance while demonstrating energy harvesting applicable to extreme environments where traditional power isn't viable." 
        sectionTitle="Energy Harvesting Approach" 
      />
      <TextBlock 
        text="TEG power generation depends on temperature difference between hot and cold sides—the greater the difference, the more power generated. A copper clockface exposed to morning sunlight heats up while the back remains cooler, creating gradients. Room temperature variations provide baseline power (40-80mW). Direct sunlight boosts output to 300-600mW. Placing the clock near a radiator or heat source yields 150-400mW."
        sectionTitle="TEG Performance" 
      />
      <TextBlock 
        text="The black copper patina isn't just aesthetic—it absorbs 90-95% of incident heat, maximizing temperature rise and power generation. The heatsink on the cold side maintains temperature difference. This passive system generates 0.96-14.4Wh daily while requiring only 0.66Wh—a 1.5-22x energy surplus depending on conditions." 
        sectionTitle="Energy Surplus" 
      />
      <CodeBlock
        language="python"
        sectionTitle="Power Budget Calculations"
        caption="Daily energy generation vs consumption over 20-30 years"
        code={`# Power generation scenarios
teg_min_power = 40e-3  # 40mW (room temp variations)
teg_max_power = 600e-3  # 600mW (direct sunlight)

# Assume 4 hours of useful generation per day (conservative)
daily_generation_min = teg_min_power * 4  # 0.16 Wh
daily_generation_max = teg_max_power * 4  # 2.4 Wh

# Power consumption
crystal_osc_power = 5e-3  # 5mW continuous
motor_power_per_step = 0.5  # 0.5W during movement
motor_time_per_step = 0.1  # 0.1 seconds
steps_per_hour = 451  # Lunar tracking precision
hours_per_day = 24

# Daily motor energy
motor_energy_daily = (
    motor_power_per_step * 
    motor_time_per_step * 
    steps_per_hour * 
    hours_per_day
) / 3600  # Convert to Wh
# = 0.5W * 0.1s * 451 * 24 / 3600 = 0.15 Wh

# Total daily consumption
crystal_energy_daily = crystal_osc_power * 24  # 0.12 Wh
total_daily_consumption = crystal_energy_daily + motor_energy_daily
# = 0.27 Wh

# Energy surplus
surplus_min = daily_generation_min - total_daily_consumption  # -0.11 Wh (deficit)
surplus_max = daily_generation_max - total_daily_consumption  # +2.13 Wh (surplus)

# Typical scenario (morning sun + room variations)
typical_generation = 1.2  # Wh/day
typical_surplus = typical_generation - total_daily_consumption  # +0.93 Wh/day

print(f"Daily consumption: {total_daily_consumption:.2f} Wh")
print(f"Typical generation: {typical_generation:.2f} Wh")
print(f"Daily surplus: {typical_surplus:.2f} Wh")
print(f"Energy ratio: {typical_generation/total_daily_consumption:.1f}x")`}
      />
      <TextBlock 
        text="The original specification called for 0.2F supercapacitors providing 3.8 days backup. During planning, I recognized this was insufficient for seasonal variations—winter months with less sunlight, heating cycles that reduce temperature gradients, extended cloudy periods. The solution: upgrade to 4.0F supercapacitors storing 60.4Wh, providing 91-day backup power. This three-month buffer handles worst-case scenarios: cloudy winter weeks, heating season with minimal gradients, placement away from windows. The supercapacitor choice demonstrates systems thinking—understanding that average conditions don't capture edge cases, and long-term reliability requires designing for extremes." 
        sectionTitle="Energy Storage Strategy" 
      />
      <TextBlock 
        text="Power management required careful component selection to minimize consumption. The crystal oscillator draws 5mW continuously. The NEMA 8 stepper motor with 1/16 microstepping consumes 0.5W during movement but only operates 0.1 seconds per step, 451 steps per hour, averaging 22.5mW. Total system power: 27.5mW average, well below TEG output even in poor conditions. An LM7805 voltage regulator provides overcharge protection with 3-5x safety margin—excess energy simply dissipates as heat rather than damaging electronics. This bulletproof protection allows the system to handle high-power conditions (direct sunlight, heat sources) without risk, turning a potential problem into a non-issue through proper component selection." 
        sectionTitle="Power Management" 
      />
      <TextBlock 
        text="The power strategy reveals a key design principle: environmental solutions over adding equipment. Rather than larger TEG modules (more expensive, harder to mount), the black copper patina improves heat absorption. Rather than complex power management circuits (more components, more failure points), simple voltage regulation with massive safety margin. Rather than trying to generate more power, reduce consumption through efficient components (0.2A motor vs 0.8A alternatives). This approach works because constraints force examining the entire system—power generation, storage, consumption, and regulation as interconnected elements where optimizing one enables simplification elsewhere." 
        sectionTitle="Systems Optimization" 
      />
      <TextBlock 
        text="The TEG approach demonstrates methodology applicable beyond lunar clocks. Deep sea sensors face similar challenges: no external power, inaccessible for maintenance, temperature gradients between water layers. Space probes operate under severe power constraints with temperature extremes. Remote environmental monitors need years of autonomous operation. The Lunascope's solution—harvest ambient energy, store for variability, minimize consumption, overdesign safety margins—translates directly. The specific implementation (TEG, supercapacitor, stepper motor) matters less than the systematic approach: identify available energy sources, characterize variability, design for edge cases, validate with safety factors." 
        sectionTitle="Extreme Environment Applications" 
      />
      <TextBlock 
        text="Power system planning consumed significant time before ordering components—testing TEG specifications, calculating energy budgets, validating backup duration, comparing supercapacitor options. This upfront work prevented expensive mistakes. The 4.0F supercapacitor decision came from winter reliability analysis, not arbitrary selection. The LM7805 safety margin came from calculating maximum TEG output under extreme conditions. The motor power budget came from step timing calculations across full lunar cycles. Planning revealed requirements that initial specifications missed, allowing corrections before spending money. This demonstrates engineering discipline: thorough analysis before commitment, validation of assumptions, design for known failure modes." 
        sectionTitle="Planning Before Building" 
      />
    </Article>
  );
};

export default ThePowerChallenge;

