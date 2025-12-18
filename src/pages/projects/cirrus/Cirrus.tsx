import ArticleReader from '../../../components/article/ArticleReader';
import TheGridSystem from './TheGridSystem';
import SpatialInterpolation from './SpatialInterpolation';
import GeneticAlgorithmEvolution from './GeneticAlgorithmEvolution';
import DataEngineeringAtScale from './DataEngineeringAtScale';
import ProjectCancellation from './ProjectCancellation';
import Demos from './Demos';

const Cirrus = () => {
  return (
    <ArticleReader>
      <TheGridSystem />
      <SpatialInterpolation />
      <GeneticAlgorithmEvolution />
      <DataEngineeringAtScale />
      <ProjectCancellation />
      <Demos />
    </ArticleReader>
  );
};

export default Cirrus;

