import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const HardwareIntegration = () => {
  return (
    <Article>
      <TitleBlock title="Hardware Integration" />
      <TextBlock 
        text="Hardware failures are silent—no error messages. Datasheets show specs but not real-world behavior. Physical constraints can't be abstracted. Testing is manual and slow."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="Hardware integration differs fundamentally from software development in how failures manifest and debugging proceeds. In software, errors produce stack traces, logs, and debugger output pointing to exact problem locations. In hardware, failures are silent—a component simply doesn't work, with no error messages explaining why." 
        sectionTitle="Silent Failures" 
      />
      <TextBlock 
        text="The LCD backlight glowing but displaying no text provides no information about whether the problem is power, communication, initialization, damage, or configuration. This opacity requires systematic testing to isolate problems layer by layer, verifying each aspect independently before moving to the next." 
        sectionTitle="Debugging Approach" 
      />
      <CodeBlock
        language="cpp"
        sectionTitle="I2C Sensor Initialization"
        caption="Systematic initialization with error checking at each step"
        code={`#include <Wire.h>
#include <MPU6050.h>

MPU6050 imu;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  // Check I2C communication
  Wire.beginTransmission(0x68);  // MPU6050 default address
  byte error = Wire.endTransmission();
  
  if (error != 0) {
    Serial.println("ERROR: IMU not found on I2C bus");
    while(1);  // Halt - no point continuing
  }
  
  // Initialize IMU with error checking
  if (!imu.begin()) {
    Serial.println("ERROR: IMU initialization failed");
    while(1);
  }
  
  // Configure settings
  imu.setAccelerometerRange(MPU6050_RANGE_8_G);
  imu.setGyroRange(MPU6050_RANGE_500_DEG);
  imu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  
  // Verify configuration
  delay(100);  // Let settings stabilize
  sensors_event_t a, g, temp;
  imu.getEvent(&a, &g, &temp);
  
  if (a.acceleration.x == 0 && a.acceleration.y == 0 && a.acceleration.z == 0) {
    Serial.println("WARNING: IMU returning zero values");
  } else {
    Serial.println("IMU initialized successfully");
  }
}

// Each step verified before proceeding
// Errors halt execution rather than cascading`}
      />
      <TextBlock 
        text="Component datasheets provide specifications but don't capture real-world behavior nuances. The MPU6050 IMU datasheet lists I2C addresses and register maps, but doesn't mention that rapid repeated reads can cause timing issues, or that certain initialization sequences work more reliably than others, or that voltage fluctuations during startup can leave the chip in inconsistent states. The HC-SR04 ultrasonic sensor datasheet shows timing diagrams but doesn't explain how different surfaces affect echo reliability, or that temperature changes affect speed-of-sound calculations, or that electrical noise can trigger false readings. Real hardware behavior emerges through experimentation, not just datasheet reading." 
        sectionTitle="Beyond Datasheets" 
      />
      <TextBlock 
        text="Physical constraints dominate hardware design in ways software developers rarely encounter. The Arduino Nano has pins on all four sides, so any retention method covers some pins—there's no geometric solution that provides both secure retention and complete pin access. The I2C LCD has non-standard pin spacing that doesn't fit breadboards, forcing soldering before testing. The joystick needs precise centering for neutral position detection, but 3D printing tolerances aren't perfect. The LoRa antenna needs clearance from metal and other electronics, constraining enclosure design. These physical realities can't be abstracted away or worked around through clever code—they require design compromises and trade-off decisions." 
        sectionTitle="Physical Constraints" 
      />
      <TextBlock 
        text="Interfacing different components reveals compatibility challenges that aren't obvious from specifications alone. The LCD expects 5V logic levels while the Arduino Nano outputs 3.3V on some pins—usually this works due to voltage tolerance, but marginal cases cause intermittent failures. The LoRa module requires specific SPI timing that conflicts with other SPI devices sharing the bus. The power distribution to multiple components causes voltage drops that affect sensor accuracy. Pull-up resistors needed for I2C communication affect multiple devices on the same bus. These integration issues only emerge when combining components in actual circuits, not when testing individually on breadboards." 
        sectionTitle="Integration Complexity" 
      />
      <TextBlock 
        text="The mechanical assembly process itself introduces failure modes absent in software. Solder joints can be cold (weak connection), bridged (unwanted connections), or overheated (component damage). Wire routing affects electromagnetic interference and mechanical strain. Screw tension needs to be tight enough for retention but not so tight it cracks printed parts. Component alignment affects fit in enclosures and access to ports. Environmental factors like temperature and humidity affect 3D printed part dimensions. These concerns never exist in software but dominate hardware project success or failure." 
        sectionTitle="Assembly as Engineering" 
      />
      <TextBlock 
        text="Testing strategies for hardware differ from software testing. Unit tests in software run automatically and repeatedly. Hardware component tests require manual setup: connect wires, load code, observe behavior, disconnect, move to next component. Integration tests can't simply mock components—physical components must be present and connected. Automated testing requires additional hardware (test fixtures, multimeters, oscilloscopes) that often cost more than the components being tested. This makes iterative testing slower and more effortful than software development, encouraging longer gaps between tests that make debugging harder when problems appear." 
        sectionTitle="Testing Limitations" 
      />
      <TextBlock 
        text="The hardware integration experience taught me appreciation for embedded systems engineering as a distinct discipline from software engineering. The skills overlap—both require systematic debugging, understanding of abstraction layers, ability to read specifications—but hardware adds physical constraints, irreversible operations (soldering), material properties, manufacturing tolerances, and environmental factors that software developers rarely consider. The controller enclosure iterations, component damage recovery, and systematic troubleshooting demonstrated these hardware-specific challenges. Successfully navigating them requires different mindset and methods than pure software development, making cross-domain capability valuable for robotics and hardware integration projects." 
        sectionTitle="Cross-Domain Skills" 
      />
      
      <TextBlock 
        text="This hardware integration work demonstrates my ability to work across domains—from software debugging (stack traces, logs) to hardware debugging (systematic isolation, physical testing). The systematic troubleshooting approach (verify power, then communication, then pins, then initialization) shows structured problem-solving applicable to any complex system. The component damage recovery and enclosure redesign iterations show resilience and iterative improvement. This cross-domain capability is valuable for IoT, robotics, and embedded systems work where software and hardware integration is essential. The ability to debug systems where failures are silent and testing is manual is a distinct skill from pure software development."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default HardwareIntegration;
