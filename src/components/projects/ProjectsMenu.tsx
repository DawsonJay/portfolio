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

const ProjectsMenu = () => {
  return (
    <MenuContainer>
      {projects.map((project) => (
        <ProjectMenuItem key={project.id} project={project} />
      ))}
    </MenuContainer>
  );
};

export default ProjectsMenu;
