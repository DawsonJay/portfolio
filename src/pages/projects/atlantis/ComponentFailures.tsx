import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const ComponentFailures = () => {
  return (
    <Article>
      <TitleBlock title="Component Failures and Recovery" />
      <TextBlock 
        text="TL;DR: LCD backlight glows but no text—traced to timing issues. IMU I2C conflicts. Joystick calibration drift. Hardware debugging requires systematic isolation, not stack traces."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The I2C LCD module failure revealed hidden risks in hardware assembly. After carefully soldering the LCD to the Arduino Nano following the incremental testing strategy, the backlight worked but no text appeared. Systematic troubleshooting confirmed I2C communication was perfect—100% success rate at address 0x3F, proper pin functionality on A4/A5, stable power supply. The I2C backpack chip (PCF8574) controlling the backlight functioned correctly, responding to commands. But the HD44780 LCD controller itself never initialized, never displayed text, never responded to any initialization sequence. The LCD had been damaged internally, likely from soldering heat, while the I2C backpack survived." 
        sectionTitle="The LCD Investigation" 
      />
      <TextBlock 
        text="The troubleshooting process demonstrated systematic hardware debugging methodology. First, verify the basics: is power working? Yes—backlight operates. Second, verify communication: does I2C function? Yes—I2C scanner finds device, communication succeeds 100%. Third, verify pins: do A4/A5 work? Yes—tested as digital I/O and I2C, both functional. Fourth, verify initialization: does the LCD controller respond? No—tried multiple libraries, direct I2C commands, various initialization sequences, all failed to produce text. This systematic elimination isolated the problem to internal damage in the LCD controller specifically, not wiring, not I2C communication, not Arduino problems." 
        sectionTitle="Systematic Debugging" 
      />
      <TextBlock 
        text="The component damage raised important questions about testing strategy. The LCD had worked perfectly on a breadboard before soldering—same code, same library, same Arduino, confirmed functional. The damage occurred during soldering despite using reasonable technique and temperature. The challenge: these components have non-standard pin spacing that doesn't fit breadboards well, making pre-soldering testing difficult. Components must be soldered before proper testing, but soldering introduces damage risk. This creates a catch-22: test first to avoid committing damaged components, but testing requires soldering that might cause the damage." 
        sectionTitle="The Testing Dilemma" 
      />
      <TextBlock 
        text="The LoRa module presented similar concerns—it had gone through multiple resoldering attempts during controller assembly iterations. Each soldering cycle increases heat exposure and mechanical stress. The LoRa module's functionality remained untested because it requires being fully integrated into the controller to test properly. Unlike the LCD which could verify I2C communication independently, the LoRa module needs both Arduino code and a receiving unit to confirm operation. This untested component represented another potential failure point discovered only after significant assembly work." 
        sectionTitle="Compounding Risk" 
      />
      <TextBlock 
        text="The component failures prompted a break from controller assembly—a recognition that continuing with damaged parts and mounting damage risk would waste time and components. Taking a break wasn't giving up; it was acknowledging that the current approach had inherent problems requiring different strategy. Future work would need different techniques: perhaps lower soldering temperatures for sensitive components, socketed connections for frequently removed parts, maintaining better spare component inventory, or finding ways to test components before permanent assembly despite pin spacing challenges." 
        sectionTitle="Strategic Pause" 
      />
      <TextBlock 
        text="The failures taught valuable lessons about hardware project management. First, component damage is a real risk even with careful work—heat-sensitive electronics can fail internally without visible external damage. Second, testing strategy matters—the order and methods of testing can determine whether problems get caught early or late. Third, maintaining spares is important for components that can't be removed once soldered. Fourth, incremental assembly reduces but doesn't eliminate damage risk—each solder joint is a potential failure point. Fifth, knowing when to pause and reassess prevents compounding problems and wasted effort." 
        sectionTitle="Risk Management Lessons" 
      />
      <TextBlock 
        text="The systematic troubleshooting and component failure analysis demonstrated valuable engineering skills despite the frustrating outcomes. The ability to isolate failure modes through layered testing, to distinguish between different failure types (I2C backpack working but LCD controller damaged), to recognize when component damage is likely versus when configuration issues exist—these diagnostic skills have broad applicability. The discipline to document failures comprehensively, to understand why components failed rather than just replacing them, and to adjust strategy based on failures demonstrates engineering maturity that's perhaps more valuable than having everything work perfectly the first time." 
        sectionTitle="Skills Through Failure" 
      />
    </Article>
  );
};

export default ComponentFailures;

