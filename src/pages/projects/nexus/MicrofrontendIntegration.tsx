import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const MicrofrontendIntegration = () => {
  return (
    <Article>
      <TitleBlock title="Microfrontend Integration" />
      <TextBlock 
        text="TL;DR: Dashboard integrates into existing MFE architecture using Module Federation. Standalone development with shared dependencies. Consistent theming through MUI."
        sectionTitle="Overview"
      />
      <TextBlock 
        text="The Nexus platform uses a microfrontend architecture where independently developed applications plug into a central portal host. Each microfrontend (MFE) is like a game cartridge—it exposes specific components (App and navigation) through Module Federation, and the Nexus portal loads them dynamically at runtime. This enables independent development and deployment: teams can work on their MFEs without coordinating releases with the entire platform."
        sectionTitle="Game Cartridge Architecture"
      />
      <TextBlock 
        text="Setting up the Job Manager MFE required understanding this integration pattern deeply. I configured Vite with the Module Federation plugin to expose two critical components: the main App component and a navigation initializer. The App component receives props from Nexus (basename for routing, proxy for API calls, standalone flag for development mode) and renders the dashboard. The navigation initializer registers menu items in the Nexus sidebar, defining where the MFE appears in the portal's navigation structure."
        sectionTitle="Integration Setup"
      />
      <TextBlock 
        text="The dual build strategy was essential for development velocity. In standalone mode (pnpm dev), the MFE runs independently on localhost:3001 with mock data, enabling rapid iteration without starting the entire Nexus platform. In federated mode (full Nexus build), the MFE integrates with the portal, accessing real authentication, API proxying via YARP, and shared dependencies like React and React Query. This separation meant I could develop the foundation block system in standalone mode, then test integration separately."
        sectionTitle="Dual Build Strategy"
      />
      <TextBlock 
        text={'Module Federation\'s shared dependencies configuration was critical for avoiding version conflicts. React and React Query are marked as shared with singleton: true, ensuring only one copy loads even when multiple MFEs use them. This prevents the "multiple React instances" error that breaks hooks and context. The configuration also specifies requiredVersion to catch incompatibilities at build time rather than runtime.'}
        sectionTitle="Shared Dependencies"
      />
      <TextBlock 
        text="Authentication integration followed the token exchange pattern (RFC 8693). The Nexus gateway handles OIDC authentication and exchanges tokens for least-privilege scopes per upstream API. The Job Manager MFE doesn't handle auth directly—it makes API calls through the Nexus proxy, which automatically attaches the correct tokens via YARP configuration. This centralized auth pattern simplifies MFE development while maintaining security boundaries. The entire integration pattern—Module Federation, dual builds, shared dependencies, token exchange—creates a framework where teams can build features independently while maintaining a cohesive user experience."
        sectionTitle="Authentication Pattern"
      />
    </Article>
  );
};

export default MicrofrontendIntegration;

