import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ArticleSystemAndContentOrg = () => {
  return (
    <Article>
      <TitleBlock title="Article System" />

      <TextBlock
        text="TL;DR: Reusable article blocks (TitleBlock, TextBlock, DemoBlock, CodeBlock) compose into full articles. ArticleBlock base component wraps content, registers section titles with ArticleNavigationContext, and positions titles in left margin using absolute positioning. Common pitfall: TextBlock uses text prop, not children."
        sectionTitle="Overview"
      />

      <TextBlock
        text="Project articles needed a consistent structure that enabled easy content authoring, automatic table of contents generation, and section navigation. The solution uses composition through specialized block components that share a common base: TitleBlock for article titles and major sections, TextBlock for body paragraphs with section titles, CodeBlock for syntax-highlighted code with captions, and DemoBlock for linking to demos and repositories.

All blocks except TitleBlock wrap their content in ArticleBlock, which provides two critical features: section title rendering in the left margin and registration with ArticleNavigationContext for table of contents. This separation of concerns means article authors work with semantic components (TextBlock, CodeBlock) while ArticleBlock handles the layout infrastructure invisibly."
        sectionTitle="Block Component Architecture"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="ArticleBlock Base Component"
        caption="Provides section titles and TOC registration"
        code={`import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ArticleNavigationContext } from './ArticleNavigationContext';

const BlockContainer = styled.div\`
  position: relative;
  margin-bottom: \${(props) => props.theme.spacing['2xl']};
\`;

const SectionTitle = styled.div\`
  position: absolute;
  top: 2px;
  right: 100%;        // Position to left of content
  margin-right: 16px; // Spacing from article edge
  width: 200px;       // Fixed width for alignment
  text-align: right;
  white-space: nowrap;
  font-family: \${(props) => props.theme.fonts.body};
  color: \${(props) => props.theme.colors.layers.layer11};
  font-size: \${(props) => props.theme.fontSizes.base};
\`;

interface ArticleBlockProps {
  children: ReactNode;
  sectionTitle?: string;
}

const ArticleBlock = ({ children, sectionTitle }: ArticleBlockProps) => {
  const { registerSection } = useContext(ArticleNavigationContext);
  
  // Register section for table of contents
  useEffect(() => {
    if (sectionTitle) {
      registerSection(sectionTitle);
      return () => unregisterSection(sectionTitle);
    }
  }, [sectionTitle, registerSection]);
  
  return (
    <BlockContainer>
      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
      {children}
    </BlockContainer>
  );
};`}
      />

      <TextBlock
        text="TextBlock is the workhorse component for body content. It accepts a text prop (not children—this is a common mistake) and an optional sectionTitle prop. The text is rendered in a styled paragraph with responsive font sizing, line height for readability, and theme-appropriate colors. TextBlock handles paragraphs with line breaks by preserving whitespace through white-space: pre-line CSS, allowing multi-paragraph content in a single block when semantically appropriate.

The critical implementation detail: TextBlock must pass sectionTitle to ArticleBlock, not use it directly. This ensures consistent section title styling and TOC registration across all block types. New article authors commonly try to use TextBlock with children (<TextBlock>Some text</TextBlock>) instead of the text prop—this causes silent rendering failures because the component expects a text string prop."
        sectionTitle="TextBlock Implementation"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="TextBlock API"
        caption="Takes text prop, not children—common mistake"
        code={`import ArticleBlock from './ArticleBlock';
import styled from 'styled-components';

const StyledText = styled.p\`
  font-family: \${(props) => props.theme.fonts.body};
  font-size: \${(props) => props.theme.fontSizes.base};
  line-height: 1.65;
  color: \${(props) => props.theme.colors.layers.layer11};
  margin: 0;
  white-space: pre-line; // Preserves line breaks for multi-paragraph
\`;

interface TextBlockProps {
  text: string;          // NOT children—this is critical
  sectionTitle?: string;
}

const TextBlock = ({ text, sectionTitle }: TextBlockProps) => {
  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <StyledText>{text}</StyledText>
    </ArticleBlock>
  );
};

// Correct usage:
<TextBlock 
  text="This is body content for the article section."
  sectionTitle="Section Name"
/>

// INCORRECT (will not render):
<TextBlock sectionTitle="Section Name">
  This will not appear because TextBlock expects text prop
</TextBlock>`}
      />

      <TextBlock
        text="CodeBlock wraps react-syntax-highlighter to provide syntax-highlighted code examples with language-specific formatting. It accepts code (the string to display), language (determines syntax highlighting rules), sectionTitle (for TOC registration), and an optional caption. The component uses the vsc-dark-plus theme to match VSCode's appearance, includes a copy-to-clipboard button, and supports Python, TypeScript, JavaScript, SQL, Bash, C++, and JSON.

The code string is displayed as-is without modification—no escaping, no line number injection, no whitespace manipulation. This makes it easy to copy real working code from the project and paste it directly into the code prop. The caption appears below the code block in a smaller, subdued font, providing context without cluttering the code itself."
        sectionTitle="CodeBlock for Examples"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="CodeBlock Implementation"
        caption="Wraps react-syntax-highlighter with copy functionality"
        code={`import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
// ... register other languages
import ArticleBlock from './ArticleBlock';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('typescript', typescript);
// ... register others

interface CodeBlockProps {
  code: string;
  language: 'python' | 'typescript' | 'javascript' | 'sql' | 'bash' | 'cpp' | 'json';
  sectionTitle?: string;
  caption?: string;
}

const CodeBlock = ({ code, language, sectionTitle, caption }: CodeBlockProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    // Show copy confirmation UI
  };
  
  return (
    <ArticleBlock sectionTitle={sectionTitle}>
      <CodeContainer>
        <CopyButton onClick={handleCopy}>Copy</CopyButton>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '8px',
            fontSize: '0.9rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
        {caption && <Caption>{caption}</Caption>}
      </CodeContainer>
    </ArticleBlock>
  );
};`}
      />

      <TextBlock
        text="DemoBlock provides a structured way to link to live demos, source code repositories, and other project resources. It consists of a text section explaining what's available and a button section with styled links that open in new tabs. Each demo has a label (displayed on the button) and a URL. The buttons use the same visual style as the 'Read on' button in project previews, maintaining consistency across the site.

A key lesson from implementing demo articles: only include resources that actually exist and are publicly accessible. Early versions mentioned 'photo galleries' or 'detailed documentation' that weren't actually linked, creating user confusion. The rule became simple—if you can't provide a working URL, don't mention the resource in a DemoBlock."
        sectionTitle="DemoBlock for Resources"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="DemoBlock Component"
        caption="Links to demos, repositories, and other resources"
        code={`import styled from 'styled-components';
import ArticleBlock from './ArticleBlock';

const DemoButton = styled.a\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: \${(props) => props.theme.spacing.md} \${(props) => props.theme.spacing.xl};
  border-radius: 10px;
  background-color: \${(props) => props.theme.colors.layers.layer2};
  color: \${(props) => props.theme.colors.layers.layer11};
  font-family: \${(props) => props.theme.fonts.body};
  font-weight: 600;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    background-color: \${(props) => props.theme.colors.layers.layer3};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }
\`;

const ButtonContainer = styled.div\`
  display: flex;
  gap: \${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: \${(props) => props.theme.spacing['2xl']}; // Spacing between sections
\`;

interface Demo {
  label: string;
  url: string;
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
};`}
      />

      <TextBlock
        text="The ArticleNavigationContext provides centralized state management for the table of contents. Components register their section titles during mount and unregister during unmount, building a dynamic list. The ContentsMenu component subscribes to this context and renders clickable links, enabling users to jump to specific sections. This architecture means adding a new block type automatically gains TOC integration—just ensure it passes sectionTitle to ArticleBlock.

The entire system composes elegantly: Article wraps everything and provides ArticleNavigationContext, block components (TextBlock, CodeBlock, DemoBlock) handle their specific content types and pass sectionTitle to ArticleBlock, ArticleBlock renders section titles and registers with context, and ContentsMenu reads the context and renders the TOC. Each component has a single responsibility, making the system easy to extend and maintain."
        sectionTitle="Table of Contents Integration"
      />
    </Article>
  );
};

export default ArticleSystemAndContentOrg;

