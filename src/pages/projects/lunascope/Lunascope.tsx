import ArticleReader from '../../../components/article/ArticleReader';
import ThePowerChallenge from './ThePowerChallenge';
import ConstraintDrivenDesign from './ConstraintDrivenDesign';
import LongevityEngineering from './LongevityEngineering';
import ArtisticIntegration from './ArtisticIntegration';
import ComponentSourcing from './ComponentSourcing';

const Lunascope = () => {
  return (
    <ArticleReader>
      <ThePowerChallenge />
      <ConstraintDrivenDesign />
      <LongevityEngineering />
      <ArtisticIntegration />
      <ComponentSourcing />
    </ArticleReader>
  );
};

export default Lunascope;
