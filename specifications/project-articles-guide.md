# Project Articles Guide

**Version:** 1.0  
**Date:** December 18, 2025  
**Purpose:** Comprehensive guide for adding new projects and creating project articles

---

## Overview

This guide documents the patterns, requirements, and best practices for adding new projects to the portfolio and creating their associated articles. It captures lessons learned from implementing WhatNow, Atlantis, Lunascope, and Nexus projects.

---

## 1. Adding a New Project

### Project Data Location

All projects are defined in **`src/data/projects.ts`**

### Project Interface

```typescript
export interface Project {
  id: string;                    // Unique identifier (lowercase-with-hyphens)
  name: string;                  // Display name (e.g., "WhatNow")
  tagline: string;               // Brief tagline (e.g., "AI Recommendation System")
  description: string;           // Short description for project card
  previewDescription: string;    // 3-paragraph detailed preview (see guidelines)
  route: string;                 // URL route (e.g., "what-now")
  status: 'complete' | 'in-progress';
  progress?: number;             // 0-100, required if status is 'in-progress'
  tags: string[];                // Full list of all technologies
  previewTags: string[];         // Most important tags for menu (max 7)
  category: 'ai-ml' | 'robotics' | 'hardware' | 'enterprise';
}
```

### Writing Preview Descriptions

Preview descriptions should be **exactly 3 paragraphs**:

1. **What it is**: Technical overview, architecture, and current state
2. **Why you started it**: Problem it solves, motivation, goals
3. **What it demonstrates**: Skills, problem-solving approach, portfolio value

**Example structure:**

```typescript
previewDescription:
  'First paragraph: Technical description of what the project is and does. Include architecture, technologies, and current state. Be specific about capabilities.\n\n' +
  'Second paragraph: Why you started this project. What problem were you solving? What motivated you? What were your goals?\n\n' +
  'Third paragraph: What this demonstrates. Skills shown, problem-solving approach, key decisions, portfolio value. Focus on growth and learning.'
```

### Tag Selection

- **Full tags list**: Include ALL technologies used
- **Preview tags**: 7 most important/impressive tags for menu display
- Available tags are defined in `src/utils/technologyIcons.tsx`
- Tags automatically get icons if mapped in technologyIcons

---

## 2. Project Article Architecture

### Directory Structure

```
src/pages/projects/{project-name}/
├── {ProjectName}.tsx           # Main project file (imports all articles)
├── Article1.tsx                # Individual article files
├── Article2.tsx
├── Article3.tsx
├── Article4.tsx
├── Article5.tsx
└── Demos.tsx                   # Demos article (if applicable, always last)
```

### Naming Conventions

- **Directory**: lowercase-with-hyphens matching `route` field (e.g., `what-now/`)
- **Main file**: PascalCase matching project name (e.g., `WhatNow.tsx`)
- **Article files**: PascalCase matching article concept (e.g., `TwoLayerLearning.tsx`)
- **Route parameter**: Uses `route` field from project data

### Main Project File Pattern

```tsx
import ArticleReader from '../../../components/article/ArticleReader';
import Article1 from './Article1';
import Article2 from './Article2';
import Article3 from './Article3';
import Article4 from './Article4';
import Article5 from './Article5';
import Demos from './Demos';

const ProjectName = () => {
  return (
    <ArticleReader>
      <Article1 />
      <Article2 />
      <Article3 />
      <Article4 />
      <Article5 />
      <Demos />
    </ArticleReader>
  );
};

export default ProjectName;
```

### Registering Project Route

Update `src/pages/Project.tsx`:

```tsx
import ProjectName from './projects/project-name/ProjectName';

const Project = () => {
  const { projectName } = useParams<{ projectName: string }>();

  switch (projectName) {
    case 'what-now':
      return <WhatNow />;
    case 'project-name':  // Add new case
      return <ProjectName />;
    // ... other cases
    default:
      return <div>Project not found</div>;
  }
};
```

---

## 3. Article Components Reference

### Article Component

Wrapper for all article content.

```tsx
import Article from '../../../components/article/Article';

const MyArticle = () => {
  return (
    <Article>
      {/* Article content goes here */}
    </Article>
  );
};
```

### TitleBlock Component

Renders article title (h1) and optional subtitle.

**Props:**
- `title: string` (required) - Main article title
- `subtitle?: string` (optional) - Subtitle text
- `sectionTitle?: string` (optional) - Section title for table of contents

**Usage:**

```tsx
import TitleBlock from '../../../components/article/TitleBlock';

// Simple title
<TitleBlock title="Article Title" />

// With subtitle
<TitleBlock 
  title="Foundation Block Architecture"
  subtitle="Building an atomic design system for enterprise dashboards"
/>
```

### TextBlock Component

Renders text content with section title for table of contents.

**Props:**
- `text: string` (required) - The text content
- `sectionTitle?: string` (required for TOC) - Section title

**⚠️ CRITICAL: TextBlock uses the `text` PROP, NOT children!**

```tsx
import TextBlock from '../../../components/article/TextBlock';

// ✅ CORRECT - Use text prop
<TextBlock 
  text="Your content here. Can be multiple sentences or paragraphs."
  sectionTitle="Section Name"
/>

// ❌ WRONG - Do NOT use children
<TextBlock>
  Your content here
</TextBlock>

// ❌ WRONG - No sectionTitle means no table of contents
<TextBlock 
  text="Your content here"
/>
```

**Every TextBlock must have a `sectionTitle` for the table of contents to work!**

### DemoBlock Component

Renders description text and demo/resource buttons.

**Props:**
- `text: string` (required) - Description text
- `demos: Demo[]` (required) - Array of demo links
- `sectionTitle?: string` (optional) - Section title for TOC

**Demo interface:**

```typescript
interface Demo {
  label: string;                              // Button text
  url: string;                                // Link URL
  type?: 'github' | 'webapp' | 'docs' | 'video';  // Optional type hint
}
```

**Usage:**

```tsx
import DemoBlock from '../../../components/article/DemoBlock';

<DemoBlock
  sectionTitle="Live Application"
  text="Description of what users can access through these links."
  demos={[
    {
      label: 'Live App',
      url: 'https://app.example.com',
      type: 'webapp',
    },
    {
      label: 'GitHub Repository',
      url: 'https://github.com/username/repo',
      type: 'github',
    },
  ]}
/>
```

**Important:** Bottom margin automatically added for spacing between sections.

### CodeBlock Component

Renders syntax-highlighted code with copy functionality.

**Props:**
- `code: string` (required) - The code to display
- `language: 'python' | 'typescript' | 'javascript' | 'sql' | 'bash' | 'cpp' | 'json'` (required) - Language for syntax highlighting
- `sectionTitle?: string` (optional) - Section title for TOC
- `caption?: string` (optional) - Caption text below code block
- `showLineNumbers?: boolean` (optional) - Show line numbers (default: false)

**Usage:**

```tsx
import CodeBlock from '../../../components/article/CodeBlock';

<CodeBlock
  sectionTitle="Distance Calculation"
  language="python"
  caption="Haversine formula accounts for Earth's curvature"
  code={`def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate great-circle distance between two points in km"""
    R = 6371  # Earth's radius in km
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    return R * c`}
/>
```

**Code Example Best Practices:**

1. **Keep it focused** - 10-30 lines ideal, show the interesting part
2. **Add comments** - Explain key lines, especially non-obvious logic
3. **Real implementation** - Actual code from projects, not pseudocode
4. **Proper formatting** - Use consistent indentation (2 or 4 spaces)
5. **Context in caption** - Explain what the code demonstrates

**When to use CodeBlock:**
- ✅ Showing actual implementation of algorithms
- ✅ Demonstrating API usage patterns
- ✅ Illustrating data structures or schemas
- ✅ Highlighting clever solutions to problems
- ❌ Don't show trivial code (simple variable assignments)
- ❌ Don't show entire files (extract relevant sections)
- ❌ Don't use when description is clearer than code

**Supported Languages:**
- `python` - Python code
- `typescript` - TypeScript/TSX
- `javascript` - JavaScript/JSX
- `sql` - SQL queries and schemas
- `bash` - Shell scripts and commands
- `cpp` - C++ and Arduino code
- `json` - JSON configuration files

**Copy Button:**
- Automatically included in top-right corner
- Shows "Copy" by default, "Copied!" after clicking
- Copies raw code to clipboard (no line numbers)

---

## 4. Article Writing Guidelines

### TL;DR Sections

**Every article must start with a TL;DR** (except very short Demos articles).

**Format:**
```tsx
<TextBlock 
  text="TL;DR: [1-2 sentence summary of key insight]"
  sectionTitle="Overview"
/>
```

**TL;DR Requirements:**
- 1-2 sentences maximum
- Captures the core insight or outcome
- Uses specific numbers/metrics when relevant
- Written for someone skimming quickly

**Good TL;DR examples:**
```
"Built dual-AI system: Base AI (0.02 learning rate, persistent) learns long-term patterns; Session AI (0.8 rate, temporary) adapts to current session. Separates stability from responsiveness."

"Data coverage crisis: 31% precipitation, 0% wind/humidity after interpolation. Can't predict wildfires without critical variables. Professional judgment: stop building on unsound foundation."

"TEG harvests 0.96-14.4Wh/day from temperature gradients. 4.0F supercapacitors provide 91-day backup. System draws 27.5mW average. Black copper patina maximizes heat absorption."
```

**Poor TL;DR examples:**
```
"This article talks about the AI system I built." (too vague)

"I learned a lot about machine learning and made some interesting discoveries about how to structure the code properly and handle edge cases..." (too long, rambling)

"The system works well." (no specifics, not informative)
```

### Paragraph Length

**Target: 60-100 words per paragraph**

Paragraphs over 100 words should be split into 2-3 smaller paragraphs.

**Why this matters:**
- Screen reading is harder than print
- Long paragraphs create visual walls of text
- Shorter paragraphs improve scannability
- Hiring managers skim - make it easy

**How to split long paragraphs:**

❌ **Before (125 words):**
```
The interpolation strategy used two complementary methods working in sequence. Station-based interpolation ran first, using pre-assigned weather stations for each grid cell. For a cell needing temperature data on a specific date, the system queried its assigned stations (up to 30), filtered for stations with data on that date, and calculated a distance-weighted average. Stations closer to the cell center received higher weights using inverse distance weighting: weight = 1 / distance². This approach successfully interpolated 70.7% of all weather values, creating high-quality estimates where station coverage was adequate. The remaining 29.3% required neighbor-based interpolation as a fallback.
```

✅ **After (split into 2 paragraphs, 60-65 words each):**
```
The interpolation strategy used two complementary methods working in sequence. Station-based interpolation ran first, using pre-assigned weather stations for each grid cell. For a cell needing temperature data on a specific date, the system queried its assigned stations (up to 30), filtered for stations with data on that date, and calculated a distance-weighted average.

Stations closer to the cell center received higher weights using inverse distance weighting: weight = 1 / distance². This approach successfully interpolated 70.7% of all weather values, creating high-quality estimates where station coverage was adequate. The remaining 29.3% required neighbor-based interpolation as a fallback.
```

### Readability Guidelines

**Target Audience:** Technical hiring managers who are skimming

**Scannability Elements:**
1. **TL;DR** - Immediate key takeaway
2. **Section titles** - Clear navigation points
3. **Code blocks** - Visual breaks with concrete examples
4. **Paragraph breaks** - White space for breathing room
5. **Specific numbers** - "21,000+ records/sec" not "very fast"

**Density Management:**

Balance technical depth with accessibility:

✅ **Good balance:**
- Start with accessible explanation
- Add technical details progressively
- Use code blocks for deep dives
- Mix narrative with implementation

❌ **Too dense:**
- Every paragraph is 100% technical
- No breathing room or context
- Assumes expert knowledge throughout
- Relentless detail without breaks

**Progressive Disclosure:**

Structure articles to serve both skimmers and deep readers:

1. **TL;DR** - 10 seconds (key insight)
2. **Section titles** - 30 seconds (article structure)
3. **First sentences** - 2 minutes (main points)
4. **Full paragraphs** - 5 minutes (complete story)
5. **Code examples** - 10 minutes (implementation details)

This lets readers choose their depth level.

### Section Titles

- Every `TextBlock` **must** have a `sectionTitle` prop
- Section titles appear in the left-side table of contents
- Keep titles concise (2-4 words ideal)
- Titles should be descriptive of section content

**Good section titles:**
- "The Core Architecture"
- "Learning Over Labeling"
- "Design Philosophy"
- "Hardware Challenges"

**Poor section titles:**
- "Part 1" (not descriptive)
- "This is where I talk about the system architecture" (too long)
- "" (empty/missing)

### Content Length

- **Preview description**: Exactly 3 paragraphs
- **Articles per project**: 5-7 articles typical
- **Article length**: Each article should have 5-7 `TextBlock` sections
- **Section length**: Each section 2-4 sentences (80-150 words)

### Content Focus

Write articles based on **actual project evolution**, not templates:

✅ **Good approach:**
- Analyze chat records/dev logs for key moments
- Write about actual pivots and decisions
- Focus on real problems solved
- Show project evolution over time
- Highlight what changed and why

❌ **Avoid:**
- Generic "lessons learned" articles
- Template-based structure for every project
- Assuming early designs are current
- Writing about features that don't exist

### Writing Style

- Direct, technical language
- Active voice preferred
- Focus on specific details, not generalities
- Show thinking process and trade-offs
- Be honest about challenges and failures

---

## 5. Demos Article Pattern

The Demos article should **always be the last article** in the article list.

### Standard Structure

```tsx
import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      
      {/* If you have a live deployment */}
      <DemoBlock
        sectionTitle="Live Application"
        text="Description of the live application and what users can do with it."
        demos={[
          {
            label: 'Live App',
            url: 'https://your-app.com',
            type: 'webapp',
          },
        ]}
      />
      
      {/* Source code section */}
      <DemoBlock
        sectionTitle="Source Code"
        text="Description of what's in the repositories."
        demos={[
          {
            label: 'Frontend GitHub',
            url: 'https://github.com/user/frontend',
            type: 'github',
          },
          {
            label: 'Backend GitHub',
            url: 'https://github.com/user/backend',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;
```

### Critical Rule: Only Link to What Exists

**Only include resources you can actually link to:**

✅ **Can include:**
- Live deployed applications
- GitHub repositories
- Hosted documentation
- Demo videos on YouTube/Vimeo
- Online galleries

❌ **Do NOT mention:**
- Photo galleries that aren't hosted
- Component photos on your local machine
- Documentation that's not publicly accessible
- "Coming soon" links

**Bad example:**

```tsx
text="Includes comprehensive photo galleries showing components..."
// No link provided - frustrating for viewers
```

**Good example:**

```tsx
text="The repository contains code, documentation, and specs."
demos={[
  { label: 'GitHub Repository', url: 'https://...' }
]}
```

---

## 6. Common Pitfalls and Solutions

### ❌ Pitfall 1: Missing TL;DR

**Problem:** Article starts directly with detailed content, making it hard to skim.

**Solution:** Always add a TL;DR as the first TextBlock:

```tsx
<TextBlock 
  text="TL;DR: [1-2 sentence summary]"
  sectionTitle="Overview"
/>
```

### ❌ Pitfall 2: Paragraphs Too Long

**Problem:** Paragraphs over 100 words create walls of text that are hard to read on screens.

**Solution:** Break long paragraphs into 60-100 word chunks. Split at natural transition points.

**Before:**
```tsx
text="The interpolation strategy used two complementary methods... [150 words of dense technical content]..."
```

**After:**
```tsx
// Split into multiple TextBlocks or break the text string with \n\n
text="The interpolation strategy used two complementary methods... [75 words]\n\nStations closer to the cell center... [75 words]"
```

### ❌ Pitfall 3: Using TextBlock Children

**Problem:** TextBlock doesn't accept children, only the `text` prop.

```tsx
// ❌ WRONG
<TextBlock>
  This is my text content.
</TextBlock>

// ❌ WRONG - Even with sectionTitle
<TextBlock sectionTitle="Overview">
  This is my text content.
</TextBlock>
```

**Solution:**

```tsx
// ✅ CORRECT
<TextBlock 
  text="This is my text content."
  sectionTitle="Overview"
/>
```

### ❌ Pitfall 4: Code Without Context

**Problem:** Showing code without explaining what it demonstrates or why it's interesting.

**Solution:** Always add a caption or surrounding TextBlock to provide context:

```tsx
<TextBlock 
  text="The haversine formula calculates accurate distances accounting for Earth's curvature—critical for weather station weighting at high latitudes where naive Euclidean distance fails."
  sectionTitle="Geographic Calculations"
/>
<CodeBlock
  language="python"
  caption="Haversine distance calculation used for all station-cell distances"
  code={`...`}
/>
```

### ❌ Pitfall 5: Missing Section Titles

**Problem:** TextBlocks without `sectionTitle` don't appear in table of contents.

```tsx
// ❌ WRONG - Table of contents will be empty
<TextBlock 
  text="Some content here."
/>
```

**Solution:**

```tsx
// ✅ CORRECT - Appears in TOC
<TextBlock 
  text="Some content here."
  sectionTitle="Introduction"
/>
```

### ❌ Pitfall 3: Mentioning Unavailable Resources

**Problem:** Describing resources that can't be linked to.

```tsx
// ❌ WRONG
text="The project includes extensive photo documentation showing 
all components with detailed specifications and assembly guides."
// No way to access these photos
```

**Solution:**

```tsx
// ✅ CORRECT
text="The repository contains Python sensor code, technical 
specifications, and development logs."
demos={[
  { label: 'GitHub Repository', url: 'https://github.com/...' }
]}
```

### ❌ Pitfall 4: Incorrect Import Paths

**Problem:** Wrong relative paths for components.

```tsx
// ❌ WRONG - Path depth incorrect
import Article from '../../components/article/Article';

// ❌ WRONG - Missing folder level
import Article from '../../../article/Article';
```

**Solution:**

```tsx
// ✅ CORRECT - From src/pages/projects/project-name/
import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import DemoBlock from '../../../components/article/DemoBlock';
```

### ❌ Pitfall 5: Unescaped Special Characters

**Problem:** Special characters in strings breaking syntax.

```tsx
// ❌ WRONG - Unescaped apostrophe
text="They aren't working correctly."

// ❌ WRONG - Em dash interpreted as Unicode escape
text="The system—built with React—works well."
```

**Solution:**

```tsx
// ✅ CORRECT - Escaped apostrophe
text="They aren\'t working correctly."

// ✅ CORRECT - Use regular dash or escape
text="The system - built with React - works well."
text='The system—built with React—works well.'  // Single quotes
```

---

## 7. Implementation Checklist

When adding a new project, complete these steps in order:

### Phase 1: Project Data

- [ ] Add project to `src/data/projects.ts`
  - [ ] Define all required fields
  - [ ] Write 3-paragraph `previewDescription`
  - [ ] Select appropriate `tags` and `previewTags`
  - [ ] Set correct `status` and `progress`

### Phase 2: Directory Setup

- [ ] Create project directory: `src/pages/projects/{project-name}/`
- [ ] Create main project file: `{ProjectName}.tsx`
- [ ] Plan 5-7 article topics based on project evolution

### Phase 3: Article Creation

- [ ] Create 5-7 individual article files
- [ ] Each article includes:
  - [ ] Import statements for Article, TitleBlock, TextBlock
  - [ ] TitleBlock with appropriate title
  - [ ] 5-7 TextBlocks with meaningful content
  - [ ] Every TextBlock has `sectionTitle` prop
  - [ ] Every TextBlock uses `text` prop (not children)
- [ ] Create Demos article (if applicable)
  - [ ] Only link to resources that exist
  - [ ] Use DemoBlock for links

### Phase 4: Integration

- [ ] Update main project file to import all articles
- [ ] Update `src/pages/Project.tsx` with new case
- [ ] Add case matching project's `route` field

### Phase 5: Testing

- [ ] Navigate to `/projects/preview/{project-route}`
- [ ] Verify preview description displays correctly
- [ ] Click "Read on" to view full project page
- [ ] Verify table of contents appears in left panel
- [ ] Verify all sections appear in TOC
- [ ] Click TOC items to verify navigation
- [ ] Test all demo links work
- [ ] Check on mobile view

---

## 8. File Templates

### Template: Main Project File

```tsx
import ArticleReader from '../../../components/article/ArticleReader';
import Article1 from './Article1';
import Article2 from './Article2';
import Article3 from './Article3';
import Article4 from './Article4';
import Article5 from './Article5';
import Demos from './Demos';

const ProjectName = () => {
  return (
    <ArticleReader>
      <Article1 />
      <Article2 />
      <Article3 />
      <Article4 />
      <Article5 />
      <Demos />
    </ArticleReader>
  );
};

export default ProjectName;
```

### Template: Standard Article File

```tsx
import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const ArticleName = () => {
  return (
    <Article>
      <TitleBlock title="Article Title" />
      
      <TextBlock 
        text="First section content. Multiple sentences describing the topic in detail."
        sectionTitle="Section 1"
      />
      
      <TextBlock 
        text="Second section content. Building on the first section with more details."
        sectionTitle="Section 2"
      />
      
      <TextBlock 
        text="Third section content. Continuing the narrative."
        sectionTitle="Section 3"
      />
      
      <TextBlock 
        text="Fourth section content. Additional insights."
        sectionTitle="Section 4"
      />
      
      <TextBlock 
        text="Fifth section content. Wrapping up the article."
        sectionTitle="Section 5"
      />
    </Article>
  );
};

export default ArticleName;
```

### Template: Demos Article

```tsx
import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      
      <DemoBlock
        sectionTitle="Live Application"
        text="Description of your deployed application and what users can interact with."
        demos={[
          {
            label: 'Live App',
            url: 'https://your-app-url.com',
            type: 'webapp',
          },
        ]}
      />
      
      <DemoBlock
        sectionTitle="Source Code"
        text="Description of what's available in your repositories."
        demos={[
          {
            label: 'GitHub Repository',
            url: 'https://github.com/username/repo',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;
```

---

## 9. Complete Working Example

Here's a complete, correct article implementation from the WhatNow project:

```tsx
import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TwoLayerLearning = () => {
  return (
    <Article>
      <TitleBlock title="Two-Layer Learning Architecture" />
      
      <TextBlock 
        text="WhatNow's AI system uses two models with different learning rates and persistence: Base AI (slow learning, 0.02 rate, backend) and Session AI (fast learning, 0.8 rate, frontend). This architecture emerged from a specific problem: users need immediate value from recommendations, but overfitting to single sessions would break the system. One bad session shouldn't poison the entire model. The solution separates fast adaptation from stable long-term learning."
        sectionTitle="The Core Architecture"
      />
      
      <TextBlock 
        text="Base AI lives on the backend, persists weights in PostgreSQL, and learns slowly across all users and sessions. Its learning rate of 0.02 means each training example barely nudges the weights. This creates robustness: no single session can drastically change recommendations. Over hundreds of interactions, patterns emerge: certain contexts consistently lead to certain activity types. These learned patterns form a general model of context-to-activity preferences."
        sectionTitle="Base AI: Slow and Steady"
      />
      
      <TextBlock 
        text="Session AI runs entirely in the browser JavaScript, loads Base AI weights as its starting point, then learns rapidly with a 0.8 learning rate during the session. This aggressive learning means user choices immediately influence subsequent recommendations. If you choose three artistic activities in a row, Session AI picks up this pattern and ranks artistic activities higher for the rest of the session. When the session ends, Session AI disappears—no persistence, no cross-session effects."
        sectionTitle="Session AI: Fast and Temporary"
      />
      
      <TextBlock 
        text="The interaction between these two layers creates interesting behavior. New users with no Base AI history get random recommendations initially—pure exploration. As Base AI trains across their sessions, it learns their general preferences: perhaps they consistently choose outdoor activities in sunny weather. Session AI then starts each new session with these priors, but refines them based on current choices. If today they're choosing indoor activities despite sunny weather, Session AI adapts immediately while Base AI slowly incorporates this deviation into its model."
        sectionTitle="Layer Interaction"
      />
      
      <TextBlock 
        text="This two-layer approach demonstrates a broader principle in ML system design: match learning rates to timescales of patterns. Session-level patterns (today I want chill activities) need fast learning. Cross-session patterns (I generally prefer outdoor activities) need slow learning. Using a single model with a single learning rate forces choosing between responsiveness and stability. Separating these concerns allows both. The architecture might seem complex, but each layer solves a distinct problem, and both are simple SGD classifiers—just with different learning rates and persistence strategies."
        sectionTitle="Design Principles"
      />
    </Article>
  );
};

export default TwoLayerLearning;
```

**Why this is correct:**

✅ All imports from correct relative paths  
✅ Wrapped in `<Article>` component  
✅ Has `<TitleBlock>` with clear title  
✅ Every `<TextBlock>` uses `text` prop (not children)  
✅ Every `<TextBlock>` has `sectionTitle`  
✅ Section titles are concise and descriptive  
✅ Content flows logically from section to section  
✅ Technical but readable language  
✅ Shows real architectural thinking

---

## 10. Quick Reference

### Component Props Summary

| Component | Required Props | Optional Props |
|-----------|---------------|----------------|
| Article | `children` | - |
| TitleBlock | `title` | `subtitle`, `sectionTitle` |
| TextBlock | `text`, `sectionTitle` | - |
| DemoBlock | `text`, `demos` | `sectionTitle` |

### Import Template

```tsx
// Always these imports for standard articles
import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

// Add this for demos articles
import DemoBlock from '../../../components/article/DemoBlock';
```

### Common Mistakes Quick Check

- [ ] Using TextBlock children instead of `text` prop
- [ ] Missing `sectionTitle` on TextBlocks
- [ ] Mentioning resources that can't be linked
- [ ] Wrong import path depths
- [ ] Unescaped special characters in strings
- [ ] Forgetting to update Project.tsx with new case
- [ ] Not testing table of contents

---

## 11. Related Documentation

- **Project Structure**: `context/01-project-structure.md`
- **Projects Page Spec**: `specifications/projects-page-specification.md`
- **Project Data**: `src/data/projects.ts`
- **Article Components**: `src/components/article/`

---

## Notes

This guide will be updated as new patterns emerge or requirements change. When adding future projects, update this guide with any new lessons learned.

**Last Updated:** December 18, 2025

---

**End of Guide**

