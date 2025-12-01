export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  route: string;
  status: 'complete' | 'in-progress';
  progress?: number;
  tags: string[];
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
    tags: ['AI/ML', 'React', 'TypeScript', 'Python'],
    category: 'ai-ml',
  },
  {
    id: 'atlantis',
    name: 'Atlantis',
    tagline: 'Underwater Robotics Platform',
    description: 'Hardware + software integration for autonomous underwater exploration',
    route: 'atlantis',
    status: 'in-progress',
    progress: 60,
    tags: ['Robotics', 'Hardware', 'Embedded Systems', 'Python'],
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
    tags: ['Hardware', 'Creative Engineering', 'Sustainability'],
    category: 'hardware',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    tagline: 'Enterprise Component Systems',
    description: 'Professional work on enterprise-level component architecture',
    route: 'nexus',
    status: 'in-progress',
    progress: 80,
    tags: ['Enterprise', 'React', 'TypeScript', 'Architecture'],
    category: 'enterprise',
  },
];

