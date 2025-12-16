export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  route: string;
  status: 'complete' | 'in-progress';
  progress?: number;
  tags: string[]; // Full list of all tags
  previewTags: string[]; // Most important tags for menu preview (max 7)
  category: 'ai-ml' | 'robotics' | 'hardware' | 'enterprise';
}

export const projects: Project[] = [
  {
    id: 'whatnow',
    name: 'WhatNow',
    tagline: 'AI Recommendation System',
    description: 'Self-training contextual bandits that learn from user interactions',
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
    id: 'atlantis',
    name: 'Atlantis',
    tagline: 'Underwater Robotics Platform',
    description: 'Hardware + software integration for autonomous underwater exploration',
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
    id: 'lunascope',
    name: 'Lunascope',
    tagline: 'Creative Hardware Project',
    description: 'Art + tech fusion with sustainable design principles',
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
    id: 'nexus',
    name: 'Nexus',
    tagline: 'Enterprise Component Systems',
    description: 'Professional work on enterprise-level component architecture',
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
];

