import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const RouteDrivenPreviewSystem = () => {
  return (
    <Article>
      <TitleBlock title="Route-Driven Previews" />

      <TextBlock
        text="URL as state makes previews bookmarkable and shareable at /projects/preview/:projectName. useParams hook drives UI from route parameters. NavBar highlights when pathname starts with path (not just exact match), and active items remain clickable to navigate back to base routes. Mobile drawer closes automatically when project selected."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The Projects page needed a way for users to see project details before committing to the full article page. The initial design showed a static placeholder when no project was selected, but clicking a project should show a preview panel on the right with comprehensive information: project title formatted as 'The X Project', technology icons grouped by category, progress bar with percentage, three-paragraph description, and a 'Read on' button linking to the full article page.

The key architectural decision was using the URL to drive this state rather than React component state. Routes became /projects (empty state), /projects/preview/:projectName (preview showing), and /projects/:projectName (full article page). This makes previews bookmarkable—users can link directly to /projects/preview/what-now—and shareable, with the URL accurately reflecting application state. It also enables browser back/forward navigation to work intuitively."
        sectionTitle="URL as Application State"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Route Structure in App.tsx"
        caption="Nested routes with explicit preview segment"
        code={`import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Project from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/preview/:projectName" element={<Projects />} />
        <Route path="/projects/:projectName" element={<Project />} />
        <Route path="/resume" element={<Resume />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

// React Router v6 prioritizes more specific routes first
// /projects/preview/:projectName matches before /projects/:projectName
// The explicit "preview" segment avoids route conflicts`}
      />

      <TextBlock
        text="The Projects page component uses useParams to extract the projectName from the URL, finds the matching project from the data array, and conditionally renders either the preview panel or an empty state message. The useNavigate hook provides programmatic navigation when users click menu items, pushing new routes to /projects/preview/:projectName. This pattern separates routing logic (useParams, useNavigate) from UI rendering (preview panel, menu items), making both testable independently.

The ProjectsMenu component accepts selectedRoute and onSelect props, making it unaware of routing implementation details. It simply calls onSelect(route) when a project is clicked, and the parent Projects component handles the navigation. This separation means ProjectsMenu could theoretically work with a different routing system or no routing at all—it's just a controlled component that reports user actions."
        sectionTitle="useParams for Route-Driven UI"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Projects Page Implementation"
        caption="Extract route parameter and drive UI state"
        code={`import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectsMenu from '../components/projects/ProjectsMenu';
import ProjectPreviewPanel from '../components/projects/ProjectPreviewPanel';

const Projects = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  
  // Find project matching route parameter
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
              Select a project on the left to view its preview.
            </EmptyStateText>
          </EmptyState>
        )
      }
      mobileMenu={<MobileDrawer>{menuContent}</MobileDrawer>}
    />
  );
};

// The menu items don't know about routing—they just call onSelect
// The Projects component translates onSelect calls into navigate() calls`}
      />

      <TextBlock
        text="The NavBar needed enhancement to work well with nested routes. Originally it only highlighted items for exact path matches—visiting /projects/preview/what-now left 'Projects' unhighlighted even though you're conceptually still in the projects section. The solution checks if the current pathname starts with the item's path (plus a trailing slash), making /projects highlight for any route beginning with /projects/.

The home route requires special handling because every path technically starts with '/', so it only highlights for exact matches. This creates intuitive behavior: Projects highlights for /projects, /projects/preview/what-now, and /projects/what-now. About highlights for /about and /about/anything. Home only highlights when you're exactly on /."
        sectionTitle="NavBar Route Highlighting"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="isActive Logic"
        caption="Highlight items when pathname starts with path"
        code={`import { useLocation, Link } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    // Home route: exact match only
    if (path === '/') {
      return location.pathname === '/';
    }
    
    // Other routes: match if pathname starts with path
    // This allows /projects to highlight for:
    //   - /projects (exact)
    //   - /projects/preview/what-now (nested preview)
    //   - /projects/what-now (article page)
    return location.pathname === path || 
           location.pathname.startsWith(path + '/');
  };
  
  return (
    <NavBarContainer>
      <LeftLinks>
        {isActive('/') ? (
          <ActiveNavLink to="/">Home</ActiveNavLink>
        ) : (
          <NavLink to="/">Home</NavLink>
        )}
        {isActive('/projects') ? (
          <ActiveNavLink to="/projects">Projects</ActiveNavLink>
        ) : (
          <NavLink to="/projects">Projects</NavLink>
        )}
        {/* ... other nav items */}
      </LeftLinks>
    </NavBarContainer>
  );
};`}
      />

      <TextBlock
        text="A subtle but important UX improvement: active navigation items remain clickable. Users can click 'Projects' from /projects/preview/what-now to return to /projects, or click 'Home' from any subpage to return to the homepage. This required changing ActiveNavLink from a span element to a Link component—a small change that significantly improves navigation discoverability.

The mobile drawer integration required ensuring the menu closes when a project is selected. ProjectsMenu accepts an optional onItemClick prop that gets called alongside onSelect, and MobileDrawer provides this callback to close itself. This creates a clean data flow: user clicks item → onSelect navigates to new route → onItemClick closes drawer → user sees the new preview content. The mobile drawer also automatically closes when clicking its backdrop (the semi-transparent overlay), providing two intuitive ways to dismiss it."
        sectionTitle="Clickable Active Items"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="Mobile Drawer Integration"
        caption="Closes automatically when projects selected"
        code={`const MobileDrawer = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleItemClick = () => {
    setIsOpen(false);  // Close drawer
  };
  
  return (
    <MobileDrawerContainer $isOpen={isOpen}>
      <MobileBarContainer onClick={() => setIsOpen(!isOpen)}>
        <CaretIcon $isOpen={isOpen} viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </CaretIcon>
      </MobileBarContainer>
      <MenuPanel onClick={(e) => {
        // Close if clicking backdrop, not menu content
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}>
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, 
              { onItemClick: handleItemClick })
          : children}
      </MenuPanel>
    </MobileDrawerContainer>
  );
};

// ProjectsMenu receives onItemClick via props cloning
// When a project is clicked:
//   1. onSelect(route) navigates to new preview
//   2. onItemClick() closes the drawer
//   3. User sees the preview panel on their mobile device`}
      />

      <TextBlock
        text="This architecture demonstrates several React Router best practices: using URL parameters for shareable state, extracting route logic to hook level (useParams, useNavigate), keeping components routing-agnostic through props, and handling nested routes with explicit segments. The pattern scales well—adding more preview features or route parameters doesn't require refactoring the component structure."
        sectionTitle="Architectural Benefits"
      />
    </Article>
  );
};

export default RouteDrivenPreviewSystem;

