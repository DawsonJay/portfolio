import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TwoPanelLayout from '../components/shared/TwoPanelLayout';
import MobileDrawer from '../components/shared/MobileDrawer';
import ProjectsMenu from '../components/projects/ProjectsMenu';
import { projects } from '../data/projects';
import ProjectPreviewPanel from '../components/projects/ProjectPreviewPanel';

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl};
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
`;

const EmptyStateText = styled.div`
  max-width: 520px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: 1.5;
`;

const DesktopText = styled.span`
  display: inline;

  @media (max-width: ${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: none;
  }
`;

const MobileText = styled.span`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.twoPanelMobile}) {
    display: inline;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  const selectedProject = projects.find((p) => p.route === projectName);

  const menuContent = (
    <ProjectsMenu
      selectedRoute={projectName}
      onSelect={(route) => navigate(`/projects/preview/${route}`)}
    />
  );

  return (
    <TwoPanelLayout
      leftPanel={menuContent}
      rightPanel={
        <>
          {selectedProject ? (
            <ProjectPreviewPanel project={selectedProject} />
          ) : (
            <EmptyState>
              <EmptyStateText>
                <DesktopText>Select a project on the left to view its preview.</DesktopText>
                <MobileText>Select a project on the menu below to view it's preview.</MobileText>
              </EmptyStateText>
            </EmptyState>
          )}
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

