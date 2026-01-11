import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const GraphQLAPIDesign = () => {
  return (
    <Article>
      <TitleBlock title="GraphQL API Design" />
      
      <TextBlock 
        text="I designed a GraphQL schema with nested types (Translation, TranslationChunk, WordMapping, Alternative) for structured translation data. I integrated Apollo Server with Next.js 16 App Router using proper route handler types. I used Prisma ORM for PostgreSQL with JSONB storage for flexible explanation data. The API provides type-safe data fetching while maintaining flexibility for complex nested structures."
        sectionTitle="Overview"
      />
      
      <TextBlock 
        text="I chose GraphQL over REST because the frontend needs very specific, nested data structures. A REST endpoint would either over-fetch (returning everything) or require multiple requests (one for translation, another for chunks, another for alternatives). GraphQL lets the frontend request exactly what it needs in a single query: the translation with all nested chunks, word mappings, and alternatives. This reduces network overhead and simplifies frontend state management."
        sectionTitle="Why GraphQL"
      />
      
      <TextBlock 
        text="I modeled the GraphQL schema around four main types. Translation is the root containing arrays of TranslationChunk and Alternative objects. TranslationChunk represents a semantic unit with its translation, word-by-word mappings, explanation, grammar rule, and cultural context. WordMapping pairs French words with English equivalents. Alternative provides alternative translations with explanations. This hierarchical structure matches the LLM response format and gives the frontend clear type definitions."
        sectionTitle="Schema Design"
      />

      <CodeBlock
        sectionTitle="GraphQL Schema"
        language="typescript"
        caption="Type definitions for the translation API with nested structures"
        code={`export const typeDefs = \`#graphql
  type WordMapping {
    french: String!
    english: String!
  }

  type TranslationChunk {
    index: Int!
    english: String!
    french: String!
    word_by_word: [WordMapping!]!
    explanation: String!
    grammar_rule: String
    cultural_context: String
  }

  type Alternative {
    translation: String!
    reason: String!
  }

  type Translation {
    chunks: [TranslationChunk!]!
    alternatives: [Alternative!]
  }

  type Query {
    _empty: String
  }

  type Mutation {
    translateText(englishText: String!): Translation!
  }
\``}
      />
      
      <TextBlock 
        text="The resolver connects the GraphQL layer to the OpenAI integration and database. The translateText mutation accepts English text, calls the OpenAI function, saves the result to PostgreSQL via Prisma, and returns the structured Translation object. I handle type mapping between the OpenAI response and GraphQL types, ensuring data consistency. Error handling at the resolver level provides meaningful GraphQL errors rather than exposing internal implementation details."
        sectionTitle="Resolver Implementation"
      />

      <CodeBlock
        sectionTitle="Translation Resolver"
        language="typescript"
        caption="Mutation resolver connecting OpenAI API to GraphQL and database"
        code={`export const resolvers = {
  Query: {
    _empty: () => null,
  },
  Mutation: {
    translateText: async (_: unknown, { englishText }: { englishText: string }) => {
      try {
        // Call OpenAI API
        const translationData = await translateText(englishText);

        // Save to database via Prisma
        await prisma.translation.create({
          data: {
            englishText,
            frenchTranslation: translationData.chunks
              .map(chunk => chunk.french)
              .join(' '),
            explanations: translationData.chunks as unknown as Prisma.InputJsonValue,
          },
        });

        // Return GraphQL response
        return {
          chunks: translationData.chunks,
          alternatives: translationData.alternatives || [],
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(\`Translation failed: \${error.message}\`);
        }
        throw new Error('Unknown error occurred during translation');
      }
    },
  },
};`}
      />
      
      <TextBlock 
        text="Integrating Apollo Server with Next.js 16 App Router required specific patterns. Next.js 16 wants explicit GET and POST function exports with proper NextRequest typing, not direct handler exports. I create the Apollo Server handler using startServerAndCreateNextHandler, then wrap it in explicit route handler functions. This ensures type safety and compatibility with Next.js's App Router while maintaining Apollo Server's functionality."
        sectionTitle="Next.js 16 Integration"
      />

      <CodeBlock
        sectionTitle="Route Handler Setup"
        language="typescript"
        caption="Apollo Server integration with Next.js 16 App Router using explicit route handlers"
        code={`import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers/translation';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}`}
      />
      
      <TextBlock 
        text="I use Prisma ORM with PostgreSQL for type-safe database access. The Translation model stores English text, French translation, and explanations as JSONB. JSONB storage gives me flexibility for the nested explanation structure while maintaining query performance. Prisma's type generation ensures TypeScript types match the database schema exactly, catching type mismatches at compile time. I included an index on createdAt for efficient history queries if I add that feature later."
        sectionTitle="Database with Prisma"
      />

      <CodeBlock
        sectionTitle="Prisma Schema"
        language="typescript"
        caption="Database model using JSONB for flexible explanation storage"
        code={`model Translation {
  id                Int      @id @default(autoincrement())
  englishText       String   @db.Text
  frenchTranslation String   @db.Text
  explanations      Json?
  createdAt         DateTime @default(now())
  userId            Int?

  @@index([createdAt])
}`}
      />
      
      <TextBlock 
        text="Type casting between Prisma's InputJsonValue and TypeScript types needed careful handling. Prisma's strict typing prevents direct casts from complex objects to InputJsonValue. I use double casting through unknown as an intermediate type, which satisfies TypeScript's type checker while maintaining runtime safety. This pattern is common when working with Prisma's JSON fields and complex nested structures."
        sectionTitle="Type Safety Patterns"
      />
      
      <TextBlock 
        text="The API design demonstrates principles I care about: separation of concerns (schema, resolvers, business logic), type safety throughout (GraphQL types, TypeScript types, Prisma types), flexible data modeling (JSONB for complex structures), and proper error handling (meaningful errors without exposing internals). The API provides a clean interface for the frontend while abstracting the complexity of LLM integration and database operations."
        sectionTitle="Design Principles"
      />
      
      <TextBlock 
        text="This GraphQL API design shows my ability to work with modern API patterns and integrate multiple systems (LLM APIs, databases, frontend frameworks). The type-safe approach catches errors at compile time, reducing production bugs. The JSONB storage choice balances flexibility with query performance. Integrating Apollo Server with Next.js 16 required understanding both frameworks' patterns and finding the right compatibility approach. This demonstrates full-stack API design skills: schema design, resolver implementation, database modeling, and framework integration—all essential for building production APIs."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default GraphQLAPIDesign;
