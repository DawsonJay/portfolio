import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TwoPanelLayoutResponsive = () => {
  return (
    <Article>
      <TitleBlock title="Layout & Responsiveness" />

      <TextBlock
        text="I created a TwoPanelLayout component that eliminates duplication across Projects, About, and Immigration pages. Desktop shows fixed-width left panel + flexible right panel. Mobile replaces left panel with bottom drawer using shared MobileDrawer component. I extracted the theme breakpoint (twoPanelMobile: 1060px) to ensure consistent responsive behavior."
        sectionTitle="Overview"
      />

      <TextBlock
        text="Three pages in my portfolio (Projects, About, Immigration) shared the same layout pattern: desktop view shows a narrow left panel (menu or table of contents) with the main content on the right, while mobile view hides the left panel and shows it as a collapsible drawer at the bottom. The initial implementations duplicated this layout logic with minor variations, creating maintenance burden and inconsistency in breakpoints and spacing.

I extracted the common pattern into TwoPanelLayout, a generic component that accepts leftPanel (content for the left sidebar), rightPanel (main content area), and mobileMenu (optional bottom drawer content). The component handles responsive switching automatically using a theme breakpoint, manages spacing and sizing consistently, and provides optional NavBar integration. This reduced three duplicate implementations to a single reusable component with clear responsibilities."
        sectionTitle="Shared Layout Pattern"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="TwoPanelLayout Structure"
        caption="Generic layout component used by multiple pages"
        code={`import styled from 'styled-components';
import { ReactNode } from 'react';

const LayoutContainer = styled.div\`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: \${(props) => props.theme.colors.layers.layer1};
  padding-top: 64px; // Space for fixed NavBar
  
  @media (max-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    flex-direction: column; // Stack vertically on mobile
  }
\`;

const LeftPanel = styled.div\`
  width: 360px;
  min-width: 360px;
  background-color: \${(props) => props.theme.colors.layers.layer2};
  overflow-y: auto;
  position: sticky;
  top: 64px; // Stick below NavBar
  height: calc(100vh - 64px);
  
  @media (max-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: none; // Hide on mobile, replaced by drawer
  }
\`;

const RightPanel = styled.div\`
  flex: 1;
  overflow-y: auto;
  padding: \${(props) => props.theme.spacing['2xl']};
  
  @media (max-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    padding-bottom: 80px; // Space for mobile drawer bar
  }
\`;

interface TwoPanelLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  mobileMenu?: ReactNode;
}

const TwoPanelLayout = ({ 
  leftPanel, 
  rightPanel, 
  mobileMenu 
}: TwoPanelLayoutProps) => {
  return (
    <LayoutContainer>
      <LeftPanel>{leftPanel}</LeftPanel>
      <RightPanel>{rightPanel}</RightPanel>
      {mobileMenu && <MobileDrawer>{mobileMenu}</MobileDrawer>}
    </LayoutContainer>
  );
};`}
      />

      <TextBlock
        text="The responsive breakpoint (twoPanelMobile: 1060px) lives in the theme rather than hardcoded in components. This centralization means changing the breakpoint requires updating one value, not hunting through multiple styled-components. I chose 1060px deliberately after testing on various devices—narrower screens struggle to show a 360px sidebar and meaningful content simultaneously. At 1060px, the right panel has 700px available, providing comfortable reading width."
        sectionTitle="Theme Breakpoint System"
      />

      <TextBlock
        text="The mobile drawer component manages bottom-sheet behavior: a fixed bar at the bottom of the screen with a chevron icon, a backdrop overlay when expanded, and smooth slide-up animation. I used useState for open/close state, CSS transitions for the slide animation, and backdrop clicks to close the drawer. Initially, I tried using a third-party drawer library, but it added 40KB for functionality I could implement in 80 lines. The custom solution is faster, lighter, and exactly matches my needs."
        sectionTitle="Mobile Drawer Implementation"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="MobileDrawer Component"
        caption="Bottom sheet with backdrop and slide animation"
        code={`import { useState } from 'react';
import styled from 'styled-components';

const DrawerBar = styled.div\`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: \${(props) => props.theme.colors.layers.layer2};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  
  @media (min-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: none; // Hide on desktop
  }
\`;

const DrawerContent = styled.div<{ isOpen: boolean }>\`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 70vh;
  background-color: \${(props) => props.theme.colors.layers.layer2};
  transform: translateY(\${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 101;
\`;

const Backdrop = styled.div<{ isVisible: boolean }>\`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: \${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: \${(props) => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
  z-index: 99;
\`;

const MobileDrawer = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DrawerBar onClick={() => setIsOpen(true)}>
        <ChevronIcon direction="up" />
      </DrawerBar>
      
      <Backdrop 
        isVisible={isOpen} 
        onClick={() => setIsOpen(false)} 
      />
      
      <DrawerContent isOpen={isOpen}>
        {children}
      </DrawerContent>
    </>
  );
};`}
      />

      <TextBlock
        text="Testing on actual devices revealed issues that desktop browser responsive mode didn't catch. On iPhone SE (375px width), the drawer content was too cramped with the default padding. I reduced padding for mobile-specific components, increased touch target sizes (48px minimum), and adjusted font sizes for readability. The 70vh max-height for the drawer ensures users can still see content behind it, providing context about what page they're on."
        sectionTitle="Mobile Testing Insights"
      />

      <TextBlock
        text="The architecture demonstrates something I've learned: extract patterns only after you've implemented them 2-3 times. My first attempt at a TwoPanelLayout came too early—I tried to predict what features would be needed before seeing the actual usage patterns. After building Projects, About, and Immigration pages separately, the common patterns became obvious: fixed left panel, flexible right panel, mobile drawer with backdrop. The abstraction emerged naturally from real requirements rather than premature optimization."
        sectionTitle="When to Abstract"
      />
    </Article>
  );
};

export default TwoPanelLayoutResponsive;
