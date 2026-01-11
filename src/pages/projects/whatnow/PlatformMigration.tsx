import Article from '../../../components/article/Article';
import TextBlock from '../../../components/article/TextBlock';
import TitleBlock from '../../../components/article/TitleBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const PlatformMigration = () => {
  return (
    <Article>
      <TitleBlock title="Platform Migration" />
      <TextBlock 
        text="I migrated from Railway to Render. scikit-learn wouldn't compile on Render's free tier. Built a lightweight SGD classifier using only NumPy—faster for online learning and deployment-friendly."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="WhatNow's backend was originally deployed on Railway, which I chose for its simplicity and generous free tier. The initial deployment worked beautifully: push to GitHub, automatic deployment, PostgreSQL database included, environment variables managed through their dashboard. Development moved quickly. Then Railway's trial period ended, and the free tier became insufficient for active development. I needed to migrate to Render without losing functionality." 
        sectionTitle="Why I Migrated" 
      />
      <TextBlock 
        text="The first migration attempt failed immediately: scikit-learn wouldn't compile on Render's build servers. Railway had handled scikit-learn's compilation requirements without issue, but Render's more restrictive build environment couldn't compile the native dependencies. The error logs showed compilation failures for numpy's C extensions and scipy's Fortran dependencies. I upgraded Python from 3.11 to 3.13, which helped but didn't solve the core problem: Render's free tier simply couldn't support heavy ML dependencies." 
        sectionTitle="The scikit-learn Problem" 
      />
      <TextBlock 
        text="I decided to implement a lightweight SGD classifier using only numpy and scipy, both of which compiled successfully on Render. I created LightweightSGDClassifier with the exact same interface as sklearn's SGDClassifier: partial_fit for online learning, predict_proba for scoring, and coef_/intercept_ for weight access. This let me replace sklearn without changing any other code." 
        sectionTitle="Custom Implementation" 
      />
      <CodeBlock
        language="python"
        sectionTitle="LightweightSGDClassifier"
        caption="Custom SGD implementation using only NumPy—no scikit-learn needed"
        code={`import numpy as np
from scipy.special import expit  # Sigmoid function

class LightweightSGDClassifier:
    """Lightweight SGD classifier for online learning"""
    
    def __init__(self, learning_rate=0.02):
        self.learning_rate = learning_rate
        self.coef_ = None
        self.intercept_ = 0.0
    
    def partial_fit(self, X, y):
        """Update weights with one batch of data"""
        if self.coef_ is None:
            # Initialize weights on first call
            self.coef_ = np.zeros(X.shape[1])
        
        # Compute predictions
        predictions = expit(np.dot(X, self.coef_) + self.intercept_)
        
        # Compute gradient
        errors = predictions - y
        grad_coef = np.dot(X.T, errors) / len(y)
        grad_intercept = np.mean(errors)
        
        # Update weights (gradient descent)
        self.coef_ -= self.learning_rate * grad_coef
        self.intercept_ -= self.learning_rate * grad_intercept
        
        return self
    
    def predict_proba(self, X):
        """Return probability predictions"""
        scores = expit(np.dot(X, self.coef_) + self.intercept_)
        return np.column_stack([1 - scores, scores])

# Drop-in replacement for sklearn.linear_model.SGDClassifier
# Faster for small batches, no compilation issues`}
      />
      <TextBlock 
        text="The implementation is pure Python with numpy operations—no compiled C extensions beyond numpy's basic functionality. This custom implementation is actually faster for small-scale online learning because it skips sklearn's extensive validation and checking. A happy accident from a forced constraint." 
        sectionTitle="Performance Benefits" 
      />
      <TextBlock 
        text="Migrating the database required attention to connection strings and SSL configuration. PostgreSQL on Railway used external connections without SSL requirements; Render's PostgreSQL requires SSL with specific parameters. I needed to append sslmode=require to the connection string. Additionally, Render's database URLs use a subtle difference in credential generation—I initially had authentication failures because the password contained characters that looked similar (digit '1' vs lowercase 'l'), causing copy-paste errors." 
        sectionTitle="Database Migration" 
      />
      <TextBlock 
        text="I used an API-based approach for data migration rather than direct database connection. I wrote upload_to_render.py that reads the local JSON file with 1,249 activities and embeddings, chunks them into batches of 100, and posts to the /activities/bulk-upload endpoint. This avoided database connection complexity and verified that the production API endpoints worked correctly for bulk operations. The script included verification: after upload, it queries /activities to confirm all 1,249 activities were stored correctly." 
        sectionTitle="Data Migration" 
      />
      <TextBlock 
        text="Deployment configuration needed updates for Render's environment. Railway used railway.json for configuration; Render uses Web Service settings in their dashboard. I created start.sh for the startup command, configured gunicorn for FastAPI deployment, and ensured all environment variables transferred correctly. One gotcha: Render's environment variable names are case-sensitive and can't contain certain special characters, requiring some variable renaming from Railway's original setup." 
        sectionTitle="Deployment Config" 
      />
      <TextBlock 
        text="The frontend migration followed the backend. Render's Static Site service required specific build and publish directory configuration. The key difference from Railway: Render expects the build command to produce a dist/ directory, and it won't automatically detect the output directory. I updated render.yaml with explicit build_command: npm run build and publish_dir: dist settings. The frontend also needed API URL updates from Railway's domain to Render's domain, easily handled through environment variables." 
        sectionTitle="Frontend Deployment" 
      />
      <TextBlock 
        text="TypeScript configuration caused unexpected build failures on Render that never appeared locally. Render's build environment is stricter about type definitions and module resolution. I loosened TypeScript strictness for cloud builds: disabled skipLibCheck, added allowSyntheticDefaultImports, and removed problematic type references. The development environment still enforces strict TypeScript for local development; production builds use more lenient settings. A pragmatic compromise that kept type safety during development while allowing successful cloud deployment." 
        sectionTitle="TypeScript Issues" 
      />
      <TextBlock 
        text="Dependency management required restructuring. Locally, build tools like Vite, Tailwind, and PostCSS can live in devDependencies. Render's production builds need these in regular dependencies because the build happens in the production environment. I moved vite, @vitejs/plugin-react, autoprefixer, postcss, and tailwindcss to dependencies, which resolved 'command not found' errors during Render's build process. Only development-only tools like ESLint and TypeScript type definitions stayed in devDependencies." 
        sectionTitle="Dependency Changes" 
      />
      <TextBlock 
        text="The complete migration took about six hours of work spread across two sessions: three hours migrating the backend and database, three hours migrating the frontend and fixing build issues. The system emerged cleaner: custom lightweight AI implementation removed heavyweight dependencies, API-based migration verified production endpoints, and stricter deployment environment caught configuration issues that might have become production bugs later. Sometimes platform constraints drive improvements that wouldn't happen otherwise." 
        sectionTitle="What I Learned" 
      />
    </Article>
  );
};

export default PlatformMigration;
