import ArticleReader from '../../../components/article/ArticleReader';
import TheOriginalVision from './TheOriginalVision';
import DesignEvolution from './DesignEvolution';
import EnclosureDesign from './EnclosureDesign';
import ComponentFailures from './ComponentFailures';
import HardwareIntegration from './HardwareIntegration';
import FutureVision from './FutureVision';
import Demos from './Demos';

const Atlantis = () => {
  return (
    <ArticleReader>
      <TheOriginalVision />
      <DesignEvolution />
      <EnclosureDesign />
      <ComponentFailures />
      <HardwareIntegration />
      <FutureVision />
      <Demos />
    </ArticleReader>
  );
};

export default Atlantis;
