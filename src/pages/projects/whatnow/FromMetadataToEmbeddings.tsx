import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const FromMetadataToEmbeddings = () => {
  return (
    <Article>
      <TitleBlock title="From Metadata to Embeddings" />
      <TextBlock 
        text="Started with 15+ manual metadata fields per activity. Couldn't scale to 1,258 activities. Pivoted to sentence transformer embeddings (384 dimensions) that learn semantic meaning automatically."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The initial WhatNow architecture relied heavily on manual metadata. Each activity had 15+ fields: physical_energy (0-10), mental_energy (0-10), social_level (0-10), duration_min, duration_max, indoor/outdoor, cost_level, category, weather_best, weather_avoid, time_of_day preferences, and specific tags." 
        sectionTitle="The Manual Metadata Approach" 
      />
      <TextBlock 
        text="The filtering system could handle queries like 'low physical energy, high mental energy, indoor, free, evening activities,' returning precisely matched results. This worked for the initial 72 activities I'd carefully curated."
        sectionTitle="Initial Success" 
      />
      <TextBlock 
        text="This system worked technically but didn't scale. I'd populated 72 activities with careful metadata assignment, then attempted to scale to 1,258 activities. Manually defining energy levels and preferences for over a thousand activities became impossible." 
        sectionTitle="Scaling Issues" 
      />
      <TextBlock 
        text="The real problem ran deeper: subjective attributes like 'mental energy' or 'social level' are contextual and personal. What feels 'high energy' to one person might feel 'medium' to another. What's 'social' in one mood feels 'overwhelming' in another." 
        sectionTitle="Subjectivity Problem" 
      />
      <TextBlock 
        text="The pivot to AI embeddings eliminated manual metadata entirely. Using sentence transformers (all-MiniLM-L6-v2), I generated 384-dimensional embedding vectors for each activity name. 'Go for a walk in the forest' and 'Take a hike in nature' produced similar embeddings due to semantic similarity, while 'Watch a horror movie' and 'Meditate peacefully' produced very different vectors." 
        sectionTitle="The Pivot to Embeddings" 
      />
      <CodeBlock
        language="python"
        sectionTitle="Embedding Generation"
        caption="Sentence transformers convert activity names to semantic vectors"
        code={`from sentence_transformers import SentenceTransformer

# Load pre-trained model (384-dimensional embeddings)
model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings for all activities
activities = [
    "Go for a walk in the forest",
    "Take a hike in nature",
    "Watch a horror movie",
    "Meditate peacefully"
]

embeddings = model.encode(activities)
# Result: numpy array of shape (4, 384)

# Similar activities have high cosine similarity
# "walk in forest" and "hike in nature": ~0.85
# "walk in forest" and "watch horror": ~0.15`}
      />
      <TextBlock 
        text="The database schema collapsed from 15+ fields to just: id, name, embedding. This radical simplification made the system maintainable." 
        sectionTitle="Schema Simplification" 
      />
      <CodeBlock
        language="sql"
        sectionTitle="Database Schema"
        caption="Before vs After: 15+ metadata fields reduced to semantic embeddings"
        code={`-- BEFORE: Manual metadata (unmaintainable at scale)
CREATE TABLE activities_old (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    physical_energy INTEGER CHECK (physical_energy BETWEEN 0 AND 10),
    mental_energy INTEGER CHECK (mental_energy BETWEEN 0 AND 10),
    social_level INTEGER CHECK (social_level BETWEEN 0 AND 10),
    duration_min INTEGER,
    duration_max INTEGER,
    indoor_outdoor TEXT,
    cost_level TEXT,
    category TEXT,
    weather_best TEXT,
    weather_avoid TEXT,
    time_of_day TEXT,
    tags TEXT[]
    -- ... more fields
);

-- AFTER: AI embeddings (scales automatically)
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    embedding JSONB NOT NULL  -- 384-dimensional vector
);`}
      />
      <TextBlock 
        text="Embeddings solve the subjectivity problem by letting the AI learn patterns from actual usage. Instead of predefining that 'rock climbing' requires 'high physical energy,' the system learns from data: when users in 'energetic' + 'adventurous' contexts choose rock climbing, and users in 'tired' + 'chill' contexts don't, the AI discovers this pattern automatically. The semantic embeddings provide a rich starting point, then contextual bandits refine understanding through user feedback." 
        sectionTitle="Learning Over Labeling" 
      />
      <TextBlock 
        text="The technical implementation of this pivot was straightforward but required careful data management. I generated embeddings locally using sentence-transformers (the library is massive—150MB+—and caused deployment issues when included in production). All 1,258 activities were processed into 384-dimensional vectors and stored as JSON strings in PostgreSQL. The production API serves pre-computed embeddings, never generating new ones at runtime. This separation kept deployment fast and reliable." 
        sectionTitle="Technical Implementation" 
      />
      <TextBlock 
        text="Database migration was surprisingly smooth. The old schema with 15+ fields coexisted with the new schema temporarily, allowing gradual transition. A clear endpoint wiped the old data, then a bulk upload endpoint loaded all activities with embeddings in one batch. The old filtering system was removed entirely—no hybrid approach, no backward compatibility. Clean breaks are better than maintaining dual systems." 
        sectionTitle="Migration Strategy" 
      />
      <TextBlock 
        text="The embedding approach removed over 30MB of manually curated metadata and replaced it with computationally derived vectors. More importantly, it removed the maintainability burden. Adding new activities now requires only the activity name; the embedding captures semantic meaning automatically. This pivot transformed WhatNow from a manually curated catalog requiring domain expertise to a scalable system that learns from usage." 
        sectionTitle="The Impact" 
      />
      <TextBlock 
        text="This architectural evolution demonstrates a principle that applied across the entire project: prefer systems that learn over systems that require manual curation. Manual work doesn't scale, becomes a maintenance burden, and bakes in the creator's biases. Learning systems start rough but improve continuously through real usage. For a portfolio piece, showing this pivot from manual to learned approaches demonstrates engineering judgment and ML understanding simultaneously." 
        sectionTitle="Design Philosophy" 
      />
    </Article>
  );
};

export default FromMetadataToEmbeddings;

