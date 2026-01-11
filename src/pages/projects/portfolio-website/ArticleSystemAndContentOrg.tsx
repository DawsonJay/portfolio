import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ArticleSystemAndContentOrg = () => {
  return (
    <Article>
      <TitleBlock title="Article System" />

      <TextBlock
        text="I created reusable article blocks (TitleBlock, TextBlock, DemoBlock, CodeBlock) that compose into full articles. The ArticleBlock base component wraps content, registers section titles with ArticleNavigationContext, and positions titles in left margin using absolute positioning. Common pitfall: TextBlock uses text prop, not children."
        sectionTitle="Overview"
      />

      <TextBlock
        text="Project articles needed a consistent structure that enabled easy content authoring, automatic table of contents generation, and section navigation. I solved this with composition through specialized block components that share a common base: TitleBlock for article titles and major sections, TextBlock for body paragraphs with section titles, CodeBlock for syntax-highlighted code with captions, and DemoBlock for linking to demos and repositories.

All blocks except TitleBlock wrap their content in ArticleBlock, which provides two critical features: section title rendering in the left margin and registration with ArticleNavigationContext for table of contents. This separation means I work with semantic components (TextBlock, CodeBlock) while ArticleBlock handles the layout infrastructure invisibly."
        sectionTitle="Block Architecture"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="ArticleBlock Base"
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
  
  // Register this section for table of contents
  useEffect(() => {
    if (sectionTitle) {
      registerSection({ title: sectionTitle, id: sectionTitle });
    }
  }, [sectionTitle, registerSection]);
  
  return (
    <BlockContainer id={sectionTitle}>
      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
      {children}
    </BlockContainer>
  );
};`}
      />

      <TextBlock
        text="The ArticleNavigationContext manages the table of contents state across the entire article. As each ArticleBlock mounts, it registers its section title with the context. The ContentsPanel component (table of contents sidebar) subscribes to this context and renders links for all registered sections. Clicking a link scrolls to that section using smooth scroll behavior. This architecture keeps article content declarative—you write TextBlocks with sectionTitles, and the table of contents appears automatically."
        sectionTitle="Navigation Context"
      />

      <TextBlock
        text="TextBlock has a common pitfall I've run into multiple times: it uses a text prop, not children. This is because I want to keep the component API simple and enforce a specific content structure. Children would allow arbitrary nesting, making it harder to maintain consistent styling. The text prop forces content to be a simple string, which gets wrapped in consistent paragraph styling."
        sectionTitle="TextBlock API"
      />

      <CodeBlock
        language="typescript"
        sectionTitle="TextBlock Usage"
        caption="Correct and incorrect usage patterns"
        code={`// ✅ CORRECT: Use text prop
<TextBlock 
  text="This is the correct way to use TextBlock. Pass content as a string to the text prop."
  sectionTitle="Section Name"
/>

// ❌ WRONG: Using children won't work
<TextBlock sectionTitle="Section Name">
  This won't render because TextBlock doesn't accept children.
</TextBlock>

// ❌ WRONG: Forgetting sectionTitle means no TOC entry
<TextBlock 
  text="Without a sectionTitle, this text won't appear in the table of contents."
/>

// ✅ CORRECT: Multiple paragraphs with newlines
<TextBlock 
  text="First paragraph with some content.

Second paragraph separated by a blank line. TextBlock handles the paragraph breaks automatically."
  sectionTitle="Multi-Paragraph Content"
/>`}
      />

      <TextBlock
        text="CodeBlock wraps code with syntax highlighting via react-syntax-highlighter. I chose Prism as the syntax highlighting engine for its wide language support and reasonable bundle size. The component accepts a language prop (typescript, python, javascript, etc.), code string, optional caption, and optional sectionTitle for TOC inclusion. A copy button in the top-right corner lets users copy code to clipboard—a small UX detail that significantly improves usability."
        sectionTitle="CodeBlock Component"
      />

      <TextBlock
        text="DemoBlock renders links to demos, repositories, or resources. It accepts a demos array where each item has a label, URL, and optional type (github, webapp, docs, video). The type hint enables icon styling—GitHub links show an octocat icon, webapp links show a globe icon. This component solves a specific problem: consistently presenting external resources across all articles without duplicating link styling and icon logic."
        sectionTitle="DemoBlock Component"
      />

      <TextBlock
        text="The block component system demonstrates composition over inheritance—instead of a complex base class with multiple inheritance levels, I have simple components that compose together. Each block does one thing well: TitleBlock renders titles, TextBlock renders text, CodeBlock renders code, DemoBlock renders links. ArticleBlock provides the shared infrastructure (section titles, TOC registration) through composition. This makes the system easy to understand and extend."
        sectionTitle="Composition Pattern"
      />
    </Article>
  );
};

export default ArticleSystemAndContentOrg;
