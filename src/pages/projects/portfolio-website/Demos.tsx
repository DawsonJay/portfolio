import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';
import TextBlock from '../../../components/article/TextBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Resources" />

      <TextBlock
        text="You're currently viewing the live portfolio project right now. The site you're navigating through—with its theatrical diorama system, project previews, and article reader—is the completed project these articles describe. Every component, animation, and interaction you've experienced while browsing is part of the implementation discussed in the technical articles above."
        sectionTitle="Live Demo"
      />

      <DemoBlock
        text="The portfolio source code is available on GitHub. The repository includes all components, utilities, theme system, and documentation. You can explore the codebase to see the implementation details discussed in these articles."
        demos={[
          {
            label: 'View on GitHub',
            url: 'https://github.com/DawsonJay/portfolio-website',
          },
        ]}
        sectionTitle="Source Code"
      />
    </Article>
  );
};

export default Demos;

