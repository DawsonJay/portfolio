import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const ProductionDeployment = () => {
  return (
    <Article>
      <TitleBlock title="Production Deployment" />
      
      <TextBlock 
        text="I deployed to Railway via GitHub integration. Build initially failed because the OpenAI client checked for the API key at module load time (build phase), when environment variables aren't available. Fixed with lazy initialization—defer client creation until runtime. Also fixed Next.js 16 route handler types and Prisma configuration. This demonstrates understanding of build-time vs runtime separation in cloud deployments."
        sectionTitle="Overview"
      />
      
      <TextBlock 
        text="Railway deployment uses GitHub integration for automatic deployments. When I push code to the main branch, Railway automatically detects the Next.js project, runs the build, and deploys. Railway provides a PostgreSQL service that automatically sets DATABASE_URL. The process includes running Prisma migrations to set up the database schema. This continuous deployment workflow lets me iterate rapidly without manual deployment steps."
        sectionTitle="Railway Setup"
      />
      
      <TextBlock 
        text="The first deployment failed with 'OPENAI_API_KEY is not set in environment variables' during the build phase. This revealed something I didn't understand about cloud deployments: when code executes. The OpenAI client was being initialized at module load time (eager initialization), which happens during the build. Railway doesn't provide environment variables during build—they're only available at runtime when the application starts. This is a security and architecture decision common to most deployment platforms."
        sectionTitle="The Build Failure"
      />

      <CodeBlock
        sectionTitle="Eager Initialization (Broken)"
        language="typescript"
        caption="This pattern fails during build because environment variables aren't available"
        code={`// ❌ BROKEN: Eager initialization at module load time
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This code runs during build, causing deployment failure`}
      />

      <CodeBlock
        sectionTitle="Lazy Initialization (Fixed)"
        language="typescript"
        caption="Defer client creation until runtime when environment variables are available"
        code={`// ✅ FIXED: Lazy initialization defers check until runtime
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function translateText(englishText: string): Promise<TranslationResponse> {
  // Client is only created when this function is called (runtime)
  const openai = getOpenAIClient();
  
  // Use the client...
}`}
      />
      
      <TextBlock 
        text="Lazy initialization solves the build-time problem by deferring client creation until the translateText function is actually called. This happens at runtime when a user requests a translation, not during the build. The environment variable check still occurs—it just happens at the right time. If the API key is missing at runtime, the error is appropriate and actionable. This pattern is essential for any code that depends on runtime configuration like API keys or database connections."
        sectionTitle="Why Lazy Initialization Works"
      />
      
      <TextBlock 
        text="Next.js 16 App Router introduced stricter type requirements for route handlers. My initial implementation exported the Apollo Server handler directly, but Next.js 16 requires explicit GET and POST function exports with proper NextRequest typing. I wrapped the Apollo handler in explicit route handler functions. This ensures type safety and compatibility with Next.js's routing system. The type error during build actually prevented a runtime issue—demonstrating the value of TypeScript's compile-time checks."
        sectionTitle="Next.js 16 Types"
      />

      <CodeBlock
        sectionTitle="Route Handler Fix"
        language="typescript"
        caption="Explicit route handlers for Next.js 16 App Router compatibility"
        code={`// Before: Direct export (type error)
const handler = startServerAndCreateNextHandler(server);
export { handler as GET, handler as POST };

// After: Explicit function exports with NextRequest
const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}`}
      />
      
      <TextBlock 
        text="Prisma configuration required attention to version-specific patterns. The project uses Prisma 6, which reads DATABASE_URL directly from environment variables via schema.prisma. I initially tried Prisma 7 configuration patterns (a separate config.ts file), which caused build errors because the required packages weren't available. I removed the unnecessary configuration file and let Prisma 6 work as designed. This taught me to match configuration patterns to the actual library versions."
        sectionTitle="Prisma Configuration"
      />
      
      <TextBlock 
        text="Database migrations must be tracked in git for Railway deployment. The default .gitignore excludes prisma/migrations, but Railway needs access to migration files to set up the database schema. I commented out the migrations ignore rule, committed the migration files, and added a db:migrate:deploy script for production migrations. Railway can then run migrations during deployment or via the CLI. This ensures the database schema matches the application code."
        sectionTitle="Migration Strategy"
      />

      <CodeBlock
        sectionTitle="Build Scripts"
        language="json"
        caption="Package.json scripts for production build and deployment"
        code={`{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "db:migrate:deploy": "prisma migrate deploy"
  }
}`}
      />
      
      <TextBlock 
        text="The build process follows a specific sequence on Railway. First, npm install runs and triggers the postinstall hook, which runs prisma generate. Second, npm run build executes, running prisma generate again (defensive) and building Next.js. Third, npm start launches the production server. This ensures the Prisma client is available during build and the application is properly configured. Environment variables are injected at the start phase, making them available at runtime."
        sectionTitle="Build Sequence"
      />
      
      <TextBlock 
        text="The deployment experience taught me several things. Build-time and runtime are separate phases with different capabilities—code that runs during build can't access runtime configuration. Lazy initialization is essential for external service clients. TypeScript's strict typing catches deployment issues before production. Platform auto-detection often works better than manual configuration. And database migrations must be tracked in version control. These patterns apply broadly to cloud deployments, not just Railway."
        sectionTitle="What I Learned"
      />
      
      <TextBlock 
        text="This deployment work demonstrates my understanding of cloud deployment patterns and build-time vs runtime separation. The lazy initialization fix solved a critical production blocker that would have prevented deployment. Understanding Prisma migration strategies, Next.js build processes, and Railway's deployment pipeline shows I can work with modern deployment platforms effectively. The ability to debug deployment issues (build failures, environment variable access, database migrations) is essential for production applications. This work shows I can deploy full-stack applications to production and handle the edge cases that only appear in real deployment scenarios."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default ProductionDeployment;
