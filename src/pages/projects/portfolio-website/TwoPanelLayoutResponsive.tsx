import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TwoPanelLayoutResponsive = () => {
  return (
    <Article>
      <TitleBlock title="Layout & Responsiveness" />

      <TextBlock
        text="TL;DR: TwoPanelLayout component eliminates duplication across Projects, About, and Immigration pages. Desktop shows fixed-width left panel + flexible right panel. Mobile replaces left panel with bottom drawer using shared MobileDrawer component. Theme breakpoint extraction (twoPanelMobile: 1060px) ensures consistent responsive behavior across components."
        sectionTitle="Overview"
      />

      <TextBlock
        text="Three pages in the portfolio (Projects, About, Immigration) share the same layout pattern: desktop view shows a narrow left panel (menu or table of contents) with the main content on the right, while mobile view hides the left panel and shows it as a collapsible drawer at the bottom. The initial implementations duplicated this layout logic with minor variations, creating maintenance burden and inconsistency in breakpoints and spacing.

The solution extracted the common pattern into TwoPanelLayout, a generic component that accepts leftPanel (content for the left sidebar), rightPanel (main content area), and mobileMenu (optional bottom drawer content). The component handles responsive switching automatically using a theme breakpoint, manages spacing and sizing consistently, and provides optional NavBar integration. This reduced three duplicate implementations to a single reusable component with clear responsibilities."
        sectionTitle="Shared Layout Component"
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
      {mobileMenu}
    </LayoutContainer>
  );
};

export default TwoPanelLayout;`}
      />

      <TextBlock
        text="The left panel uses position: sticky to remain visible during scrolling, creating a fixed navigation experience without requiring JavaScript. The top: 64px value keeps it below the fixed NavBar, and height: calc(100vh - 64px) ensures it fills the remaining viewport height. On mobile (below 1060px breakpoint), the left panel disappears entirely and gets replaced by the mobileMenu prop—typically a MobileDrawer component.

The right panel uses flex: 1 to consume all remaining horizontal space, automatically adapting to different viewport widths. On mobile, the flex-direction: column on the container causes the right panel to take full width. The padding-bottom: 80px on mobile prevents content from hiding behind the bottom drawer's collapsed bar, ensuring all content remains accessible."
        sectionTitle="Sticky Panel Behavior"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="MobileDrawer Component"
        caption="Reusable bottom drawer with theme path string support"
        code={`import styled from 'styled-components';
import { useState, ReactNode, MouseEvent } from 'react';
import { getNestedValue } from '../../utils/themeUtils';

const MobileDrawerContainer = styled.div<{ $isOpen: boolean }>\`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: none; // Hidden on desktop
  
  @media (max-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: block; // Visible on mobile
  }
\`;

const MobileBarContainer = styled.div\`
  height: 48px;
  background-color: \${(props) => props.theme.colors.layers.layer2};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top: 1px solid \${(props) => props.theme.colors.layers.layer3};
\`;

const MenuPanel = styled.div<{ $menuBackgroundColor?: string }>\`
  position: fixed;
  bottom: 48px;
  left: 0;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  background-color: \${(props) => 
    props.$menuBackgroundColor || props.theme.colors.layers.layer2};
  transform: translateY(\${(props) => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
\`;

interface MobileDrawerProps {
  children: ReactNode;
  menuBackgroundColor?: string; // Can be hex or theme path like 'colors.layers.layer3'
  onItemClick?: () => void;
}

const MobileDrawer = ({ 
  children, 
  menuBackgroundColor, 
  onItemClick 
}: MobileDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  
  // Resolve theme path strings like 'colors.contentsPanelBackground'
  const resolvedColor = menuBackgroundColor 
    ? getNestedValue(theme, menuBackgroundColor) || menuBackgroundColor
    : undefined;
  
  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };
  
  return (
    <MobileDrawerContainer $isOpen={isOpen}>
      <MobileBarContainer onClick={() => setIsOpen(!isOpen)}>
        <CaretIcon $isOpen={isOpen} />
      </MobileBarContainer>
      <MenuPanel 
        $menuBackgroundColor={resolvedColor}
        $isOpen={isOpen}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, 
              { onItemClick: handleItemClick })
          : children}
      </MenuPanel>
    </MobileDrawerContainer>
  );
};`}
      />

      <TextBlock
        text="MobileDrawer uses a fixed position bottom drawer that slides up from the bottom edge when activated. The collapsed state shows a 48px bar with a caret icon, and the expanded state reveals menu content up to 60% of viewport height with vertical scrolling. The transform: translateY() animation creates smooth slide-up/down motion, and the transition is fast (0.3s) to feel responsive rather than sluggish.

A clever feature: menuBackgroundColor accepts either hex colors or theme path strings like 'colors.contentsPanelBackground'. The getNestedValue utility traverses the theme object to resolve these paths, allowing child components (like ContentsMenu in About page) to specify their preferred background using theme-aware strings. This creates flexibility while maintaining type safety and theme consistency."
        sectionTitle="Mobile Drawer Animation"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Theme Breakpoint Extraction"
        caption="Centralized breakpoint ensures consistency"
        code={`// src/theme/index.ts
export const theme = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
  fonts: { /* ... */ },
  fontSizes: { /* ... */ },
  
  breakpoints: {
    twoPanelMobile: '1060px', // Single source of truth
    // Could add more: tablet: '768px', desktop: '1440px', etc.
  },
  
  clockworkDurations: [ /* ... */ ],
} as const;

// Usage in any component:
const StyledComponent = styled.div\`
  @media (max-width: \${(props) => props.theme.breakpoints.twoPanelMobile}) {
    /* Mobile styles */
  }
\`;

// Before: hardcoded breakpoints scattered across components
// LeftPanel: @media (max-width: 768px)
// MobileDrawer: @media (max-width: 1060px)
// Projects EmptyStateText: @media (max-width: 768px)
// Result: inconsistent responsive behavior, hard to update

// After: single breakpoint referenced everywhere
// Easy to update: change one value in theme
// Consistent behavior: all components switch at same point
// Semantic naming: 'twoPanelMobile' describes purpose`}
      />

      <TextBlock
        text="The breakpoint extraction demonstrates a key refactoring pattern: finding magic numbers scattered across the codebase and extracting them to a central configuration. Initially, different components used different breakpoints (768px, 1060px) causing the mobile drawer to appear at a different width than when the left panel disappeared. Consolidating to a single theme.breakpoints.twoPanelMobile value eliminated this inconsistency.

The refactoring provided immediate benefits: change one value to adjust all responsive behavior simultaneously, semantic naming (twoPanelMobile) makes intent clear in component code, and new components automatically use the correct breakpoint by referencing the theme. This pattern extends beyond breakpoints—any value used in multiple places is a candidate for theme extraction."
        sectionTitle="Refactoring for Consistency"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Page Implementation Example"
        caption="Projects page using TwoPanelLayout and MobileDrawer"
        code={`import TwoPanelLayout from '../components/shared/TwoPanelLayout';
import MobileDrawer from '../components/shared/MobileDrawer';
import ProjectsMenu from '../components/projects/ProjectsMenu';
import ProjectPreviewPanel from '../components/projects/ProjectPreviewPanel';

const Projects = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  const selectedProject = projects.find(p => p.route === projectName);
  
  const menuContent = (
    <ProjectsMenu
      selectedRoute={projectName}
      onSelect={(route) => navigate(\`/projects/preview/\${route}\`)}
    />
  );
  
  return (
    <TwoPanelLayout
      leftPanel={menuContent}
      rightPanel={
        selectedProject ? (
          <ProjectPreviewPanel project={selectedProject} />
        ) : (
          <EmptyState>
            <EmptyStateText>
              Select a project to view its preview.
            </EmptyStateText>
          </EmptyState>
        )
      }
      mobileMenu={
        <MobileDrawer menuBackgroundColor="colors.contentsPanelBackground">
          {menuContent}
        </MobileDrawer>
      }
    />
  );
};

// Same menuContent used for desktop left panel and mobile drawer
// No duplication, single source of truth for menu structure
// TwoPanelLayout handles all responsive switching logic`}
      />

      <TextBlock
        text="The architecture follows Don't Repeat Yourself (DRY) principles aggressively. The same menuContent renders in both the desktop left panel and the mobile drawer—no duplication, no synchronization bugs. When a new project is added to the data array, it appears in both views automatically. When the ProjectsMenu component changes, both views update identically.

This demonstrates systematic thinking about code reuse: identify duplication (three pages with similar layouts), extract common patterns (TwoPanelLayout, MobileDrawer), parameterize differences (leftPanel, rightPanel, menuBackgroundColor), and establish conventions (theme breakpoints, consistent spacing). The result is less code to maintain, more consistent user experience, and faster development of future two-panel pages."
        sectionTitle="DRY Principles"
      />
    </Article>
  );
};

export default TwoPanelLayoutResponsive;

