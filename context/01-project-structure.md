# Project Structure and Architecture

## Project Overview

This is a React + TypeScript + Vite portfolio website featuring a reusable diorama system. The project uses modern web technologies to create theatrical, layered diorama components that can be configured for different visual stories.

## Technology Stack

- **React 19.1.1** - UI library
- **TypeScript ~5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **React Router DOM 7.9.5** - Client-side routing
- **vite-plugin-svgr** - SVG import as React components

## Directory Structure

```
src/
├── components/
│   └── dioramas/
│       ├── shared/              # Generic reusable components
│       │   ├── DioramaContainer.tsx
│       │   ├── DioramaFrame.tsx
│       │   ├── DioramaLayer.tsx
│       │   └── DioramaEntity.tsx
│       └── ocean-diorama/       # Ocean diorama implementation
│           ├── config.ts         # Centralized configuration
│           ├── OceanDiorama.tsx  # Main diorama component
│           ├── OceanLayer1.tsx ... OceanLayer6.tsx
│           └── OceanWhale1.tsx ... OceanWhale3.tsx
├── hooks/
│   ├── useThemeLayer.ts         # Theme layer mapping and color lookup
│   └── useDioramaAnimation.ts   # Animation configuration
├── utils/
│   └── diorama/
│       ├── animations.ts        # Animation style generation
│       ├── shapes.tsx          # Clip paths and frame masks
│       └── themeLayer.ts       # Theme layer calculations
├── theme/
│   └── index.ts                # colorSpectrum and clockworkDurations
├── pages/
│   └── Hero.tsx                # Hero page with diorama
├── dioramas/
│   └── ocean-diorama/          # SVG assets
│       ├── layer1.svg ... layer6.svg
│       └── whale1.svg ... whale3.svg
└── index.css                   # Global styles and keyframe animations
```

## Key Architecture Concepts

### Diorama System

The diorama system is a generic, reusable architecture for creating layered visual dioramas. It supports:

- **Multiple shapes**: Circle (current), rectangle (planned for arches)
- **Configurable layers**: Always 100% size, positioned absolutely
- **Configurable entities**: Variable size (whales, characters, objects)
- **Flexible animations**: Rotation, scroll, custom, or none
- **Theme-based coloring**: Maps diorama layers to color spectrum

### Theme Layer System

The theme layer system maps diorama-specific layer numbers to a global theme layer system:

- **Diorama layers**: Specific to each diorama (e.g., 1-6 for ocean)
- **Theme layers**: Global system (1-11) mapped to color spectrum
- **Color spectrum**: 11 colors from dark (surface) to light (deepest)
- **Z-index calculation**: Inverse relationship (deeper layers = higher z-index)

**Example**: Ocean diorama layer 2 maps to theme layer 3, which uses `colorSpectrum[2]` (index 2 = third color).

### Animation System

The animation system uses configurable animations with clockwork durations:

- **Rotation**: Clockwise or counter-clockwise with configurable duration
- **Scroll**: Horizontal (left/right) or vertical (up/down) with custom keyframes
- **Custom**: Custom keyframe names or inline styles
- **Clockwork durations**: Predefined durations array for synchronized timing

**Keyframes defined in `src/index.css`**:
- `rotate-clockwise` / `rotate-counter-clockwise`
- `scroll-whale-slow` / `scroll-whale-medium` / `scroll-whale-fast`

### Shape System

The shape system supports different diorama shapes:

- **Circle**: Current implementation for ocean diorama
- **Rectangle**: Planned for arch dioramas on hero page
- **Clip paths**: CSS clip-path for content clipping
- **Frame masks**: SVG masks for frame generation

Utilities in `src/utils/diorama/shapes.tsx` handle shape-specific calculations.

## Component Hierarchy

```
DioramaContainer
├── DioramaFrame (optional, rendered outside clipped container)
└── Clipped Content Area
    ├── DioramaLayer (multiple, always 100% size)
    │   └── SVG Component
    └── DioramaEntity (multiple, variable size)
        └── SVG Component
```

### DioramaContainer

Generic container that handles:
- Size and shape configuration
- Background color
- Content clipping via CSS clip-path
- Frame rendering (outside clipped area)

**File**: `src/components/dioramas/shared/DioramaContainer.tsx`

### DioramaFrame

Configurable frame component that:
- Renders outside the clipped container
- Supports different shapes (circle, rectangle)
- Uses unique SVG mask IDs (via `useId()`)
- Extends beyond diorama boundaries

**File**: `src/components/dioramas/shared/DioramaFrame.tsx`

### DioramaLayer

Generic layer component for all dioramas:
- Always 100% size (no size configuration)
- Handles theme layer mapping via `useThemeLayer` hook
- Applies animations via `useDioramaAnimation` hook
- Supports CSS filters (e.g., drop shadows)

**File**: `src/components/dioramas/shared/DioramaLayer.tsx`

**Key props**:
- `SvgComponent`: React component for the layer SVG
- `dioramaLayerNumber`: Layer number (1-6 for ocean)
- `layerConfig`: Configuration object with theme mapping, animation, filter

### DioramaEntity

Generic entity component (whales, characters, objects):
- Variable size (percentage-based)
- Positionable (vertical/horizontal offsets)
- Handles theme layer mapping
- Supports animations (scroll, rotation, custom)

**File**: `src/components/dioramas/shared/DioramaEntity.tsx`

**Key props**:
- `SvgComponent`: React component for the entity SVG
- `dioramaLayerNumber`: Layer number for theme mapping
- `entityConfig`: Configuration with size, position, animation, filter

## Configuration Pattern

Each diorama defines its structure in a `config.ts` file:

**Example**: `src/components/dioramas/ocean-diorama/config.ts`

```typescript
export const dioramaSettings = {
  size: { width: 400, height: 400 },
  shape: 'circle',
  backgroundColor: '#000000',
  frameOffset: 10,
  // ...
};

export const layerConfigs = [
  {
    dioramaLayerNumber: 1,
    themeLayerMapping: layerThemeMapping,
    animation: null, // No animation
    filter: 'drop-shadow(...)',
  },
  // ...
];

export const entityConfigs = [
  {
    dioramaLayerNumber: 2,
    size: { 2: 50 }, // 50% size
    position: { vertical: { 2: '-15%' } },
    animation: {
      type: 'scroll',
      duration: 120000,
      direction: 'left',
      customKeyframe: 'scroll-whale-slow',
    },
    filter: 'drop-shadow(...)',
  },
  // ...
];
```

## File Naming Conventions

- **Shared components**: PascalCase (e.g., `DioramaLayer.tsx`)
- **Diorama-specific components**: Prefixed with diorama name (e.g., `OceanLayer1.tsx`, `OceanWhale1.tsx`)
- **Configuration files**: `config.ts`
- **Utility files**: kebab-case (e.g., `themeLayer.ts`, `animations.ts`)
- **Hook files**: camelCase with `use` prefix (e.g., `useThemeLayer.ts`)

## Hooks

### useThemeLayer

Handles theme layer mapping, color lookup, and z-index calculation.

**Location**: `src/hooks/useThemeLayer.ts`

**Returns**:
- `themeLayerNumber`: Mapped theme layer number
- `color`: Color from colorSpectrum
- `zIndex`: Calculated z-index (inverse of depth)

### useDioramaAnimation

Handles animation configuration and returns CSS style object.

**Location**: `src/hooks/useDioramaAnimation.ts`

**Returns**:
- `animationStyle`: CSS properties for animation

## Utilities

### themeLayer.ts

Pure functions for theme layer calculations:
- `mapDioramaLayerToThemeLayer()`: Maps diorama layer to theme layer
- `getColorForThemeLayer()`: Gets color from colorSpectrum array
- `calculateZIndex()`: Calculates z-index based on depth

**Location**: `src/utils/diorama/themeLayer.ts`

### animations.ts

Generates CSS animation styles:
- `getAnimationStyle()`: Returns CSS style object based on animation config

**Location**: `src/utils/diorama/animations.ts`

### shapes.tsx

Generates clip paths and SVG masks:
- `getClipPath()`: Returns CSS clip-path value
- `getFrameMask()`: Returns SVG mask element

**Location**: `src/utils/diorama/shapes.tsx`

**Note**: `.tsx` extension required for JSX syntax in frame masks.

## Theme Constants

### colorSpectrum

Array of 11 colors ordered from dark (surface) to light (deepest):

**Location**: `src/theme/index.ts`

```typescript
export const colorSpectrum = [
  '#0F1218', // Dark sleek tech surface (index 0)
  '#C85A3D', // Deep warm orange-red (paper lantern)
  // ... warm oranges, yellows, creams ...
  '#FFF9DF', // Warm off-white cream (index 10 - deepest)
] as const;
```

### clockworkDurations

Array of animation durations in milliseconds for synchronized timing:

**Location**: `src/theme/index.ts`

```typescript
export const clockworkDurations = [
  3000,    // 3 seconds
  6000,    // 6 seconds
  // ... multiples pattern ...
  7680000, // 7680 seconds
] as const;
```

## CSS Animations

Keyframe animations defined in `src/index.css`:

- **Rotation**: `rotate-clockwise`, `rotate-counter-clockwise`
- **Scroll**: `scroll-whale-slow`, `scroll-whale-medium`, `scroll-whale-fast`

## Creating New Dioramas

To create a new diorama:

1. Create folder: `src/components/dioramas/[name]-diorama/`
2. Create `config.ts` with diorama settings, layer configs, entity configs
3. Create thin wrapper components for layers and entities:
   - Import SVG as React component
   - Pass config to `DioramaLayer` or `DioramaEntity`
4. Create main diorama component using `DioramaContainer` and shared components
5. Add SVG assets to `src/dioramas/[name]-diorama/`

## Key Design Principles

1. **Reusability**: Generic components work for any diorama type
2. **Configuration-driven**: Structure defined in config files
3. **Type safety**: TypeScript interfaces ensure correctness
4. **Separation of concerns**: Logic (hooks/utilities) separated from presentation (components)
5. **Extensibility**: Easy to add new shapes, animations, or features

