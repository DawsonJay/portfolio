import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TheCoreConcept = () => {
  return (
    <Article>
      <TitleBlock title="The Core Concept" />
      
      <TextBlock 
        text="I built a French learning tool that explains why translations work the way they do—not just what the translation is. I use OpenAI GPT-4o-mini to provide word-by-word mappings, grammar rules, and cultural context for each phrase. My goal was creating an educational tool that helps you understand translation, not just consume it."
        sectionTitle="Overview"
      />
      
      <TextBlock 
        text="I started moh-ami (pronounced 'moh-ah-mee', from 'mot ami' meaning 'word friend') because I was frustrated with how translation apps work. They give you the result but don't explain the process. You see 'Je vais au marché' translates to 'I am going to the market' but not why 'au' is used instead of 'à le', or why 'marché' doesn't need an article in French when 'market' requires 'the' in English. These details matter when you're actually trying to learn."
        sectionTitle="Why This Matters"
      />
      
      <TextBlock 
        text="The core idea is educational transparency—I show not just the translation, but the reasoning behind every choice. When you input English text, the system breaks it into chunks and provides detailed explanations for each. You get word-by-word mappings showing how English words correspond to French words, grammar rules that apply to that specific phrase, cultural context when relevant, and alternative translations with reasons for choosing one over another."
        sectionTitle="How It Works"
      />
      
      <TextBlock 
        text="I designed the experience around interactive exploration. You see your English text and the French translation side-by-side with synchronized scrolling. Each chunk is numbered and clickable. Hovering highlights both the English and French portions that share the same explanation. Clicking opens a panel with the word-by-word breakdown, grammar rules, and cultural notes. I wanted active learning, not passive consumption."
        sectionTitle="Interactive Learning"
      />
      
      <TextBlock 
        text="I chose Next.js 14 with App Router, React 19, TypeScript, and Redux Toolkit on the frontend. The backend uses GraphQL with Apollo Server, PostgreSQL via Prisma ORM, and integrates with OpenAI's GPT-4o-mini API. I deployed the whole thing on Railway. I chose these technologies because they're what I wanted to demonstrate—full-stack development with modern tools, proper state management, and production deployment patterns."
        sectionTitle="Technical Stack"
      />
      
      <TextBlock 
        text="My motivation was dual: demonstrate LLM integration in a production application while building something useful for learning French. I've built AI systems before, but this was different—it needed to explain its reasoning, not just produce results. I wanted to show end-to-end development skills: prompt engineering, API integration, database design, interactive UI, and production deployment. But I also wanted to build something I'd actually use."
        sectionTitle="Project Goals"
      />
    </Article>
  );
};

export default TheCoreConcept;
