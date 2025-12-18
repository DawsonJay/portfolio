import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      <DemoBlock
        sectionTitle="Live Application"
        text="The WhatNow application is fully deployed and running. The frontend React application provides the interactive game interface where users select context tags and compare activities. The backend API handles AI recommendations using the two-layer learning architecture with Base AI and Session AI. Try the live application to experience the contextual bandit recommendation system in action."
        demos={[
          {
            label: 'Live App',
            url: 'https://whatnow-frontend.onrender.com',
            type: 'webapp',
          },
        ]}
      />
      <DemoBlock
        sectionTitle="Source Code"
        text="The WhatNow project is open source with separate repositories for the frontend and backend. The frontend is built with React, TypeScript, and Tailwind CSS, implementing the Session AI learning system in JavaScript. The backend uses FastAPI with PostgreSQL, implementing the Base AI with online learning capabilities."
        demos={[
          {
            label: 'Frontend GitHub',
            url: 'https://github.com/DawsonJay/whatnow-frontend',
            type: 'github',
          },
          {
            label: 'Backend GitHub',
            url: 'https://github.com/DawsonJay/whatnow-backend',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;

