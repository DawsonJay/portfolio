import ArticleReader from '../../../components/article/ArticleReader';
import TheDatasetProblem from './TheDatasetProblem';
import FromMetadataToEmbeddings from './FromMetadataToEmbeddings';
import TwoLayerLearning from './TwoLayerLearning';
import PlatformMigration from './PlatformMigration';
import FrontendEvolution from './FrontendEvolution';
import Demos from './Demos';

const WhatNow = () => {
  return (
    <ArticleReader>
      <TheDatasetProblem />
      <FromMetadataToEmbeddings />
      <TwoLayerLearning />
      <PlatformMigration />
      <FrontendEvolution />
      <Demos />
    </ArticleReader>
  );
};

export default WhatNow;
