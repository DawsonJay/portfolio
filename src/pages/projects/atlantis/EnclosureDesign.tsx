import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const EnclosureDesign = () => {
  return (
    <Article>
      <TitleBlock title="Enclosure Design" />
      <TextBlock 
        text="I designed a 3D printed modular enclosure with snap-fit assembly. I went through three iterations to solve access/retention trade-offs. I used OnShape parametric design to enable rapid testing."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The controller enclosure went through four major design attempts before achieving a working solution. My first attempt used integrated clips molded into the enclosure to hold components in place—a common approach in commercial products. The clips broke immediately upon testing. PLA+, while stronger than regular PLA for structural parts, proves too brittle for thin, flexible features. Clips need to bend slightly to snap over components, and PLA+ simply fractures instead. This failure taught me that material properties vary by geometry—what works in bulk doesn't work in thin sections." 
        sectionTitle="The Clip Problem" 
      />
      <TextBlock 
        text="My second attempt tried pure friction fit—making the component bay exactly the right size that the Arduino Nano would slide in snugly and stay put from friction alone. This approach failed for different reasons: 3D printing dimensional accuracy isn't perfect, component tolerances vary, and slight measurement errors make the difference between too tight (can't insert) and too loose (rattles around). Additionally, the USB port alignment became an issue—the Nano needed to sit at exactly the right height for the port to line up with the enclosure opening, and friction fit alone didn't provide this precision." 
        sectionTitle="Friction Fit Failures" 
      />
      <TextBlock 
        text="My third attempt returned to clips but tried making them more robust—thicker at the base, shorter span, integrated differently. These still broke, though they lasted longer before failure. This iteration also revealed that components need support underneath, not just retention from above. The Arduino Nano was rattling in its bay even when clips held it from above because it had no solid platform beneath it. The USB port alignment issues persisted. This attempt taught me that clips weren't just brittle—they were solving the wrong problem. Components need precise positioning and solid support, not flexible retention." 
        sectionTitle="Third Attempt Insights" 
      />
      <TextBlock 
        text="My fourth attempt succeeded through fundamental redesign: a raised platform providing solid support underneath, with screw-based retention from above. The Arduino sits on a 5mm raised platform that positions the USB port perfectly in the enclosure opening and provides stable support. Two orange retention bars with cylindrical posts for M2 screws press down over the Arduino's mounting holes, holding it firmly without brittle clips. A 2mm clearance all around allows smooth insertion and removal while preventing wobble. This design works almost flawlessly—components slide in easily, stay secure, and align perfectly." 
        sectionTitle="Raised Platform Success" 
      />
      <TextBlock 
        text="The successful design revealed key principles I learned for 3D printed component retention. First, use the material's strengths—PLA+ handles compression and structural loads well but fails in thin, flexible geometries. Second, solve positioning and support before solving retention—components need to sit at the right height and have solid platforms before worrying about holding them down. Third, use proper fasteners for retention rather than integrated flexible features. Fourth, design for 1-2mm clearance around components for smooth assembly. Fifth, provide access to mounting holes and use them—components have mounting holes for good reasons." 
        sectionTitle="Design Principles Learned" 
      />
      <TextBlock 
        text="The enclosure iterations extended beyond just the Arduino bay. The joystick enclosure, screen frame, button arrays, and LoRa module housing all needed their own solutions. Each component presented unique challenges: the screen needed minimal rim without blocking the display, the joystick needed precise centering with smooth movement, buttons needed alignment and tactile feedback, the LoRa module needed antenna clearance. The raised platform + screw retention approach became a template that adapted to each component's specific requirements while maintaining consistent assembly philosophy." 
        sectionTitle="Template Application" 
      />
      <TextBlock 
        text="The iterative design process consumed significant time and 3D printing filament—four attempts for the Arduino bay alone, multiple iterations for other components. But each failure provided specific lessons that improved subsequent designs. The first attempt taught me about PLA+ brittleness in thin sections. The second about dimensional tolerance issues. The third about the need for under-support. The fourth synthesized these lessons into working principles. This wasn't wasted effort—it was systematic learning through fabrication, each iteration refining my understanding of how to design functional enclosures with available tools and materials." 
        sectionTitle="Learning Through Making" 
      />
    </Article>
  );
};

export default EnclosureDesign;
