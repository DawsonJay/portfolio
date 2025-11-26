import { useParams } from 'react-router-dom';
import WhatNow from './projects/whatnow/WhatNow';

const Project = () => {
  const { projectName } = useParams<{ projectName: string }>();

  switch (projectName) {
    case 'what-now':
      return <WhatNow />;
    default:
      return <div>Project not found</div>;
  }
};

export default Project;

