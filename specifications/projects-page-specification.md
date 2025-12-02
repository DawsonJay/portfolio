# Projects Page Specification

**Version:** 1.0  
**Date:** December 1, 2025  
**Status:** Design Specification

---

## Overview

The Projects page will use an interactive **shelf-based diorama** design where each project is represented as an object on a decorative shelf. This approach combines visual storytelling with functional information display, creating a memorable portfolio experience while maintaining professional utility for employers.

---

## Design Philosophy

### Primary Goals
1. **Visual Impact**: Create a memorable, artistic first impression
2. **Professional Utility**: Provide employers with necessary technical information
3. **Accessibility**: Work seamlessly across all devices and interaction methods
4. **Scalability**: Accommodate future projects without redesign

### Design Principle
> *The shelf is the hook, not the resume. Make it beautiful and memorable, then reveal substance progressively.*

---

## User Experience

### Visual Layout

```
┌─────────────────────────────────────────────────────┐
│                 PROJECTS PAGE                       │
│            Showcasing my work and growth            │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │   [🎃]   │  │   [🌙]   │  │   [🤖]   │         │
│  │  ══════  │  │  ══════  │  │  ══════  │         │
│  │ WhatNow  │  │   Luna   │  │ Atlantis │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  ┌──────────┐                                      │
│  │   [🏢]   │                                      │
│  │  ══════  │                                      │
│  │  Nexus   │                                      │
│  └──────────┘                                      │
│                                                     │
├─────────────────────────────────────────────────────┤
│              PROJECT DETAILS PANEL                  │
│                                                     │
│  Atlantis                                           │
│  Underwater Robotics Platform                       │
│                                                     │
│  [In Progress]  ━━━━━━━━━━━━━━━━━━ 60%            │
│                                                     │
│  🐍 Python  ⚙️ Robotics  🔧 Hardware  🤖 Embedded  │
│                                                     │
│  Hardware + software integration for autonomous     │
│  underwater exploration and data collection.        │
│                                                     │
│  [View Full Project Details →]                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Interaction States

#### 1. Initial State
- All shelf items visible
- Details panel shows first project by default (or "Click a project to learn more")
- Subtle idle animations on shelf items

#### 2. Hover State (Desktop Only)
- Hovered item: Enhanced animation (gentle lift, glow, or rotation)
- Plaque: Highlighted or brightened
- Cursor: Changes to pointer
- Other items: Maintain idle animation

#### 3. Selected State
- Selected item: Highlighted (border, glow, or color shift)
- Details panel: Smoothly transitions to show selected project
- Visual indicator: Optional subtle arrow pointing from shelf to details

#### 4. Click/Tap Interaction
- Item: Pronounced animation on activation
- Details panel: Cross-fade content transition
- Mobile: Smooth scroll to details panel if needed

---

## Responsive Behavior

### Breakpoint Strategy

#### Desktop Wide (1200px+)
- **Shelf Grid**: 4 items per row
- **Item Size**: 280px × 396px
- **Details Panel**: ~40% viewport height

#### Desktop Standard (900-1200px)
- **Shelf Grid**: 3 items per row
- **Item Size**: 280px × 396px
- **Details Panel**: ~40% viewport height

#### Tablet (600-900px)
- **Shelf Grid**: 2 items per row
- **Item Size**: 240px × 340px (slightly scaled)
- **Details Panel**: ~50% viewport height

#### Mobile (320-600px)
- **Shelf Grid**: 1 item per row
- **Item Size**: 280px × 396px (or full width if narrower)
- **Details Panel**: ~60-70% viewport height
- **Scroll**: Auto-scroll to details when item selected

#### Narrow Mobile (<320px)
- **Shelf Grid**: 1 item per row
- **Item Size**: Scales proportionally to fit (maintains aspect ratio)
- **Minimum Width**: 100vw - 2rem padding
- **Details Panel**: Adapts text size with `clamp()`

### Scaling Rules

```
Viewport > 600px:  Shelves at optimal size (280px or 240px)
Viewport 320-600:  Shelves at 280px or scale to fit
Viewport < 320:    Shelves scale down proportionally
                   Aspect ratio: 800:1132 (A4) maintained
```

---

## Component Architecture

### Page Structure

```tsx
<ProjectsPage>
  <NavBar />
  <ContentContainer>
    <PageHeader>
      <PageTitle>Projects</PageTitle>
      <Subtitle>Showcasing my work and growth</Subtitle>
    </PageHeader>
    
    <ShelvesGrid>
      {projects.map(project => (
        <ShelfItem
          key={project.id}
          project={project}
          isSelected={selectedProject?.id === project.id}
          isHovered={hoveredProject?.id === project.id}
          onClick={() => handleSelectProject(project)}
          onMouseEnter={() => setHoveredProject(project)}
          onMouseLeave={() => setHoveredProject(null)}
        />
      ))}
    </ShelvesGrid>
    
    <DetailsPanel>
      {selectedProject ? (
        <ProjectDetails project={selectedProject} />
      ) : (
        <Placeholder>Click a project to learn more</Placeholder>
      )}
    </DetailsPanel>
  </ContentContainer>
</ProjectsPage>
```

### ShelfItem Component

```tsx
<ShelfItemWrapper
  isSelected={isSelected}
  isHovered={isHovered}
  onClick={onClick}
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
  role="button"
  tabIndex={0}
  aria-selected={isSelected}
  aria-label={`${project.name} - ${project.tagline}`}
>
  <ShelfDiorama project={project}>
    {/* Shared shelf layers */}
    <Supports />
    <BackgroundLeaves1 />
    <BackgroundLeaves2 />
    <Shelf />
    
    {/* Project-specific object/icon */}
    <ProjectIcon icon={project.icon} />
    
    {/* Shared highlight layers */}
    <Highlights1 />
    <Highlights2 />
  </ShelfDiorama>
  
  <Plaque isSelected={isSelected}>
    {project.name}
  </Plaque>
</ShelfItemWrapper>
```

### ProjectDetails Component

```tsx
<DetailsContainer>
  <DetailsHeader>
    <ProjectName>{project.name}</ProjectName>
    <ProjectTagline>{project.tagline}</ProjectTagline>
  </DetailsHeader>
  
  <StatusSection>
    <StatusBadge status={project.status}>
      {project.status === 'complete' ? 'Complete' : 'In Progress'}
    </StatusBadge>
    {project.progress && (
      <ProgressBar value={project.progress} />
    )}
  </StatusSection>
  
  <TechStack>
    {project.tags.map(tag => (
      <TechTag key={tag}>{tag}</TechTag>
    ))}
  </TechStack>
  
  <Description>{project.description}</Description>
  
  <ViewDetailsButton to={`/projects/${project.route}`}>
    View Full Project Details →
  </ViewDetailsButton>
</DetailsContainer>
```

---

## Technical Implementation

### State Management

```tsx
const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

const handleSelectProject = (project: Project) => {
  setSelectedProject(project);
  
  // Update URL for shareability
  window.history.pushState({}, '', `#${project.route}`);
  
  // Scroll to details on mobile
  if (window.innerWidth < 768) {
    detailsPanelRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Initialize from URL hash on mount
useEffect(() => {
  const hash = window.location.hash.slice(1);
  const project = projects.find(p => p.route === hash);
  if (project) setSelectedProject(project);
}, []);
```

### Responsive Grid CSS

```css
.shelves-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.shelf-item {
  width: 280px;
  max-width: 100%;
  aspect-ratio: 800 / 1132;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .shelves-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  
  .shelf-item {
    width: 240px;
    height: 340px;
  }
}

@media (max-width: 320px) {
  .shelves-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 1rem;
  }
  
  .shelf-item {
    width: calc(100vw - 2rem);
    max-width: 280px;
  }
}
```

### Animation States

```css
.shelf-item {
  transition: transform 0.3s ease, filter 0.3s ease;
}

/* Idle animation */
.shelf-item {
  animation: gentle-float 4s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

/* Hover animation */
.shelf-item:hover {
  transform: translateY(-8px);
  filter: brightness(1.1);
  animation: none;
}

/* Selected state */
.shelf-item.selected {
  filter: drop-shadow(0 0 8px var(--accent-color));
}

/* Click animation */
.shelf-item:active {
  transform: scale(0.98);
}
```

---

## Details Panel Specification

### Content Structure

1. **Project Name** (h2, large, accent color)
2. **Tagline** (h3, medium, secondary color)
3. **Status Badge** (Complete / In Progress %)
4. **Progress Bar** (if in-progress, gradient fill)
5. **Tech Stack** (pill badges, all technologies)
6. **Description** (paragraph, 2-3 lines)
7. **CTA Button** ("View Full Project Details →")

### Styling

```css
.details-panel {
  background: var(--surface-color);
  border: 1px solid var(--layer2-color);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
  min-height: 300px;
  transition: all 0.3s ease;
}

.project-name {
  font-size: 2.5rem;
  color: var(--layer11-color);
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.tech-tag {
  background: var(--layer2-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}
```

---

## Shelf Diorama Specification

### Shared Layers (All Projects)

1. **Supports** (backmost, darkest - theme layer 2)
2. **BackgroundLeaves1** (theme layer 3)
3. **BackgroundLeaves2** (theme layer 4)
4. **Shelf** (theme layer 5)
5. **Highlights1** (theme layer 6)
6. **Highlights2** (frontmost, lightest - theme layer 7)

### Project-Specific Layer

Between Shelf and Highlights1, insert:
- **ProjectIcon** - unique SVG object representing each project

### Visual Effects

- **Drop Shadow**: `drop-shadow(rgba(15, 18, 24, 0.7) 0px 0px 2px) drop-shadow(rgba(15, 18, 24, 0.6) 0px 0px 1px)`
- **Color Mapping**: Uses theme's color spectrum (layers 2-7)
- **Aspect Ratio**: A4 (800:1132 ≈ 0.707)

---

## Project Icon Design Guidelines

### Requirements
- **Format**: SVG (scalable, theme-aware)
- **Size**: Should fit within shelf bounds
- **Color**: Use `fill="currentColor"` to inherit theme
- **Style**: Match shelf's artistic, silhouette-based aesthetic
- **Recognizability**: Clearly represent the project concept

### Icon Concepts

#### WhatNow (AI Recommendation)
- **Options**: Lightbulb, brain, compass, signpost
- **Recommended**: Lightbulb with rays (represents ideas/recommendations)

#### Atlantis (Underwater Robotics)
- **Options**: Submarine, robotic fish, underwater drone, diving helmet
- **Recommended**: Stylized submarine or ROV silhouette

#### Lunascope (Creative Hardware)
- **Options**: Telescope, moon phases, star chart, artistic lens
- **Recommended**: Telescope pointing upward with moon nearby

#### Nexus (Enterprise Systems)
- **Options**: Building, network nodes, interlocking gears, bridge
- **Recommended**: Simplified building or network node structure

---

## Accessibility Requirements

### Keyboard Navigation
- Tab through shelf items in logical order
- Enter/Space to select item
- Arrow keys to navigate between items (optional enhancement)
- Tab to "View Details" button in details panel

### Screen Reader Support
```tsx
<ShelfItem
  role="button"
  tabIndex={0}
  aria-selected={isSelected}
  aria-label={`${project.name} - ${project.tagline}`}
  onKeyPress={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }}
>
```

### Focus Indicators
```css
.shelf-item:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 4px;
}

.shelf-item:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast
- Text on details panel: Minimum 4.5:1 contrast ratio
- Status badges: Minimum 3:1 contrast ratio
- Tech tags: Minimum 4.5:1 contrast ratio

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .shelf-item {
    animation: none;
    transition: none;
  }
  
  .details-panel {
    transition: none;
  }
}
```

---

## Performance Considerations

### SVG Optimization
- All SVG files optimized with SVGO
- viewBox properly set for scaling
- Unnecessary metadata removed
- Stroke converted to currentColor for theming

### Lazy Loading
```tsx
// Load project details only when selected
const ProjectDetails = lazy(() => import('./ProjectDetails'));

<Suspense fallback={<DetailsSkeleton />}>
  {selectedProject && <ProjectDetails project={selectedProject} />}
</Suspense>
```

### Animation Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid layout thrashing
- Debounce hover events if needed

---

## Future Enhancements

### Phase 2 (Optional)
1. **URL State**: Deep linking to specific projects via hash
2. **Keyboard Navigation**: Arrow key navigation between items
3. **Advanced Animations**: Physics-based spring animations on selection
4. **Custom Shelves**: Unique shelf designs per project category
5. **3D Effects**: Subtle parallax or tilt effects on hover
6. **Sound Design**: Subtle audio feedback on interactions (optional, toggleable)

### Phase 3 (If Scaling)
1. **Multiple Shelves**: If projects exceed 6-8, create separate category shelves
2. **Filtering**: Filter by technology, status, or category
3. **Sorting**: Sort by date, completion, or alphabetically
4. **Search**: Quick search/filter functionality

---

## Testing Checklist

### Visual Testing
- [ ] All projects display correctly at 280px
- [ ] Shelves wrap properly at all breakpoints
- [ ] Details panel transitions smoothly
- [ ] Hover states work on desktop
- [ ] Selected state is visually clear
- [ ] Colors match theme spectrum

### Functional Testing
- [ ] Click/tap selects project
- [ ] Details update correctly
- [ ] "View Details" button navigates correctly
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Works with screen reader

### Responsive Testing
- [ ] Desktop wide (1200px+): 4 items per row
- [ ] Desktop standard (900-1200px): 3 items per row
- [ ] Tablet (600-900px): 2 items per row
- [ ] Mobile (320-600px): 1 item per row
- [ ] Narrow mobile (<320px): Scales proportionally
- [ ] Auto-scroll on mobile works

### Performance Testing
- [ ] Animations smooth (60fps)
- [ ] No layout shift on selection
- [ ] Fast initial paint
- [ ] SVGs load quickly
- [ ] No memory leaks on interaction

### Accessibility Testing
- [ ] Keyboard-only navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Works with reduced motion preference
- [ ] Touch targets ≥44px on mobile

---

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- [ ] Set up Projects page structure
- [ ] Implement responsive grid
- [ ] Create ShelfItem component
- [ ] Add basic interaction states

### Phase 2: Shelf Dioramas (Week 2)
- [ ] Create shared shelf layers
- [ ] Design project-specific icons
- [ ] Implement diorama rendering
- [ ] Add animations

### Phase 3: Details Panel (Week 3)
- [ ] Create DetailsPanel component
- [ ] Implement state management
- [ ] Add transitions
- [ ] Connect to project data

### Phase 4: Polish & Testing (Week 4)
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile refinements
- [ ] Final visual polish

---

## Related Documentation

- **Project Structure**: `01-project-structure.md`
- **Diorama System**: `01-project-structure.md` (Dioramas section)
- **Theme System**: `src/theme/index.ts`
- **Project Data**: `src/data/projects.ts`

---

## Notes

- This specification represents the agreed-upon design as of December 1, 2025
- Implementation may evolve based on technical constraints or user feedback
- The shelf concept can be extended to other sections if successful
- Maintain consistency with existing diorama patterns (Ocean Diorama)

---

**End of Specification**

