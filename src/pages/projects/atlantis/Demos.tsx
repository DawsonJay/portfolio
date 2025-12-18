import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import DemoBlock from '../../../components/article/DemoBlock';

const Demos = () => {
  return (
    <Article>
      <TitleBlock title="Demos & Resources" />
      <DemoBlock
        sectionTitle="Source Code"
        text="The Atlantis Project repository contains Python sensor integration code, hardware documentation, development logs, and technical specifications. The codebase includes sensor testing scripts, UART communication protocols for Raspberry Pi coordination, component wiring diagrams, and comprehensive troubleshooting documentation demonstrating embedded systems development methodology."
        demos={[
          {
            label: 'GitHub Repository',
            url: 'https://github.com/DawsonJay/atlantis-project',
            type: 'github',
          },
        ]}
      />
    </Article>
  );
};

export default Demos;

