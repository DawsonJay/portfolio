import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TheDatasetProblem = () => {
  return (
    <Article>
      <TitleBlock title="The Dataset Problem" />
      <TextBlock 
        text="Learned from CV project failures that dataset quality matters more than model architecture. Pivoted to activity recommendations where user interactions generate training data automatically."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="WhatNow began as a solution to a frustrating pattern I'd encountered across multiple computer vision projects. My previous projects—Jam Hot (fruit classification) and Cirrus (weather AI)—both failed in production despite promising validation metrics. The Fruit-360 dataset achieved 86% validation accuracy but delivered 0% accuracy on real-world photos. The controlled environment of academic datasets simply didn't translate to messy reality." 
        sectionTitle="The Breaking Point" 
      />
      <TextBlock 
        text="The core issue was dataset quality, not model architecture or training approaches. Academic datasets are captured in perfect conditions: consistent lighting, uniform backgrounds, standard angles. Real-world data is chaotic. A photo of an apple on a kitchen counter, partially in shadow, next to other objects, from an awkward angle—these conditions break models trained on pristine datasets. Pre-trained models could help, but using them felt like defeating the portfolio purpose of demonstrating ML capability." 
        sectionTitle="Understanding the Root Cause" 
      />
      <TextBlock 
        text="I needed a different approach entirely: an AI project that generates its own training data through real usage. Instead of collecting thousands of labeled images upfront, the system would learn from actual user interactions. Each choice a user makes becomes a training example. This approach solves three problems simultaneously: no need for massive pre-existing datasets, training happens on real-world data from day one, and the project can actually finish and deploy." 
        sectionTitle="The Solution Pattern" 
      />
      <TextBlock 
        text="Activity recommendation emerged as the ideal domain for this approach. Users describe their current context (mood, weather, energy level), receive activity suggestions, and make choices. Every choice is a labeled training example: this context led to selecting this activity. Unlike computer vision where labeling requires manual work, here the user's natural interaction with the system generates labels automatically. The AI learns what activities people actually choose in different contexts." 
        sectionTitle="Why Activity Recommendations" 
      />
      <TextBlock 
        text="The project also solved a personal problem: decision fatigue. When you have free time but can't decide what to do with it, scrolling through options becomes exhausting. An AI that learns your preferences and suggests activities based on current context provides genuine utility. This personal stake meant I'd actually use the system, generating training data through natural use rather than contrived test scenarios." 
        sectionTitle="Personal Utility" 
      />
      <TextBlock 
        text="Choosing contextual bandits over deep learning was deliberate. Bandits work with limited data, handle cold-start problems gracefully, train quickly, and remain interpretable. Deep learning would require thousands of examples before producing useful results. Bandits can start making reasonable suggestions after dozens of examples, then continuously improve. For a portfolio project that needs to finish and deploy, this pragmatic choice made the difference between completion and abandonment." 
        sectionTitle="Technical Approach" 
      />
      <TextBlock 
        text="The decision to focus on data generation over model complexity reflects a key insight from failed projects: in machine learning, data quality matters more than model sophistication. A simple model trained on good data outperforms a complex model trained on poor data. By designing the system to generate its own high-quality training data through actual usage, WhatNow addressed the root cause of previous failures." 
        sectionTitle="Lessons Applied" 
      />
    </Article>
  );
};

export default TheDatasetProblem;

