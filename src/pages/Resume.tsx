import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';
import NavBar from '../components/article/NavBar';

const ResumeContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.layers.layer1};
  padding: ${(props) => props.theme.spacing['2xl']} ${(props) => props.theme.spacing.lg};
  padding-top: calc(64px + ${(props) => props.theme.spacing['2xl']});

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes['2xl']};
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.layers.layer2};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.base};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.layers.layer3};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.layers.layer11};
    outline-offset: 3px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PDFViewerContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.layers.layer1};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: calc(100vh - 200px);
  border: none;
  display: block;

  @media (max-width: 768px) {
    height: calc(100vh - 250px);
  }
`;

const FallbackMessage = styled.div`
  padding: ${(props) => props.theme.spacing['2xl']};
  text-align: center;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer9};

  p {
    margin-bottom: ${(props) => props.theme.spacing.lg};
    font-size: ${(props) => props.theme.fontSizes.lg};
  }

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.xl};
  }
`;

const MobileMessage = styled.div`
  display: none;
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.layers.layer2};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer10};
  text-align: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Resume = () => {
  return (
    <>
      <NavBar />
      <ResumeContainer>
      <ContentWrapper>
        <Header>
          <Title>Resume</Title>
          <DownloadButton 
            href="/james-dawson-cv.pdf" 
            download="James-Dawson-Resume.pdf"
            aria-label="Download resume as PDF"
          >
            <FiDownload />
            Download PDF
          </DownloadButton>
        </Header>

        <MobileMessage>
          PDF viewing may not work on all mobile devices. Use the download button above to view the full resume.
        </MobileMessage>

        <PDFViewerContainer>
          <PDFViewer
            src="/james-dawson-cv.pdf#view=FitH"
            title="James Dawson Resume"
            aria-label="Resume PDF viewer"
          />
        </PDFViewerContainer>

        <FallbackMessage>
          <p>
            If the resume doesn't display above, your browser may not support embedded PDFs.
          </p>
          <DownloadButton 
            href="/james-dawson-cv.pdf" 
            download="James-Dawson-Resume.pdf"
          >
            <FiDownload />
            Download Resume
          </DownloadButton>
        </FallbackMessage>
      </ContentWrapper>
    </ResumeContainer>
    </>
  );
};

export default Resume;

