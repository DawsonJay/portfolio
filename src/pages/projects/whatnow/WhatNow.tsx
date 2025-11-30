import ArticleReader from '../../../components/article/ArticleReader';
import ProjectInception from './ProjectInception';
import TechnicalArchitecture from './TechnicalArchitecture';
import ChallengesAndSolutions from './ChallengesAndSolutions';

const WhatNow = () => {
  return (
    <ArticleReader>
      <ProjectInception />
      <TechnicalArchitecture />
      <ChallengesAndSolutions />
    </ArticleReader>
  );
};

export default WhatNow;
