import React from 'react';
import styled from 'styled-components';
import { type Project } from '../../data/projects';
import { getTechnologyIcons } from '../../utils/technologyIcons';

const MenuItemContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.layers.layer2};
  box-sizing: border-box;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.layers.layer1};
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const ProjectTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0;
  text-align: center;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const Separator = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${(props) => props.theme.colors.layers.layer2};
  flex-shrink: 0;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Tooltip styling */
  &::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: ${(props) => props.theme.spacing.xs};
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
    background-color: ${(props) => props.theme.colors.layers.layer1};
    color: ${(props) => props.theme.colors.layers.layer11};
    font-family: ${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.xs};
    white-space: nowrap;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: calc(${(props) => props.theme.spacing.xs} - 4px);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${(props) => props.theme.colors.layers.layer1};
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 1000;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.layers.layer11};
  font-size: 20px;
`;

const ProgressBox = styled.div`
  height: 100%;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.md};
  box-sizing: border-box;
`;

const PercentageText = styled.div`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0;
`;

const CompleteText = styled.div`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.colors.layers.layer8};
  margin: 0;
  margin-top: ${(props) => props.theme.spacing.xs};
`;

interface ProjectMenuItemProps {
  project: Project;
}

const ProjectMenuItem = ({ project }: ProjectMenuItemProps) => {
  const technologyIconGroups = getTechnologyIcons(project.previewTags);
  const progress = project.status === 'complete' ? 100 : (project.progress || 0);

  return (
    <MenuItemContainer>
      <ContentSection>
        <ProjectTitle>The {project.name} Project</ProjectTitle>
        <IconsContainer>
          {technologyIconGroups.map((group, groupIndex) => (
            <React.Fragment key={group.category}>
              <IconGroup>
                {group.items.map(({ tag, icon }) => (
                  <IconWrapper key={tag} data-tooltip={tag}>
                    <Icon>{icon}</Icon>
                  </IconWrapper>
                ))}
              </IconGroup>
              {groupIndex < technologyIconGroups.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </IconsContainer>
      </ContentSection>
      <ProgressBox>
        <PercentageText>{progress}%</PercentageText>
        <CompleteText>complete</CompleteText>
      </ProgressBox>
    </MenuItemContainer>
  );
};

export default ProjectMenuItem;
