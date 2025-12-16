import { type ReactElement } from 'react';
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiRobotframework,
  SiArduino,
  SiRaspberrypi,
  SiJavascript,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiLinux,
  SiCplusplus,
  SiRust,
  SiGo,
  SiOpenjdk,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiGooglecloud,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiStyledcomponents,
  SiRedux,
  SiGraphql,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
} from 'react-icons/si';
import { FaCode, FaCog, FaLeaf, FaBuilding, FaMicrochip, FaProjectDiagram } from 'react-icons/fa';

/**
 * Technology icon category mapping
 * Categorizes tags into: 'language', 'technology', or 'domain'
 */
const technologyCategoryMap: Record<string, 'language' | 'technology' | 'domain'> = {
  // Languages
  'TypeScript': 'language',
  'JavaScript': 'language',
  'Python': 'language',
  'C++': 'language',
  'Rust': 'language',
  'Go': 'language',
  'Java': 'language',
  
  // Technologies
  'React': 'technology',
  'Node.js': 'technology',
  'HTML': 'technology',
  'CSS': 'technology',
  'Tailwind CSS': 'technology',
  'Styled Components': 'technology',
  'Vue': 'technology',
  'Angular': 'technology',
  'Svelte': 'technology',
  'Next.js': 'technology',
  'Vite': 'technology',
  'MongoDB': 'technology',
  'PostgreSQL': 'technology',
  'AWS': 'technology',
  'Google Cloud': 'technology',
  'Docker': 'technology',
  'Linux': 'technology',
  'Git': 'technology',
  'TensorFlow': 'technology',
  'PyTorch': 'technology',
  'AI/ML': 'technology',
  'AI': 'technology',
  'ML': 'technology',
  'Machine Learning': 'technology',
  'Redux': 'technology',
  'GraphQL': 'technology',
  'Prometheus': 'technology',
  'Grafana': 'technology',
  'GitHub Actions': 'technology',
  'CI/CD': 'technology',
  
  // Domains
  'Robotics': 'domain',
  'Hardware': 'domain',
  'Embedded Systems': 'domain',
  'Arduino': 'domain',
  'Raspberry Pi': 'domain',
  'Enterprise': 'domain',
  'Creative Engineering': 'domain',
  'Sustainability': 'domain',
  'Architecture': 'domain',
  'Systems': 'domain',
};

/**
 * Technology icon mapping
 * Maps project tags to react-icons components
 */
const technologyIconMap: Record<string, () => ReactElement> = {
  // Core Technologies
  React: () => <SiReact />,
  'TypeScript': () => <SiTypescript />,
  'JavaScript': () => <SiJavascript />,
  'Python': () => <SiPython />,
  'Node.js': () => <SiNodedotjs />,
  'C++': () => <SiCplusplus />,
  'Rust': () => <SiRust />,
  'Go': () => <SiGo />,
  'Java': () => <SiOpenjdk />,
  
  // Web Technologies
  'HTML': () => <SiHtml5 />,
  'CSS': () => <SiCss3 />,
  'Tailwind CSS': () => <SiTailwindcss />,
  'Styled Components': () => <SiStyledcomponents />,
  'Vue': () => <SiVuedotjs />,
  'Angular': () => <SiAngular />,
  'Svelte': () => <SiSvelte />,
  'Next.js': () => <SiNextdotjs />,
  'Vite': () => <SiVite />,
  
  // AI/ML
  'AI/ML': () => <SiTensorflow />,
  'AI': () => <SiTensorflow />,
  'ML': () => <SiTensorflow />,
  'Machine Learning': () => <SiTensorflow />,
  'TensorFlow': () => <SiTensorflow />,
  'PyTorch': () => <SiPytorch />,
  
  // Robotics & Hardware
  'Robotics': () => <SiRobotframework />,
  'Hardware': () => <SiArduino />,
  'Embedded Systems': () => <SiRaspberrypi />,
  'Arduino': () => <SiArduino />,
  'Raspberry Pi': () => <SiRaspberrypi />,
  
  // Enterprise & Cloud
  'Enterprise': () => <FaBuilding />,
  'AWS': () => <SiAmazon />,
  'Google Cloud': () => <SiGooglecloud />,
  'Docker': () => <SiDocker />,
  'Linux': () => <SiLinux />,
  
  // Databases
  'MongoDB': () => <SiMongodb />,
  'PostgreSQL': () => <SiPostgresql />,
  
  // Tools
  'Git': () => <SiGit />,
  'GitHub Actions': () => <SiGithubactions />,
  'CI/CD': () => <SiGithubactions />,
  
  // State Management & APIs
  'Redux': () => <SiRedux />,
  'GraphQL': () => <SiGraphql />,
  
  // Monitoring & Observability
  'Prometheus': () => <SiPrometheus />,
  'Grafana': () => <SiGrafana />,
  
  // Generic/Custom Categories
  'Creative Engineering': () => <FaCode />,
  'Sustainability': () => <FaLeaf />,
  'Architecture': () => <FaProjectDiagram />,
  'Systems': () => <FaCog />,
  'Microchip': () => <FaMicrochip />,
};

/**
 * Get icon component for a technology tag
 * @param tag - Technology tag name (e.g., 'React', 'TypeScript')
 * @returns React element with the icon, or a fallback icon
 */
export const getTechnologyIcon = (tag: string): ReactElement => {
  // Try exact match first
  const IconComponent = technologyIconMap[tag];
  if (IconComponent) {
    return IconComponent();
  }
  
  // Try case-insensitive match
  const lowerTag = tag.toLowerCase();
  const matchedKey = Object.keys(technologyIconMap).find(
    key => key.toLowerCase() === lowerTag
  );
  
  if (matchedKey) {
    return technologyIconMap[matchedKey]();
  }
  
  // Fallback to generic code icon
  return <FaCode />;
};

/**
 * Get category for a technology tag
 * @param tag - Technology tag name
 * @returns Category: 'language', 'technology', or 'domain'
 */
const getTechnologyCategory = (tag: string): 'language' | 'technology' | 'domain' => {
  // Try exact match first
  const category = technologyCategoryMap[tag];
  if (category) {
    return category;
  }
  
  // Try case-insensitive match
  const lowerTag = tag.toLowerCase();
  const matchedKey = Object.keys(technologyCategoryMap).find(
    key => key.toLowerCase() === lowerTag
  );
  
  if (matchedKey) {
    return technologyCategoryMap[matchedKey];
  }
  
  // Default to 'technology' for unmapped tags
  return 'technology';
};

/**
 * Get all technology icons for a project's tags, grouped by category
 * @param tags - Array of technology tags
 * @returns Array of category groups, each containing tags and icons
 */
export const getTechnologyIcons = (tags: string[]): Array<{
  category: 'language' | 'technology' | 'domain';
  items: Array<{ tag: string; icon: ReactElement }>;
}> => {
  // Group tags by category, removing duplicates
  const grouped: Record<string, Array<{ tag: string; icon: ReactElement }>> = {
    language: [],
    technology: [],
    domain: [],
  };
  
  // Track which tags we've already added to prevent duplicates
  const seenTags = new Set<string>();
  // Track which icon components we've already added to prevent duplicate icons
  // Use a WeakMap to store icon component references
  const seenIconComponents = new Set<ReactElement['type']>();
  
  tags.forEach(tag => {
    // Normalize tag for comparison (case-insensitive)
    const normalizedTag = tag.toLowerCase();
    
    // Skip if we've already seen this tag
    if (seenTags.has(normalizedTag)) {
      return;
    }
    
    const icon = getTechnologyIcon(tag);
    const iconComponent = icon.type;
    
    // Skip if we've already seen this icon component
    if (seenIconComponents.has(iconComponent)) {
      return;
    }
    
    seenTags.add(normalizedTag);
    seenIconComponents.add(iconComponent);
    const category = getTechnologyCategory(tag);
    grouped[category].push({
      tag,
      icon,
    });
  });
  
  // Convert to array, only including categories that have items
  const categoryOrder: Array<'language' | 'technology' | 'domain'> = ['language', 'technology', 'domain'];
  return categoryOrder
    .filter(category => grouped[category].length > 0)
    .map(category => ({
      category: category as 'language' | 'technology' | 'domain',
      items: grouped[category],
    }));
};
