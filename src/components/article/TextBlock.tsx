import styled from 'styled-components';
import ArticleBlock from './ArticleBlock';

const TextBlockStyled = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
`;

interface TextBlockProps {
  text: string;
  sectionTitle?: string;
}

const TextBlock = ({ text, sectionTitle }: TextBlockProps) => {
  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <TextBlockStyled>{text}</TextBlockStyled>
    </ArticleBlock>
  );
};

TextBlock.displayName = 'TextBlock';

export default TextBlock;

