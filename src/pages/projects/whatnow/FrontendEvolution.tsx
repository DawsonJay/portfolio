import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const FrontendEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Frontend Evolution" />
      <TextBlock 
        text="TL;DR: Started with vanilla JS prototype to validate UX. Migrated to React+TypeScript for state management. Did complete clean rebuild when codebase got janky. Mobile-first redesign after testing on real devices."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="WhatNow's frontend began as a single HTML file with vanilla JavaScript. The initial implementation proved the concept: users select tags from grouped buttons, click 'Start Game,' and see two activity cards side-by-side for comparison. The winner stays, the loser disappears, a new card appears. Simple, functional, zero dependencies. This vanilla approach validated the user experience before investing in modern frameworks. However, as Session AI complexity grew and state management needs increased, the limitations became apparent." 
        sectionTitle="Vanilla JavaScript Prototype" 
      />
      <TextBlock 
        text="The migration to React happened quickly once the decision was made. Vite + React + TypeScript + Tailwind CSS became the stack, chosen for fast development iteration and strong type safety." 
        sectionTitle="React Migration" 
      />
      <TextBlock 
        text="The initial React migration maintained all functionality while organizing code into proper components: TagSelector page, GamePage, ActivityCard, TagGroup, LoadingSpinner. Custom hooks (useGameState, useSessionAI) encapsulated complex logic, keeping components focused on rendering. This structure made adding features much easier than the sprawling vanilla JavaScript file." 
        sectionTitle="Component Organization" 
      />
      <TextBlock 
        text="The React migration encountered immediate challenges: infinite render loops, stale state in callbacks, and timing issues between API calls and state updates. One particularly nasty bug involved useEffect dependency arrays: the contextTags array was being recreated on every render, causing useEffect to retrigger infinitely. The solution used useMemo to maintain referential equality for the tags array. These problems would have been harder to diagnose in vanilla JavaScript, where bugs hide in ad-hoc state management rather than causing obvious infinite loops." 
        sectionTitle="React Migration Challenges" 
      />
      <TextBlock 
        text="Shortly after the React migration, I recognized the codebase had become 'janky.' Multiple development approaches left remnant files: the old vanilla JavaScript index.html coexisted with incomplete React components, multiple whatnow-frontend directories existed, backend code mixed with frontend code. The project structure confused even me. The solution was a complete clean rebuild: create whatnow-clean/ with separate backend/ and frontend/ directories, migrate only necessary files, delete everything else. Starting with a clear foundation proved faster than trying to clean up the mess." 
        sectionTitle="The Clean Rebuild" 
      />
      <TextBlock 
        text="The clean rebuild established patterns that persisted through the rest of development. Backend and frontend stay completely separate. Configuration files live in obvious locations. Components have single responsibilities. Custom hooks encapsulate complex logic. Type definitions live in types.ts, configuration in config.ts, theme in theme.ts. This structure made subsequent features easier to implement because the mental model stayed consistent—no more hunting through tangled code to find where state lives or where API calls happen." 
        sectionTitle="Architectural Patterns" 
      />
      <TextBlock 
        text="Embeddings management emerged as a critical technical challenge. Session AI needs activity embeddings (384-dimensional vectors) to rank recommendations, requiring all 1,249 activities with their embeddings loaded in the frontend. Initially, I tried useEmbeddingsCache in multiple components, causing race conditions: GamePage would initialize before embeddings finished loading." 
        sectionTitle="Embeddings Management" 
      />
      <CodeBlock
        language="typescript"
        sectionTitle="EmbeddingsContext Pattern"
        caption="Singleton context ensures embeddings load once at app startup"
        code={`import { createContext, useContext, useEffect, useState } from 'react';

interface Activity {
  id: number;
  name: string;
  embedding: number[];  // 384-dimensional vector
}

interface EmbeddingsContextType {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const EmbeddingsContext = createContext<EmbeddingsContextType | null>(null);

export function EmbeddingsProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load all 1,249 activities with embeddings on mount
    fetch('/api/activities')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <EmbeddingsContext.Provider value={{ activities, loading, error }}>
      {children}
    </EmbeddingsContext.Provider>
  );
}

// Hook for accessing embeddings anywhere in the app
export function useEmbeddings() {
  const context = useContext(EmbeddingsContext);
  if (!context) throw new Error('useEmbeddings must be used within EmbeddingsProvider');
  return context;
}`}
      />
      <TextBlock 
        text="The solution created EmbeddingsContext, a singleton provider that loads embeddings once at app startup and provides them globally. This pattern ensured embeddings load before any component tries to use them." 
        sectionTitle="Context Solution" 
      />
      <TextBlock 
        text="Mobile-first design became a priority when I tested the app on an actual phone and found it broken. The desktop version worked beautifully, but on mobile: tiny text, cramped cards, constant scrolling, touch targets too small for fat fingers. I restructured the entire UI around mobile constraints: activity cards shrunk from 250px to 180px height on mobile, padding reduced across the board, font sizes responsive with Tailwind's sm: breakpoint, and the entire game interface designed to fit on an iPhone SE (375px wide) without scrolling. Desktop became the enhanced version, not the default." 
        sectionTitle="Mobile-First Redesign" 
      />
      <TextBlock 
        text="The visual design evolved through multiple iterations. Initial versions used generic Tailwind colors—blue backgrounds, white cards, standard shadows. Then I experimented with custom color palettes: jewel tones, soft pastels, vibrant gradients. The final design uses warm creams (#F5E6D3) for backgrounds, soft oranges (#D4A574, #C8965C) for interactive elements, and a subtle 'paper cut' aesthetic with generous rounded corners (rounded-3xl) and layered shadows. A textured background using pseudo-elements adds depth without affecting layout or performance." 
        sectionTitle="Visual Polish" 
      />
      <TextBlock 
        text="Centralized theme management became essential as the design matured. I created theme.ts exporting color constants, utility classes, and helper functions. This system allows rapid palette experimentation: change a few constants, refresh, see the entire app update. Components import theme utilities instead of hardcoding Tailwind classes, keeping styling consistent and maintainable. Want to try a different color scheme? Update theme.ts, not thirty different components. This architectural decision paid off during the mobile redesign when consistent spacing and sizing needed adjustment globally." 
        sectionTitle="Theme System" 
      />
      <TextBlock 
        text="The frontend evolution from vanilla JavaScript to polished React application demonstrates the value of iterative improvement with willingness to rebuild when necessary. Each version built on learnings from the previous: vanilla validated UX, React migration organized code, clean rebuild established architecture, mobile redesign prioritized real usage, theme system enabled rapid iteration. The final product is maintainable, performant, mobile-first, and visually cohesive—but it got there through multiple cycles of building, recognizing problems, and fixing them systematically rather than trying to architect perfectly from the start." 
        sectionTitle="Iterative Improvement" 
      />
    </Article>
  );
};

export default FrontendEvolution;

