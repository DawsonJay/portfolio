import TwoPanelLayout from '../components/shared/TwoPanelLayout';
import MobileDrawer from '../components/shared/MobileDrawer';
import ProjectsMenu from '../components/projects/ProjectsMenu';

const Projects = () => {
  const menuContent = <ProjectsMenu />;

  return (
    <TwoPanelLayout
      leftPanel={menuContent}
      rightPanel={
        <>
          {/* Preview content will be added in next stages */}
        </>
      }
      mobileMenu={
        <MobileDrawer menuBackgroundColor="colors.contentsPanelBackground">
          {menuContent}
        </MobileDrawer>
      }
    />
  );
};

export default Projects;

