import ArticleReader from '../../../components/article/ArticleReader';
import TheCoreConcept from './TheCoreConcept';
import LLMIntegrationAndPromptEngineering from './LLMIntegrationAndPromptEngineering';
import GraphQLAPIDesign from './GraphQLAPIDesign';
import InteractiveUIAndChunkSelection from './InteractiveUIAndChunkSelection';
import ProductionDeployment from './ProductionDeployment';
import Demos from './Demos';

const MohAmi = () => {
  return (
    <ArticleReader>
      <TheCoreConcept />
      <LLMIntegrationAndPromptEngineering />
      <GraphQLAPIDesign />
      <InteractiveUIAndChunkSelection />
      <ProductionDeployment />
      <Demos />
    </ArticleReader>
  );
};

export default MohAmi;

