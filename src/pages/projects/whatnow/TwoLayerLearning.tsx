import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TwoLayerLearning = () => {
  return (
    <Article>
      <TitleBlock title="Two-Layer Learning Architecture" />
      <TextBlock 
        text="I built a dual-AI system: Base AI (0.02 learning rate, persistent) learns long-term patterns; Session AI (0.8 rate, temporary) adapts to current session. Separates stability from responsiveness."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="WhatNow's AI system uses two models with different learning rates and persistence: Base AI (slow learning, 0.02 rate, backend) and Session AI (fast learning, 0.8 rate, frontend). This architecture emerged from a specific problem I was trying to solve: users need immediate value from recommendations, but overfitting to single sessions would break the system. One bad session shouldn't poison the entire model. I needed to separate fast adaptation from stable long-term learning." 
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
        text="The interaction between these two layers creates interesting behavior. New users with no Base AI history get random recommendations initially—pure exploration. As Base AI trains across their sessions, it learns their general preferences: maybe they consistently choose outdoor activities in sunny weather. Session AI then starts each new session with these priors, but refines them based on current choices. If today they're choosing indoor activities despite sunny weather, Session AI adapts immediately while Base AI slowly incorporates this deviation into its model." 
        sectionTitle="How They Work Together" 
      />
      <TextBlock 
        text="Contextual bandits drive both layers. The system encodes user context (mood, weather, time, energy tags) into a 43-dimensional vector, with each tag occupying a specific position. 'sunny' is position 0, 'morning' is position 5, 'energetic' is position 13, etc. Both Base AI and Session AI are SGD classifiers trained to predict: given this context vector, will the user choose this activity?" 
        sectionTitle="Technical Implementation" 
      />
      <CodeBlock
        language="typescript"
        sectionTitle="Context Vector Encoding"
        caption="Converting user-selected tags into a fixed-length feature vector"
        code={`// Context tags selected by user
const selectedTags = ['sunny', 'morning', 'energetic', 'social'];

// All possible tags with fixed positions
const TAG_POSITIONS = {
  'sunny': 0, 'rainy': 1, 'cloudy': 2,
  'morning': 5, 'afternoon': 6, 'evening': 7,
  'energetic': 13, 'tired': 14, 'neutral': 15,
  'social': 20, 'solo': 21,
  // ... 43 total positions
};

// Create 43-dimensional binary vector
function encodeContext(tags: string[]): number[] {
  const vector = new Array(43).fill(0);
  tags.forEach(tag => {
    const position = TAG_POSITIONS[tag];
    if (position !== undefined) {
      vector[position] = 1;  // One-hot encoding
    }
  });
  return vector;
}

// Result: [1, 0, 0, 0, 0, 1, 0, 0, ..., 1, 0, ...]
//         ^sunny  ^morning    ^energetic  ^social`}
      />
      <TextBlock 
        text="Implementing Session AI in React required careful state management. Initially, I tried maintaining Session AI state with useState, but asynchronous state updates caused timing issues: the rankActivities function would run before weights finished updating, using stale values. I solved this by passing Base AI weights directly from the API response to the ranking function, bypassing React state for critical data flow. Session AI still uses state for tracking its own training progress, but weight initialization happens synchronously." 
        sectionTitle="Frontend Challenges" 
      />
      <TextBlock 
        text="Background fetching for Session AI posed another challenge. When the activity pool drops below 10 items, the system fetches another batch from Base AI. Initially, this fetch interrupted gameplay—users saw loading screens mid-game. I made fetching completely silent: it happens in the background, doesn't replace currently displayed activities, and expands the pool without user awareness. Users experience infinite gameplay without ever running out of choices or seeing loading interruptions." 
        sectionTitle="Seamless Experience" 
      />
      <TextBlock 
        text="Weight initialization proved critical for Session AI performance. When Base AI is cold (no training yet), it returns null weights. Session AI initializes with zeros in this case, leading to random recommendations. Once Base AI has training data, it returns actual coefficient and intercept values. Session AI loads these as starting weights, immediately benefiting from accumulated learning while retaining its ability to adapt quickly to session-specific patterns." 
        sectionTitle="Cold Start Handling" 
      />
      <CodeBlock
        language="typescript"
        sectionTitle="Session AI Initialization"
        caption="Loading Base AI weights or starting from scratch"
        code={`interface BaseAIWeights {
  coefficients: number[] | null;  // 43-dim weight vector
  intercept: number | null;
}

function initializeSessionAI(baseWeights: BaseAIWeights) {
  if (baseWeights.coefficients === null) {
    // Cold start: no Base AI training yet
    return {
      coef: new Array(43).fill(0),  // Zero weights
      intercept: 0,
      learningRate: 0.8  // Fast learning from scratch
    };
  } else {
    // Warm start: load Base AI knowledge
    return {
      coef: [...baseWeights.coefficients],  // Copy Base AI weights
      intercept: baseWeights.intercept,
      learningRate: 0.8  // Fast adaptation on top of base
    };
  }
}

// Session AI inherits Base AI's learned patterns
// but can quickly adapt to current session behavior`}
      />
      <TextBlock 
        text="This two-layer approach demonstrates something I've learned about ML system design: match learning rates to timescales of patterns. Session-level patterns (today I want chill activities) need fast learning. Cross-session patterns (I generally prefer outdoor activities) need slow learning. Using a single model with a single learning rate forces you to choose between responsiveness and stability. Separating these concerns allows both. The architecture might seem complex, but each layer solves a distinct problem, and both are simple SGD classifiers—just with different learning rates and persistence strategies." 
        sectionTitle="Design Principles" 
      />
      
      <TextBlock 
        text="This dual-AI architecture solves a real production ML problem: balancing immediate user value with long-term model stability. Session AI provides instant personalization (users see relevant recommendations within their first session), while Base AI ensures the system doesn't overfit to temporary preferences. This demonstrates my understanding of ML system design beyond just model training—architecture decisions that affect user experience, model stability, and system maintainability. The ability to design ML systems that balance competing requirements (responsiveness vs. stability) is essential for production AI applications."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default TwoLayerLearning;
