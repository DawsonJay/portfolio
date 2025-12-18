import styled from 'styled-components';
import { projects } from '../../data/projects';
import ProjectMenuItem from './ProjectMenuItem';

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

interface ProjectsMenuProps {
  selectedRoute?: string;
  onSelect: (route: string) => void;
  onItemClick?: () => void;
}

const ProjectsMenu = ({ selectedRoute, onSelect, onItemClick }: ProjectsMenuProps) => {
  return (
    <MenuContainer>
      {projects.map((project) => (
        <ProjectMenuItem
          key={project.id}
          project={project}
          isSelected={project.route === selectedRoute}
          onSelect={() => {
            onSelect(project.route);
            onItemClick?.();
          }}
        />
      ))}
    </MenuContainer>
  );
};

export default ProjectsMenu;
