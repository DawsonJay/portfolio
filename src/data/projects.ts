export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  previewDescription: string; // Detailed preview copy shown on /projects/preview/:projectName
  route: string;
  status: 'complete' | 'in-progress' | 'cancelled';
  progress?: number;
  tags: string[]; // Full list of all tags
  previewTags: string[]; // Most important tags for menu preview (max 7)
  category: 'ai-ml' | 'robotics' | 'hardware' | 'enterprise' | 'web-development';
}

export const projects: Project[] = [
  {
    id: 'whatnow',
    name: 'WhatNow',
    tagline: 'AI Recommendation System',
    description: 'Self-training contextual bandits that learn from user interactions',
    previewDescription:
      'WhatNow is an AI-powered activity recommendation system built around contextual bandits and two-layer learning. Users select contextual tags (mood, weather, time, energy level) and the system generates personalized activity suggestions from a database of 1,249 activities with semantic embeddings. The system uses a unique two-tier architecture: Base AI (slow learning, 0.02 rate) persists across sessions building long-term preference profiles, while Session AI (fast learning, 0.8 rate) provides immediate refinement during each interaction. The entire system is production-deployed with a React TypeScript frontend and FastAPI backend on Render.\n\nI started WhatNow after struggling with computer vision projects that failed due to real-world dataset quality issues—86% validation accuracy turning into 0% in practice. I needed an AI project that could actually finish, one that generates its own training data through real usage rather than requiring massive pre-existing datasets. The goal was to demonstrate end-to-end machine learning engineering: not just model training, but the full loop of data acquisition, architecture design, deployment, and continuous learning in production.\n\nThe project demonstrates systematic problem-solving through multiple pivots: from manual metadata (15+ fields per activity) to AI embeddings (384 dimensions), from scikit-learn to custom lightweight implementations for deployment constraints, from vanilla JavaScript to professional React architecture, and from Railway to Render when platform limitations emerged. It shows the ability to build production AI systems that work under real constraints, make pragmatic architectural trade-offs, and maintain functionality through major technical transitions. The focus was always on completing something that actually works, not just building a proof-of-concept.',
    route: 'what-now',
    status: 'complete',
    previewTags: ['AI/ML', 'React', 'TypeScript', 'Python', 'AWS', 'TensorFlow', 'Redis'],
    tags: [
      // Languages
      'Python',
      'TypeScript',
      'JavaScript',
      // Technologies
      'React',
      'Redux',
      'AWS',
      'Docker',
      'Redis',
      'PostgreSQL',
      'GraphQL',
      'Git',
      'Linux',
      // AI/ML
      'AI/ML',
      'TensorFlow',
    ],
    category: 'ai-ml',
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio',
    tagline: 'This Site - React Portfolio with Theatrical Diorama System',
    description: 'The site you\'re viewing now - a modern portfolio built with React, TypeScript, and styled-components featuring a unique theatrical diorama design system',
    previewDescription:
      'This site you\'re currently viewing is itself a portfolio project, built with modern web technologies and featuring a unique theatrical diorama design system inspired by shadow theatre and paper lantern aesthetics.\n\nThe site demonstrates React/TypeScript expertise through a reusable component architecture. The theatrical diorama system uses layered SVG animations with a color spectrum that transitions from dark tech surfaces to warm paper lantern colors, creating visual depth. Each layer is independently animated using a "clockwork" timing system for synchronized movement.\n\nKey technical features include a configuration-driven diorama system supporting multiple shapes and animations, route-driven project previews with URL state management, a comprehensive article system with reusable block components (text, code, demos), responsive two-panel layouts with shared components, and systematic refactoring documented through 40+ development sessions showing iterative problem-solving and architectural evolution.',
    route: 'portfolio-website',
    status: 'complete',
    progress: 100,
    previewTags: ['React', 'TypeScript', 'styled-components', 'Design Systems', 'Component Architecture'],
    tags: [
      // Languages
      'React',
      'TypeScript',
      // Build Tools
      'Vite',
      // Styling
      'styled-components',
      // Routing
      'React Router',
      // Optimization
      'SVG Optimization',
      'Performance Optimization',
      // Architecture
      'Design Systems',
      'Component Architecture',
      'Theme Systems',
      'State Management',
      'Navigation Patterns',
      // Design
      'Responsive Design',
      'Mobile-First Design',
      'Animation',
      'CSS Masking',
      'Accessibility',
      // Practices
      'Code Refactoring',
      'Documentation',
    ],
    category: 'web-development',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    tagline: 'Enterprise Component Systems',
    description: 'Professional work on enterprise-level component architecture',
    previewDescription:
      'Nexus represents my work on enterprise component systems for a Job Manager dashboard—building a foundation block architecture that enables rapid, consistent UI development across complex data visualization needs. The system uses atomic design principles with a hierarchy of composable blocks: foundation blocks handle grid positioning and state management, basic blocks add visual styling, ratio-specific wrappers (Block1x1, Block2x1, etc.) simplify the API, and assembled blocks integrate real data. The entire system is built with MUI styled components, integrates with Recharts for gradient-based data visualization, and follows Module Federation patterns for microfrontend architecture. The dashboard replaces a legacy interface with modern React, providing the first real visual monitoring for a distributed job processing system managing 49 queue types across multi-tenant SaaS infrastructure.\n\nI started this work to modernize an enterprise job management interface that had poor visibility and usability. The challenge wasn\'t just building a dashboard—it was designing a component system flexible enough to adapt as backend APIs evolved, maintainable enough for team collaboration, and robust enough to handle complex enterprise constraints. The project required deep system understanding before any UI work: analyzing job dispatcher architecture, understanding the distinction between Processing Threads (job producers) and Worker Threads (job consumers), and mapping data flow through hierarchical queue structures. The goal was to create not just a working interface, but a reusable foundation that other teams could build on.\n\nThe project demonstrates systematic architectural thinking through iterative refinement: separating layout from styling using MUI\'s sx prop pattern, extracting badges and labels into floating components for maximum content area, creating GridBlock for fractional layouts, and establishing theme-based spacing for consistency. It shows the ability to work within enterprise constraints (existing Nexus architecture, Module Federation integration, team collaboration patterns) while making pragmatic design decisions that balance flexibility with simplicity. The focus was on building a foundation that makes future development faster—not just solving the immediate problem, but creating patterns and systems that compound in value over time.',
    route: 'nexus',
    status: 'in-progress',
    progress: 60,
    previewTags: ['Enterprise', 'React', 'TypeScript', 'Architecture', 'Systems', 'JavaScript', 'Git'],
    tags: [
      // Languages
      'TypeScript',
      'JavaScript',
      // Technologies
      'React',
      'Git',
      // Domains
      'Enterprise',
      'Architecture',
      'Systems',
    ],
    category: 'enterprise',
  },
  {
    id: 'lunascope',
    name: 'Lunascope',
    tagline: 'Creative Hardware Project',
    description: 'Art + tech fusion with sustainable design principles',
    previewDescription:
      'Lunascope is a self-powered lunar phase clock using thermoelectric generator (TEG) energy harvesting to run indefinitely without external power or maintenance. The design captures ambient temperature differences and sunlight through a black-patinated copper clockface, generating 40-200mW to power ultra-low consumption electronics that track lunar cycles with 0.001125° precision. A 4.0F supercapacitor provides 91-day backup power for seasonal variations. The system is engineered for 20-30 year operation at 27.5mW average power, with conservative estimates showing 95%+ uptime across decades.\n\nI started Lunascope to explore constraint-driven innovation where limitations become design advantages. The $128 budget forced simplification that improved reliability—fewer components mean fewer failure points. The TEG power constraint (30-500mW range) drove environmental solutions: black copper patina absorbs heat efficiently, morning sunlight provides all-day energy storage, and the minimal engraving maintains 85-90% heat absorption while creating artistic moon phase indicators. These aren\'t compromises but integrated solutions where aesthetic choices serve thermal performance and power generation simultaneously.\n\nThe project demonstrates creative engineering thinking through extensive planning before component ordering. Strategic sourcing used AliExpress for expensive items (TEG modules, NEMA 8 motor, supercapacitors) and Amazon Prime for fast delivery parts (regulators, drivers), saving £20-30 while maintaining quality. The gear system pivot from PTX05 to NEMA 8 with 1:100 worm gear reduction solved mounting challenges while achieving required precision. Component selection balanced power consumption (0.2A motor vs 0.8A alternatives), backup duration (4.0F vs original 0.2F spec), and long-term reliability (crystal oscillators, solid-state electronics). The result is a system designed to last decades through thoughtful planning rather than expensive redundancy.',
    route: 'lunascope',
    status: 'in-progress',
    progress: 40,
    previewTags: ['Hardware', 'Creative Engineering', 'Sustainability'],
    tags: [
      // Domains
      'Hardware',
      'Creative Engineering',
      'Sustainability',
    ],
    category: 'hardware',
  },
  {
    id: 'atlantis',
    name: 'Atlantis',
    tagline: 'Underwater Robotics Platform',
    description: 'Hardware + software integration for autonomous underwater exploration',
    previewDescription:
      'Atlantis began as an ambitious underwater exploration drone project with a $500 budget constraint. The initial design featured autonomous navigation, a hybrid Raspberry Pi 4 + Pico processing architecture, brushless motor propulsion, camera systems, and comprehensive safety mechanisms including emergency weight release and acoustic beacons. The drone was named "The Momo" after a graphic novel character, and the project emphasized "Survivability Over Perfection"—prioritizing systems that ensure safe return over technical sophistication.\n\nI started Atlantis to expand from web development into robotics and hardware integration, demonstrating cross-domain engineering capabilities. The project evolved significantly through development: from autonomous underwater drone to surface boat with towed probe, from complex motor systems to simpler mapping-focused architecture, from ambitious AI navigation to practical lake bed surveying. These pivots weren\'t failures but responses to practical constraints—component damage during assembly, testing limitations, and clearer understanding of achievable scope within timeline and budget.\n\nThe project demonstrates hardware engineering through extensive 3D-printed enclosure design iterations, systematic component testing and failure analysis, and practical problem-solving when components fail. The controller enclosure went through multiple design attempts, learning that PLA+ clips are too brittle, that raised platforms solve alignment issues, and that 2mm clearances provide reliable friction fits. Component damage from soldering revealed the importance of breadboard testing before permanent assembly. The evolution from grand vision to practical implementation shows engineering maturity: recognizing when to pivot, learning from component failures, and building systems that actually work rather than chasing perfect designs that never finish.',
    route: 'atlantis',
    status: 'in-progress',
    progress: 20,
    previewTags: ['Robotics', 'Hardware', 'Embedded Systems', 'Python', 'Raspberry Pi', 'C++', 'Linux'],
    tags: [
      // Languages
      'Python',
      'C++',
      // Technologies
      'Linux',
      'Git',
      // Domains
      'Robotics',
      'Hardware',
      'Embedded Systems',
      'Raspberry Pi',
    ],
    category: 'robotics',
  },
  {
    id: 'cirrus',
    name: 'Cirrus',
    tagline: 'Wildfire Prediction System',
    description: 'AI-powered wildfire risk prediction using genetic algorithms and spatial interpolation',
    previewDescription:
      'Cirrus was an ambitious wildfire prediction system that combined genetic algorithm evolution, spatial interpolation, and large-scale data engineering to predict wildfire risk across southern Canada. The system divided Canada into 121,484 curvature-adjusted 10km grid cells and used a multi-stage data pipeline to process 56 million weather records from NOAA and 438,000 wildfire events. The technical implementation included a dual-tier interpolation system achieving 100% grid coverage at 21,000+ records per second, KD-tree spatial indexing for efficient nearest-neighbor queries, and a genetic algorithm framework for evolving XGBoost models through competitive fitness tournaments with crossover and mutation operators.\n\nI started Cirrus to explore the intersection of spatial data systems and AI evolution while building something with real-world impact. The project represented a significant technical challenge: turning messy real-world weather station data into a consistent computational grid, then training AI models to predict complex environmental phenomena. The goal was to demonstrate advanced data engineering, spatial algorithms, genetic optimization, and the ability to work with large-scale scientific datasets—skills that transfer directly to other domains requiring spatial analysis or evolutionary optimization.\n\nThe project was terminated after discovering fundamental data quality issues that made accurate predictions impossible: precipitation coverage was only 31%, critical weather variables like wind speed and humidity were completely missing, and temperature coverage reached only 80%. Despite the sophisticated interpolation system, you cannot interpolate data that does not exist. This demonstrates professional judgment in recognizing when technical excellence cannot overcome inadequate source data, and the maturity to stop rather than continue building on an unsound foundation. The technical work completed—spatial grid systems, genetic algorithms, database optimization at scale—represents valuable engineering experience even though the project could not achieve its original goal.',
    route: 'cirrus',
    status: 'cancelled',
    progress: 75,
    previewTags: ['AI/ML', 'Python', 'XGBoost', 'GeoPandas', 'Data Engineering', 'Genetic Algorithms', 'SQLite'],
    tags: [
      // Languages
      'Python',
      // Technologies
      'XGBoost',
      'SQLite',
      'NumPy',
      'Pandas',
      'SciPy',
      'GeoPandas',
      'Fiona',
      'Shapely',
      'scikit-learn',
      'Multiprocessing',
      'KD-Tree',
      // Domains
      'AI/ML',
      'Data Engineering',
      'Genetic Algorithms',
      'Spatial Analysis',
      'Machine Learning',
      'Database Optimization',
      'Geospatial',
      'Parallel Processing',
      'NOAA Data',
    ],
    category: 'ai-ml',
  },
];

