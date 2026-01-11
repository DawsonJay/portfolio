import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TheDatasetProblem = () => {
  return (
    <Article>
      <TitleBlock title="The Dataset Problem" />
      <TextBlock 
        text="I learned from CV project failures that dataset quality matters more than model architecture. Pivoted to activity recommendations where user interactions generate training data automatically."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="WhatNow started because I was frustrated with a pattern I kept hitting in my computer vision projects. My previous projects—Jam Hot (fruit classification) and Cirrus (weather AI)—both looked promising in development but failed in production. The Fruit-360 dataset gave me 86% validation accuracy, but when I tested it on real-world photos? 0%. The controlled environment of academic datasets just didn't translate to messy reality." 
        sectionTitle="The Breaking Point" 
      />
      <TextBlock 
        text="I realized the core issue wasn't my model architecture or training approach—it was dataset quality. Academic datasets are captured in perfect conditions: consistent lighting, uniform backgrounds, standard angles. Real-world data is chaotic. A photo of an apple on a kitchen counter, partially in shadow, next to other objects, from an awkward angle—these conditions break models trained on pristine datasets. I could've used pre-trained models, but that felt like cheating the portfolio purpose of demonstrating ML capability." 
        sectionTitle="Understanding What Went Wrong" 
      />
      <TextBlock 
        text="I needed a completely different approach: an AI project that generates its own training data through real usage. Instead of collecting thousands of labeled images upfront, the system would learn from actual user interactions. Each choice a user makes becomes a training example. This solves three problems at once: no need for massive pre-existing datasets, training happens on real-world data from day one, and the project can actually finish and deploy." 
        sectionTitle="The New Approach" 
      />
      <TextBlock 
        text="Activity recommendation emerged as perfect for this. Users describe their current context (mood, weather, energy level), get activity suggestions, and make choices. Every choice is a labeled training example: this context led to selecting this activity. Unlike computer vision where labeling requires manual work, here the user's natural interaction with the system generates labels automatically. The AI learns what activities people actually choose in different contexts." 
        sectionTitle="Why Activity Recommendations" 
      />
      <TextBlock 
        text="The project also solved a personal problem I had: decision fatigue. When I have free time but can't decide what to do with it, scrolling through options is exhausting. An AI that learns my preferences and suggests activities based on current context provides genuine utility. This personal stake meant I'd actually use the system, generating training data through natural use rather than contrived test scenarios." 
        sectionTitle="Personal Utility" 
      />
      <TextBlock 
        text="I chose contextual bandits over deep learning deliberately. Bandits work with limited data, handle cold-start problems gracefully, train quickly, and remain interpretable. Deep learning would require thousands of examples before producing useful results. Bandits can start making reasonable suggestions after dozens of examples, then continuously improve. For a portfolio project that needs to finish and deploy, this pragmatic choice made the difference between completion and abandonment." 
        sectionTitle="Technical Decisions" 
      />
      <TextBlock 
        text="The decision to focus on data generation over model complexity reflects something I learned from those failed projects: in machine learning, data quality matters more than model sophistication. A simple model trained on good data outperforms a complex model trained on poor data. By designing the system to generate its own high-quality training data through actual usage, WhatNow addressed the root cause of my previous failures." 
        sectionTitle="What I Learned" 
      />
      
      <TextBlock 
        text="This pivot demonstrates my ability to recognize fundamental problems and redesign systems rather than persisting with flawed approaches. The shift from computer vision to activity recommendations eliminated the dataset quality issue entirely by generating training data through user interactions. This shows strategic thinking: when a core assumption is wrong (that academic datasets translate to real-world performance), I can pivot to approaches that address root causes rather than symptoms. This ability to recognize when to change direction rather than double down is valuable in professional development where requirements evolve and initial assumptions prove incorrect."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default TheDatasetProblem;

