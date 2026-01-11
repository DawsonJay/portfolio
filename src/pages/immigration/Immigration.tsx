import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../../components/article/NavBar';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ContentContainer = styled.div`
  max-width: 800px;
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

const SectionCard = styled.section`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.layers.layer2};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
`;

const ChecklistItem = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.layers.layer2};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ChecklistIcon = styled.div<{ $complete?: boolean }>`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: bold;
  background: ${(props) => 
    props.$complete 
      ? props.theme.colors.accent 
      : 'transparent'};
  border: 2px solid ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.surface};
  
  &::after {
    content: '${(props) => (props.$complete ? '✓' : '')}';
  }
`;

const ChecklistContent = styled.div`
  flex: 1;
`;

const ChecklistTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
`;

const ChecklistDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.6;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0;
  opacity: 0.85;
`;

const CTASection = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing['2xl']};
  margin-top: ${(props) => props.theme.spacing['2xl']};
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.layers.layer2}30, 
    ${(props) => props.theme.colors.layers.layer3}20);
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.colors.accent};
`;

const CTATitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
`;

const CTAText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.6;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => props.theme.colors.accent};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 90, 61, 0.4);
  }
`;

const SectionText = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
`;

const Immigration = () => {
  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <PageTitle>Immigration Status</PageTitle>
        <Subtitle>Working Holiday Visa approved. Ready to work in Canada.</Subtitle>

        <SectionCard>
          <SectionTitle>My Status</SectionTitle>
          <SectionText>
            I have a Working Holiday Visa for Canada, valid for two years. This means I can work immediately—no sponsorship required, no job offer needed for the visa itself. I'm looking for the right opportunity to join a Canadian team, build financial security, and establish myself in the country. After working for a year, I'll apply for permanent residency and continue building my career in Canada long-term.
          </SectionText>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Why Canada</SectionTitle>
          <SectionText>
            I grew up in England, where we have few truly wild places. Canada has what I'm looking for—great forests and lakes and glaciers, moose and arctic foxes and auroras. The kind of landscapes where you feel your connection to the world. But it's not just the wilderness. There's a deep respect for the land in Canadian culture, and many of its industries are connected to it—developing eco solutions, marine exploration, green energy. That alignment between environmental values and practical work is what I'm drawn to. I want to work on technology that helps restore humanity's relationship with the world, and Canada takes that seriously.
          </SectionText>
          <SectionText>
            I want to contribute to those industries as a way to give back to both Canada and the planet. When I imagine my life there, I see myself hiking the long-running trails, joining climbing clubs, maybe getting back into kayaking like I did in my teens. Building a new circle of friends and learning about Canadian culture through them. I want to build a life there, not just work there—roots in a place I can actually connect with.
          </SectionText>
        </SectionCard>

        <SectionCard>
          <SectionTitle>What This Means for Employers</SectionTitle>
          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>No Sponsorship Required</ChecklistTitle>
              <ChecklistDescription>
                I already have work authorization through my Working Holiday Visa. You don't need to sponsor me or navigate immigration paperwork—I can start working immediately.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>Flexible Location</ChecklistTitle>
              <ChecklistDescription>
                I'm open to relocating anywhere in Canada. Once I have a job offer, I'll move to wherever the role needs me—whether that's Vancouver, Toronto, Montreal, or anywhere else.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>Long-Term Commitment</ChecklistTitle>
              <ChecklistDescription>
                My plan is to work for a year, then apply for permanent residency. I'm looking for a role I can grow into long-term, not a temporary position. I want to build my career in Canada.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>Ready to Start</ChecklistTitle>
              <ChecklistDescription>
                I can begin working as soon as I have an offer. I'll handle my own relocation and setup—you just get a committed team member ready to contribute from day one.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>
        </SectionCard>

        <SectionCard>
          <SectionTitle>My Path Forward</SectionTitle>
          <SectionText>
            I'm looking for a job offer that gives me financial security and the chance to prove my value. Once I'm settled and working, I'll apply for permanent residency after a year. This isn't a short-term plan—I'm committed to building my life and career in Canada. The Working Holiday Visa is just the first step.
          </SectionText>
        </SectionCard>

        <CTASection>
          <CTATitle>Ready to Work in Canada</CTATitle>
          <CTAText>
            I have work authorization and I'm ready to start. No sponsorship needed—just the right opportunity.
          </CTAText>
          <CTAButton to="/contact">Get in Touch</CTAButton>
        </CTASection>
      </ContentContainer>
    </PageContainer>
  );
};

export default Immigration;
