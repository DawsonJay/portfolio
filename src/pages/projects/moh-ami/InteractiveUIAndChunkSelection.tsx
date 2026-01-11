import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const InteractiveUIAndChunkSelection = () => {
  return (
    <Article>
      <TitleBlock title="Interactive UI" />
      
      <TextBlock 
        text="I built a side-by-side comparison view with synchronized scrolling, hover highlighting, and clickable chunks. Initial implementation used complex text matching that only made the first chunk selectable. I simplified to an ID-based system using character positions from OpenAI, making all chunks properly interactive. This demonstrates the value of recognizing when you're overcomplicating things."
        sectionTitle="Overview"
      />
      
      <TextBlock 
        text="The UI centers on a side-by-side comparison view—English text on the left, French translation on the right. Both sides scroll synchronously, maintaining alignment as you explore. Each side displays numbered lines with semantic chunks that are independently interactive. I used Tailwind CSS for responsive design, adapting to mobile with a stacked layout and accordion-style explanations instead of side panels."
        sectionTitle="Side-by-Side Comparison"
      />
      
      <TextBlock 
        text="I designed two interaction modes: hover and click. Hovering over a chunk highlights both the English and French chunks that share the same explanation, giving immediate visual feedback about which parts correspond. Clicking opens a detailed explanation panel with the word-by-word breakdown, grammar rules, and cultural context. This dual interaction pattern serves different needs—hovering for quick exploration, clicking for deep study."
        sectionTitle="Hover and Click"
      />
      
      <TextBlock 
        text="Here's where I ran into problems. My initial chunk selection used complex text matching—exact text matching, fuzzy matching, and position approximation. I was trying to map explanations to chunks through multiple strategies. This overcomplicated approach caused a bug where only the first chunk was selectable. I spent hours debugging before I realized the root cause: I was trying to match text content rather than using the character positions that OpenAI already provided in its response."
        sectionTitle="The Bug"
      />

      <CodeBlock
        sectionTitle="Simplified Chunk Matching"
        language="typescript"
        caption="ID-based system using character positions instead of text matching"
        code={`// Find which chunk contains a given character position
function findSentenceIndex(
  sentences: string[],
  fullText: string,
  targetPosition: number
): number {
  let currentPosition = 0;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    // Find actual position in text using indexOf
    const sentenceStart = fullText.indexOf(sentence, currentPosition);
    const sentenceEnd = sentenceStart + sentence.length;

    // Check if target position falls within this chunk
    if (targetPosition >= sentenceStart && targetPosition < sentenceEnd) {
      return i;
    }

    currentPosition = sentenceEnd;
  }

  return -1; // Position not found
}

// Map chunks to explanation IDs
const chunkExplanationIds = englishChunks.map((_, chunkIndex) => {
  const explanationIds: number[] = [];
  
  chunks.forEach((chunk) => {
    // Use character position from OpenAI response
    const explanationChunkIndex = findSentenceIndex(
      englishChunks,
      englishText,
      chunk.english_start || 0
    );
    
    if (explanationChunkIndex === chunkIndex) {
      explanationIds.push(chunk.index);
    }
  });
  
  return explanationIds;
});`}
      />
      
      <TextBlock 
        text="The simplified solution uses an ID-based architecture. Each explanation from OpenAI has an index (its ID) and character positions marking where it appears in the text. The findSentenceIndex function maps these character positions to chunk indices by calculating the actual position of each chunk using indexOf. This creates a clean mapping: each chunk knows which explanation IDs it contains, and clicking a chunk opens the corresponding explanation. No text matching required."
        sectionTitle="The Simple Solution"
      />
      
      <TextBlock 
        text="I use Redux Toolkit to coordinate the interactive elements. The translation slice stores the English text, French translation, explanation chunks, and the active chunk index. When you click a chunk, the setActiveChunk action updates the active index, triggering the explanation panel to open. For hovering, the component maintains local hoveredExplanationIds state to highlight related chunks without affecting the global active selection. This separation keeps hover effects responsive."
        sectionTitle="State Management"
      />

      <CodeBlock
        sectionTitle="Redux Slice"
        language="typescript"
        caption="Translation state management with active chunk tracking"
        code={`interface TranslationState {
  englishText: string;
  frenchTranslation: string;
  chunks: TranslationChunk[];
  alternatives: Alternative[];
  loading: boolean;
  error: string | null;
  activeChunkIndex: number | null;
}

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setActiveChunk: (state, action: PayloadAction<number | null>) => {
      state.activeChunkIndex = action.payload;
    },
    // ... other reducers
  },
});`}
      />
      
      <TextBlock 
        text="The explanation panel displays detailed information for the selected chunk—English phrase, French translation, word-by-word mappings in a grid layout, the detailed explanation text, grammar rules if applicable, and cultural context when relevant. It appears as a side panel on desktop and an accordion-style expansion on mobile. A close button lets you dismiss the panel and return to the comparison view."
        sectionTitle="Explanation Panel"
      />
      
      <TextBlock 
        text="Synchronized scrolling required careful event handling. The ComparisonView component manages scroll position state and applies it to both panels. When one panel scrolls, the onScroll event updates the shared position, which is then applied to the other panel. This creates the illusion of a single scrollable surface while maintaining separate DOM elements for layout flexibility. I throttle the synchronization to avoid performance issues with rapid scroll events."
        sectionTitle="Synchronized Scrolling"
      />
      
      <TextBlock 
        text="The debugging process taught me something important: complexity often indicates you're solving the wrong problem. The text matching implementation seemed necessary because the connection between chunks and explanations wasn't obvious. But the character positions from OpenAI were the answer all along—they just needed proper position-to-chunk mapping. Recognizing when to simplify rather than add more complexity is a critical skill I'm still developing."
        sectionTitle="Lessons Learned"
      />
      
      <TextBlock 
        text="The simplification from complex text matching to ID-based selection reduced code complexity by ~60% and fixed the bug that made only the first chunk selectable. All chunks now work correctly with proper highlighting and explanation panels. This demonstrates my ability to debug complex UI issues, recognize when I'm overcomplicating solutions, and refactor to simpler approaches that work better. The skill of recognizing when to simplify rather than add complexity is valuable in any codebase."
        sectionTitle="Outcomes"
      />
    </Article>
  );
};

export default InteractiveUIAndChunkSelection;
