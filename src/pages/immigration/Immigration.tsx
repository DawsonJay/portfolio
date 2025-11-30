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
        <PageTitle>Immigration Plan</PageTitle>
        <Subtitle>18 months in. One step left.</Subtitle>

        <SectionCard>
          <SectionTitle>The Plan</SectionTitle>
          <SectionText>
            I'm immigrating to Canada through Express Entry, the skilled worker immigration program. The process requires three things: passing an English language test, getting educational credentials assessed, and securing a job offer from a Canadian employer. I've spent 18 months completing the first two steps. Now I'm looking for the job offer that will complete the application.
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
          <SectionTitle>What I've Already Completed</SectionTitle>
          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>IELTS 8.5 — December 2024</ChecklistTitle>
              <ChecklistDescription>
                Official English language test for Canadian immigration. Achieved overall band 8.5, with perfect 9.0 scores in Listening, Reading, and Speaking. CEFR Level C2.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>WES Assessment — March 2025</ChecklistTitle>
              <ChecklistDescription>
                World Education Services credential evaluation. Official confirmation of education for Canadian immigration requirements.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon $complete />
            <ChecklistContent>
              <ChecklistTitle>Valid Passport</ChecklistTitle>
              <ChecklistDescription>
                Current passport ready for travel and immigration processing.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>

          <ChecklistItem>
            <ChecklistIcon />
            <ChecklistContent>
              <ChecklistTitle>Job Offer — The Final Step</ChecklistTitle>
              <ChecklistDescription>
                The last piece needed to complete the Express Entry application. Finding the right team to join and contribute to in Canada.
              </ChecklistDescription>
            </ChecklistContent>
          </ChecklistItem>
        </SectionCard>

        <SectionCard>
          <SectionTitle>What's Left</SectionTitle>
          <SectionText>
            With a job offer I can submit my Express Entry application. After that comes a lot of activity for me finding a place to live and moving, but through all of that I'll be able to work remotely, providing value from day one.
          </SectionText>
        </SectionCard>

        <CTASection>
          <CTATitle>Let's Make This Happen</CTATitle>
          <CTAText>
            Everything's in place. Ready to bring me on board?
          </CTAText>
          <CTAButton to="/contact">Make an Offer</CTAButton>
        </CTASection>
      </ContentContainer>
    </PageContainer>
  );
};

export default Immigration;
