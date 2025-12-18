import styled from 'styled-components';
import ArticleBlock from './ArticleBlock';

const DescriptionText = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.xl} 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing['2xl']};
`;

const DemoButton = styled.a`
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

interface Demo {
  label: string;
  url: string;
  type?: 'github' | 'webapp' | 'docs' | 'video';
}

interface DemoBlockProps {
  text: string;
  demos: Demo[];
  sectionTitle?: string;
}

const DemoBlock = ({ text, demos, sectionTitle }: DemoBlockProps) => {
  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <DescriptionText>{text}</DescriptionText>
      <ButtonContainer>
        {demos.map((demo, index) => (
          <DemoButton
            key={index}
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {demo.label}
          </DemoButton>
        ))}
      </ButtonContainer>
    </ArticleBlock>
  );
};

DemoBlock.displayName = 'DemoBlock';

export default DemoBlock;

