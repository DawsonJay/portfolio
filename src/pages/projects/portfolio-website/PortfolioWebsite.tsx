import ArticleReader from '../../../components/article/ArticleReader';
import TheatricalDioramaDesign from './TheatricalDioramaDesign';
import ComponentArchitectureEvolution from './ComponentArchitectureEvolution';
import RouteDrivenPreviewSystem from './RouteDrivenPreviewSystem';
import ArticleSystemAndContentOrg from './ArticleSystemAndContentOrg';
import TwoPanelLayoutResponsive from './TwoPanelLayoutResponsive';
import IterativeProblemSolving from './IterativeProblemSolving';
import FutureVision from './FutureVision';
import Demos from './Demos';

const PortfolioWebsite = () => {
  return (
    <ArticleReader>
      <TheatricalDioramaDesign />
      <ComponentArchitectureEvolution />
      <RouteDrivenPreviewSystem />
      <ArticleSystemAndContentOrg />
      <TwoPanelLayoutResponsive />
      <IterativeProblemSolving />
      <FutureVision />
      <Demos />
    </ArticleReader>
  );
};

export default PortfolioWebsite;

