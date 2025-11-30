import ArticleReader from '../../components/article/ArticleReader';
import BinaryStars from './BinaryStars';
import ArtToTechnology from './ArtToTechnology';
import TeamBuilding from './TeamBuilding';
import EnvironmentalTechnology from './EnvironmentalTechnology';
import ValuesLearning from './ValuesLearning';
import MovingToCanada from './MovingToCanada';

const About = () => {
  return (
    <ArticleReader>
      <BinaryStars />
      <ArtToTechnology />
      <TeamBuilding />
      <EnvironmentalTechnology />
      <ValuesLearning />
      <MovingToCanada />
    </ArticleReader>
  );
};

export default About;

