import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      <DemoBlock
        sectionTitle="Source Code"
        text="The Cirrus project repository contains the complete data pipeline implementation, spatial interpolation algorithms, genetic algorithm evolution framework, and database optimization code. The codebase demonstrates production-quality spatial data processing, KD-tree indexing for efficient nearest-neighbor queries, vectorized NumPy operations for performance, and evolutionary AI optimization with crossover and mutation operators. While the project was cancelled due to data quality issues, the technical implementation represents sophisticated data engineering and AI systems work."
        demos={[
          {
            label: 'GitHub Repository',
            url: 'https://github.com/DawsonJay/cirrus-project',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;

