import { useParams } from 'react-router-dom';
import WhatNow from './projects/whatnow/WhatNow';
import Atlantis from './projects/atlantis/Atlantis';
import Lunascope from './projects/lunascope/Lunascope';
import Nexus from './projects/nexus/Nexus';
import Cirrus from './projects/cirrus/Cirrus';
import PortfolioWebsite from './projects/portfolio-website/PortfolioWebsite';
import MohAmi from './projects/moh-ami/MohAmi';

const Project = () => {
  const { projectName } = useParams<{ projectName: string }>();

  switch (projectName) {
    case 'what-now':
      return <WhatNow />;
    case 'atlantis':
      return <Atlantis />;
    case 'lunascope':
      return <Lunascope />;
    case 'nexus':
      return <Nexus />;
    case 'cirrus':
      return <Cirrus />;
    case 'portfolio-website':
      return <PortfolioWebsite />;
    case 'moh-ami':
      return <MohAmi />;
    default:
      return <div>Project not found</div>;
  }
};

export default Project;

