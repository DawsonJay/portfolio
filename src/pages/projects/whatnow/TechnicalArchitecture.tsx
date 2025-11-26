import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';

const TechnicalArchitecture = () => {
  return (
    <Article>
      <TitleBlock title="Technical Architecture" />
      <TextBlock text="The technical architecture of WhatNow evolved through several iterations as we learned more about the system's requirements and constraints. Initially, we designed a monolithic application, but quickly realized that a microservices architecture would better serve our needs for scalability and independent deployment of different components." sectionTitle="Architecture Evolution" />
      <TextBlock text="The recommendation engine itself is built on a neural network architecture that combines multiple input streams: user behavior history, contextual signals like time of day and device type, content metadata, and explicit user preferences. We experimented with various network architectures, eventually settling on a transformer-based approach that could effectively model the relationships between these different input types." sectionTitle="Neural Network Design" />
      <TextBlock text="For the backend infrastructure, we chose to build on AWS, leveraging services like ECS for container orchestration, RDS for managed databases, and S3 for data storage. This cloud-native approach allowed us to scale resources dynamically based on demand, which was crucial during peak usage periods." sectionTitle="AWS Infrastructure" />
      <TextBlock text="The real-time recommendation service required careful optimization to meet latency requirements. Users expect recommendations to appear almost instantly, so we implemented a multi-tier caching strategy using Redis. Frequently accessed recommendations are cached at multiple levels, reducing database load and improving response times." sectionTitle="Caching Strategy" />
      <TextBlock text="Data preprocessing became a critical component of the system. We built robust ETL pipelines that could handle data cleaning, feature engineering, and transformation at scale. These pipelines run continuously, ensuring that our models always have access to the most current and accurate data." sectionTitle="ETL Pipelines" />
      <TextBlock text="Model training infrastructure was another significant technical challenge. We set up distributed training capabilities using multiple GPUs, allowing us to train larger models in reasonable timeframes. The training pipeline includes automated hyperparameter tuning and model versioning, enabling us to systematically improve model performance." sectionTitle="Training Infrastructure" />
      <TextBlock text="The frontend is built with React and TypeScript, providing a modern, responsive user experience. We implemented a component-based architecture that allows for easy testing and maintenance. State management uses Redux, which proved essential for managing the complex state of user interactions and recommendation updates." sectionTitle="Frontend Architecture" />
      <TextBlock text="API design was a key focus area, as we needed to support both web and mobile clients. We developed a RESTful API with GraphQL endpoints for more complex queries. The API includes comprehensive rate limiting, authentication, and error handling to ensure reliability and security." sectionTitle="API Design" />
      <TextBlock text="Monitoring and observability were built into the system from the beginning. We integrated tools like Prometheus for metrics collection and Grafana for visualization, allowing us to track system performance, model accuracy, and user engagement metrics in real-time. This visibility proved invaluable for identifying and resolving issues quickly." sectionTitle="Monitoring" />
      <TextBlock text="The deployment process is fully automated using CI/CD pipelines built on GitHub Actions. Each code change triggers automated tests, and successful builds are automatically deployed to staging environments. Production deployments require manual approval, but the process is streamlined to allow for rapid iteration while maintaining stability." sectionTitle="CI/CD Pipeline" />
    </Article>
  );
};

export default TechnicalArchitecture;
