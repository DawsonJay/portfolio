import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const IterativeRefinement = () => {
  return (
    <Article>
      <TitleBlock title="Iterative Refinement" />
      <TextBlock 
        text="TL;DR: Multiple polish passes: badge extraction, floating labels, z-index layering. Separation of concerns localizes changes."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="The foundation block system went through multiple distinct refinement passes, each improving a specific aspect without disrupting the overall structure. This iterative approach wasn't about getting it wrong initially—it was about working in broad brushstrokes first, establishing a solid foundation, then perfecting the details. I don't think it's possible to have one perfect idea upfront, and depending too much on that leads easily to failure. Better to have a really good broad structure and then perfect the details."
        sectionTitle="Iterative Approach"
      />
      <TextBlock 
        text="The first major refactor separated layout from styling. Initially, the foundation Block component had hardcoded background color, padding, border radius, and box shadow. This worked for fixed ratio blocks but broke when I needed GridBlock—a transparent container for fractional layouts. Rather than adding a hasStyling prop (which would proliferate into hasBackground, hasPadding, hasShadow...), I removed all styling from the foundation Block and added an sx prop for MUI-standard customization. Then I created BasicBlock, which wraps the foundation Block and passes styling via sx. Fixed ratio blocks (Block1x1, etc.) now wrap BasicBlock instead of Block. Clean separation: foundation handles layout, BasicBlock adds styling, ratio wrappers simplify the API."
        sectionTitle="Layout vs Styling"
      />
      <TextBlock 
        text="The badge component went through multiple polish passes. Initially it was embedded in the Block component with inline sx props, making the component 150+ lines where the structure got buried in styling details. I extracted it into a separate component with styled components (BadgeContainer and BadgeIcon), reducing Block to ~127 lines and making both components more focused. Then I refined the badge aesthetic: changed to minimal icons (faExclamation, faXmark, faInfo), reduced icon size from 16px to 14px, enhanced box shadow for elevation, adjusted positioning to overlap the block edge (translate 20%, -20%). Each change was small but compounding—the final badge is clean, minimal, and doesn't dominate the interface."
        sectionTitle="Badge Refinement"
      />
      <TextBlock 
        text="The title component evolved from an internal element to a floating label. Initially, titles rendered inside the block content area, taking up vertical space. I refined them to small labels (0.875rem, regular weight, no uppercase) to be unobtrusive. But this still consumed content space. The solution was extracting titles into a floating Label component positioned absolutely at the top-left corner with 4px overlap. This maximized content area inside blocks and created a consistent pattern with badges (which float at top-right). The z-index layering became: badges at 3 (most prominent), labels at 2 (middle), content below. This required removing overflow: hidden from the foundation Block so labels could extend beyond boundaries, while BasicBlock adds overflow: hidden for its own children (skeleton containment)."
        sectionTitle="Floating Labels"
      />
      <TextBlock 
        text={'Each refinement pass had clear criteria for "good enough" versus "needs another pass." I kept my focus on structure. The badge was good enough because it looked good, seemed stable, and was self-contained in a separate file - easy to come back to later without affecting the wider structure. The bits I was really painstaking on were the bits that everything else was built on top of, where changing them would cause cascading problems later. I try to make things in such a way that they\'re either self-contained or highly adaptable. Like the sx prop in the Block component - I could have just had flags for padding and boxShadow, but sx allows me a graceful way to solve similar problems in the future. I focus on structure because it keeps giving value. It makes every future component that depends on it better and more stable.'}
        sectionTitle="Good Enough Criteria"
      />
    </Article>
  );
};

export default IterativeRefinement;

