import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      
      <DemoBlock
        sectionTitle="Live Application"
        text="You can try out the live moh-ami application on Railway. Feel free to type in some English text and see how it translates to French with all the detailed explanations. It's a great way to get a feel for the interactive learning experience I built."
        demos={[
          {
            label: 'Live App',
            url: 'https://moh-ami-production.up.railway.app/',
            type: 'webapp',
          },
        ]}
      />
      
      <DemoBlock
        sectionTitle="Source Code"
        text="The complete source code is on GitHub—Next.js frontend, GraphQL API, Prisma database schema, OpenAI integration, and deployment configuration. The repository includes documentation for local development with Docker Compose for PostgreSQL, and detailed Railway deployment instructions."
        demos={[
          {
            label: 'GitHub Repository',
            url: 'https://github.com/DawsonJay/moh-ami',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;
