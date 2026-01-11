import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const FromMetadataToEmbeddings = () => {
  return (
    <Article>
      <TitleBlock title="From Metadata to Embeddings" />
      <TextBlock 
        text="I started with 15+ manual metadata fields per activity. I couldn't scale to 1,258 activities. I pivoted to sentence transformer embeddings (384 dimensions) that learn semantic meaning automatically."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="My initial WhatNow architecture relied heavily on manual metadata. Each activity had 15+ fields: physical_energy (0-10), mental_energy (0-10), social_level (0-10), duration_min, duration_max, indoor/outdoor, cost_level, category, weather_best, weather_avoid, time_of_day preferences, and specific tags. I thought this granularity would help the AI make better recommendations." 
        sectionTitle="The Manual Approach" 
      />
      <TextBlock 
        text="The filtering system could handle queries like 'low physical energy, high mental energy, indoor, free, evening activities,' returning precisely matched results. This worked great for the initial 72 activities I'd carefully curated. I felt like I was building something sophisticated."
        sectionTitle="Initial Success" 
      />
      <TextBlock 
        text="Then I tried to scale to 1,258 activities. Manually defining energy levels and preferences for over a thousand activities became impossible. I'd spend hours deciding whether 'visiting an art gallery' should be rated 3 or 4 for mental energy, 2 or 3 for social level. The system worked technically but didn't scale in practice." 
        sectionTitle="The Scaling Problem" 
      />
      <TextBlock 
        text="But the real problem ran deeper: subjective attributes like 'mental energy' or 'social level' are contextual and personal. What feels 'high energy' to me might feel 'medium' to you. What's 'social' in one mood feels 'overwhelming' in another. I was baking my personal biases into every activity rating." 
        sectionTitle="The Deeper Issue" 
      />
      <TextBlock 
        text="I pivoted to AI embeddings and eliminated manual metadata entirely. Using sentence transformers (all-MiniLM-L6-v2), I generated 384-dimensional embedding vectors for each activity name. 'Go for a walk in the forest' and 'Take a hike in nature' produced similar embeddings due to semantic similarity, while 'Watch a horror movie' and 'Meditate peacefully' produced very different vectors. The AI understood meaning automatically." 
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
        text="The database schema collapsed from 15+ fields to just: id, name, embedding. This radical simplification made the system actually maintainable. I could add new activities by just writing the name—no more agonizing over energy ratings." 
        sectionTitle="Radical Simplification" 
      />
      <CodeBlock
        language="sql"
        sectionTitle="Schema Evolution"
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
        text="Embeddings solve the subjectivity problem by letting the AI learn patterns from actual usage. Instead of me predefining that 'rock climbing' requires 'high physical energy,' the system learns from data: when users in 'energetic' + 'adventurous' contexts choose rock climbing, and users in 'tired' + 'chill' contexts don't, the AI discovers this pattern automatically. The semantic embeddings provide a rich starting point, then contextual bandits refine understanding through user feedback." 
        sectionTitle="Learning Over Labeling" 
      />
      <TextBlock 
        text="The technical implementation was straightforward but required careful data management. I generated embeddings locally using sentence-transformers (the library is massive—150MB+—and caused deployment issues when I tried including it in production). I processed all 1,258 activities into 384-dimensional vectors and stored them as JSON strings in PostgreSQL. The production API serves pre-computed embeddings, never generating new ones at runtime. This separation kept deployment fast and reliable." 
        sectionTitle="Implementation Details" 
      />
      <TextBlock 
        text="Database migration was surprisingly smooth. I kept the old schema with 15+ fields alongside the new schema temporarily, allowing gradual transition. A clear endpoint wiped the old data, then a bulk upload endpoint loaded all activities with embeddings in one batch. I removed the old filtering system entirely—no hybrid approach, no backward compatibility. I've learned that clean breaks are better than maintaining dual systems." 
        sectionTitle="Migration Strategy" 
      />
      <TextBlock 
        text="The embedding approach removed over 30MB of manually curated metadata and replaced it with computationally derived vectors. More importantly, it removed the maintainability burden. Adding new activities now requires only the activity name; the embedding captures semantic meaning automatically. This pivot transformed WhatNow from a manually curated catalog requiring my constant attention to a scalable system that learns from usage." 
        sectionTitle="The Impact" 
      />
      <TextBlock 
        text="This evolution demonstrates something I've come to believe: prefer systems that learn over systems that require manual curation. Manual work doesn't scale, becomes a maintenance burden, and bakes in the creator's biases. Learning systems start rough but improve continuously through real usage. For a portfolio piece, showing this pivot from manual to learned approaches demonstrates engineering judgment and ML understanding at the same time." 
        sectionTitle="Design Philosophy" 
      />
      
      <TextBlock 
        text="This pivot from manual metadata to embeddings reduced maintenance time by ~90%—adding new activities went from hours of manual rating to seconds of name entry. The system scaled from 72 to 1,258 activities without proportional effort increase. More importantly, it eliminated subjective bias and enabled the AI to learn patterns I couldn't have anticipated. This demonstrates my ability to recognize when manual approaches don't scale, understand ML techniques (embeddings, semantic similarity), and make architectural pivots that fundamentally improve system maintainability. The skill of recognizing when to replace manual processes with learned systems is valuable in any data-driven application."
        sectionTitle="Outcomes & Professional Value"
      />
    </Article>
  );
};

export default FromMetadataToEmbeddings;
