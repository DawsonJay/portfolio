import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const ProjectInception = () => {
  return (
    <Article>
      <TitleBlock title="Project Inception" />
      <TextBlock text="WhatNow began as an exploration into how we could leverage machine learning to solve a real-world problem that many people face daily: the challenge of making informed decisions when overwhelmed by too many options. The initial concept emerged from personal frustration with decision fatigue, particularly when trying to choose what to watch, read, or do next from an ever-expanding pool of possibilities." sectionTitle="Initial Concept" />
      <TextBlock text="The project started with extensive research into existing recommendation systems and their limitations. We discovered that most recommendation engines focus on similarity matching or popularity metrics, but few address the nuanced problem of helping users make decisions that align with their current mood, context, and deeper preferences. This gap became the core problem we set out to solve." sectionTitle="Research Phase" />
      <TextBlock text="Early prototyping involved creating simple proof-of-concept models that could analyze user behavior patterns and contextual signals. We experimented with various approaches, from collaborative filtering to content-based recommendations, but quickly realized that a hybrid approach would be necessary to capture the complexity of human decision-making." sectionTitle="Early Prototyping" />
      <TextBlock text="One of the first major decisions was choosing the right machine learning framework. After evaluating TensorFlow, PyTorch, and scikit-learn, we ultimately chose PyTorch for its flexibility and strong community support. This decision would prove crucial as the project evolved and we needed to iterate quickly on model architectures." sectionTitle="Framework Selection" />
      <TextBlock text="The data collection phase presented significant challenges. We needed to gather diverse, representative data that would allow our models to learn meaningful patterns without introducing bias. This required careful design of data collection mechanisms and ethical considerations around user privacy and consent." sectionTitle="Data Collection" />
      <TextBlock text="We built the initial data pipeline using Python and PostgreSQL, creating a system that could handle both real-time user interactions and batch processing of historical data. The architecture needed to be scalable from day one, as we anticipated rapid growth in both user base and data volume." sectionTitle="Data Pipeline" />
      <TextBlock text="The first working prototype took approximately three months to develop. During this phase, we focused on validating the core hypothesis: that contextual signals combined with user preferences could produce more relevant recommendations than traditional approaches. Early user testing showed promising results, with users reporting higher satisfaction with recommendations." sectionTitle="First Prototype" />
      <TextBlock text="Iteration became a key part of our development process. We established a cycle of building, testing, measuring, and refining that allowed us to continuously improve the recommendation quality. Each iteration brought new insights into how users interact with recommendations and what factors most influence their decision-making." sectionTitle="Iteration Process" />
      <TextBlock text="The user interface development ran parallel to the machine learning work, requiring close collaboration between the data science and frontend teams. We needed to design interfaces that could surface recommendations in intuitive ways while providing transparency about why specific suggestions were made." sectionTitle="UI Development" />
      <TextBlock text="As we approached the beta launch, we conducted extensive testing across different user segments and use cases. This testing phase revealed several edge cases and performance bottlenecks that we needed to address before public release. The feedback from beta testers was invaluable in shaping the final product." sectionTitle="Beta Testing" />
    </Article>
  );
};

export default ProjectInception;
