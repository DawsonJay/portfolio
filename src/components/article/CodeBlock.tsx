import { useState } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import ArticleBlock from './ArticleBlock';

const CodeContainer = styled.div`
  margin: 0 0 ${(props) => props.theme.spacing.xl} 0;
  position: relative;
`;

const CodeWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1e1e1e;
  border: 1px solid ${(props) => props.theme.colors.layers.layer2};
`;

const CopyButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing.sm};
  right: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.layers.layer2};
  color: ${(props) => props.theme.colors.layers.layer11};
  border: 1px solid ${(props) => props.theme.colors.layers.layer3};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 500;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: ${(props) => props.theme.colors.layers.layer3};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.layers.layer11};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Caption = styled.div`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.layers.layer9};
  margin-top: ${(props) => props.theme.spacing.sm};
  font-style: italic;
`;

interface CodeBlockProps {
  code: string;
  language: 'python' | 'typescript' | 'javascript' | 'sql' | 'bash' | 'cpp' | 'json';
  sectionTitle?: string;
  caption?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ 
  code, 
  language, 
  sectionTitle, 
  caption,
  showLineNumbers = false 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <CodeContainer>
        <CodeWrapper>
          <CopyButton onClick={handleCopy} aria-label="Copy code">
            {copied ? (
              <>
                <FiCheck />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FiCopy />
                <span>Copy</span>
              </>
            )}
          </CopyButton>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              background: '#1e1e1e',
            }}
            codeTagProps={{
              style: {
                fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace",
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </CodeWrapper>
        {caption && <Caption>{caption}</Caption>}
      </CodeContainer>
    </ArticleBlock>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;

