import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { type Project } from '../../data/projects';
import { getTechnologyIcons } from '../../utils/technologyIcons';

const PreviewContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(props) => props.theme.spacing.xl};
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fonts.body};

  @media (max-width: 600px) {
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0;
  text-align: center;
`;

const IconsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
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
  font-size: 22px;
`;

const Description = styled.div`
  max-width: 900px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.layers.layer11};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.65;
`;

const ProgressRow = styled.div`
  max-width: 900px;
  margin: 0 auto ${(props) => props.theme.spacing.xl} auto;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.xs} 0;
`;

const ProgressFill = styled.div<{ $percent: number; $cancelled?: boolean }>`
  height: 100%;
  width: ${(props) => props.$cancelled ? '100%' : `${Math.max(0, Math.min(100, props.$percent))}%`};
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 999px;
  transition: width 0.25s ease;
  
  ${(props) => props.$cancelled && `
    background: repeating-linear-gradient(
      45deg,
      ${props.theme.colors.layers.layer11},
      ${props.theme.colors.layers.layer11} 8px,
      transparent 8px,
      transparent 16px
    );
    opacity: 0.6;
  `}
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 12px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.14);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
`;

const ProgressPercent = styled.div`
  min-width: 80px;
  text-align: right;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
`;

const Paragraph = styled.p`
  margin: 0;

  & + & {
    margin-top: ${(props) => props.theme.spacing.lg};
  }
`;

const ReadOnContainer = styled.div`
  max-width: 900px;
  margin: ${(props) => props.theme.spacing['2xl']} auto 0 auto;
  display: flex;
  justify-content: flex-end;
  padding-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: 600px) {
    padding-bottom: ${(props) => props.theme.spacing['2xl']};
  }
`;

const ReadOnButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.layers.layer2};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 600;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.layers.layer3};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.layers.layer11};
    outline-offset: 3px;
  }
`;

interface ProjectPreviewPanelProps {
  project: Project;
}

const ProjectPreviewPanel = ({ project }: ProjectPreviewPanelProps) => {
  const technologyIconGroups = getTechnologyIcons(project.tags);
  const progress = project.status === 'complete' ? 100 : (project.progress ?? 0);
  const isCancelled = project.status === 'cancelled';
  const paragraphs = project.previewDescription
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PreviewContainer>
      <Title>{project.name}</Title>

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

      <ProgressRow aria-label={isCancelled ? "Project status" : "Project progress"}>
        <ProgressTrack role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <ProgressFill $percent={progress} $cancelled={isCancelled} />
        </ProgressTrack>
        <ProgressPercent>{isCancelled ? 'cancelled' : `${progress}%`}</ProgressPercent>
      </ProgressRow>

      <Description>
        {paragraphs.map((text) => (
          <Paragraph key={text}>{text}</Paragraph>
        ))}
      </Description>

      <ReadOnContainer>
        <ReadOnButton to={`/projects/${project.route}`}>Read on</ReadOnButton>
      </ReadOnContainer>
    </PreviewContainer>
  );
};

export default ProjectPreviewPanel;

