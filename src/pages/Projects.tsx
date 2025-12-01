import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/article/NavBar';
import { projects } from '../data/projects';

// Layout Components (matching Immigration/Contact pattern)
const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
  padding-top: calc(64px + ${(props) => props.theme.spacing.xl});
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
  }
`;

// Typography Components (matching other pages)
const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  font-weight: 600;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
  margin: 0 0 ${(props) => props.theme.spacing['2xl']} 0;
  font-weight: 600;
`;

// Projects Grid
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing['2xl']};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Project Card (matching SectionCard style but as link)
const ProjectCard = styled(Link)`
  display: block;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.layers.layer2};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.xl};
  text-decoration: none;
  color: ${(props) => props.theme.colors.layers.layer11};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 4px 12px rgba(200, 90, 61, 0.2);
  }
`;

// Sparkle icon for "shiny" projects
const SparkleIcon = styled.span`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.fontSizes.xl};
  opacity: 0.7;
  animation: sparkle 2s ease-in-out infinite;

  @keyframes sparkle {
    0%, 100% { 
      opacity: 0.7; 
      transform: scale(1); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.1); 
    }
  }
`;

// Status Badge (matching checklist style)
const StatusBadge = styled.div<{ $status: 'complete' | 'in-progress' }>`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  background: ${(props) => 
    props.$status === 'complete' 
      ? props.theme.colors.layers.layer5 
      : props.theme.colors.accent};
  color: ${(props) => props.theme.colors.layers.layer11};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// Project Name (matching SectionTitle style)
const ProjectName = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
`;

// Project Tagline (matching Subtitle style)
const ProjectTagline = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  font-weight: 600;
`;

// Project Description (matching SectionText style)
const ProjectDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  opacity: 0.9;
`;

// Tags Container
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// Tag (subtle styling matching theme)
const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.layers.layer2};
  color: ${(props) => props.theme.colors.layers.layer11};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  opacity: 0.85;
`;

// Progress Container (matching Contact page style)
const ProgressContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.layers.layer11};
  opacity: 0.85;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.theme.colors.layers.layer2};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.accent},
    ${(props) => props.theme.colors.layers.layer5}
  );
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const Projects = () => {
  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <PageTitle>Projects</PageTitle>
        <Subtitle>Showcasing my work and growth</Subtitle>
        
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id} to={`/projects/${project.route}`}>
              <SparkleIcon>✨</SparkleIcon>
              <StatusBadge $status={project.status}>
                {project.status === 'complete' ? 'Complete' : 'In Progress'}
              </StatusBadge>
              <ProjectName>{project.name}</ProjectName>
              <ProjectTagline>{project.tagline}</ProjectTagline>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagsContainer>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
              {project.status === 'in-progress' && project.progress !== undefined && (
                <ProgressContainer>
                  <ProgressLabel>
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </ProgressLabel>
                  <ProgressBar>
                    <ProgressFill $progress={project.progress} />
                  </ProgressBar>
                </ProgressContainer>
              )}
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Projects;

