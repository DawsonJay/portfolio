# Current Project Status

## Completed Features

### Ocean Diorama
- ✅ 6 rotating layers with counter-clockwise rotation
- ✅ 3 scrolling whales with staggered animations
- ✅ Shadow theatre color palette (dark tech surface with warm paper lantern colors)
- ✅ Drop shadows on layers using dark tech color (#0F1218)
- ✅ Reusable diorama system architecture

### Diorama System Architecture
- ✅ Generic `DioramaLayer` component for all layers
- ✅ Generic `DioramaEntity` component for all entities
- ✅ `DioramaContainer` with clipping and frame support
- ✅ `DioramaFrame` component for configurable frames
- ✅ Hooks: `useThemeLayer`, `useDioramaAnimation`
- ✅ Utilities: `themeLayer.ts`, `animations.ts`, `shapes.tsx`
- ✅ Configuration-driven approach with `config.ts` files

### Visual Design
- ✅ Shadow theatre aesthetic: Dark navy surface (#0F1218) transitioning to warm paper lantern colors
- ✅ Centered drop shadows (non-directional, even spread)
- ✅ Sharp drop shadows (4px and 2px blur radius)
- ✅ Drop shadows match dark tech surface color

### Hero Page
- ✅ Hero page displays OceanDiorama
- ✅ Background color matches top layer color (#0F1218)

## Current State

### Ocean Diorama Behavior

**Layers**:
- All 6 layers rotate counter-clockwise
- Rotation speeds: 30s (fastest, layer 6) to 240s (slowest, layer 2)
- Layer 1 (surface) has no rotation
- All layers have drop shadows using rgba(15, 18, 24, ...)

**Whales**:
- 3 whales scroll right-to-left
- Staggered appearance using different keyframe paths:
  - Whale3 (fastest, 70s): Starts at 105%, appears first
  - Whale2 (medium, 90s): Starts at 130%
  - Whale1 (slowest, 120s): Starts at 180%
- Different path lengths: Slower whales = shorter paths, faster whales = longer paths
- All start and end outside visible area (100% is edge)

**Color Palette**:
- Surface layer: #0F1218 (dark sleek tech surface)
- Deeper layers: Warm paper lantern colors (oranges, yellows, creams)
- Transition from dark navy through warm spectrum to off-white cream

### File Structure

**Active Components**:
- `src/components/dioramas/shared/` - Generic reusable components
- `src/components/dioramas/ocean-diorama/` - Ocean implementation
- `src/hooks/` - Custom hooks
- `src/utils/diorama/` - Utility functions
- `src/theme/index.ts` - Theme constants

**SVG Assets**:
- `src/dioramas/ocean-diorama/` - layer1.svg through layer6.svg, whale1.svg through whale3.svg

## In Progress

- Fine-tuning whale animation timing and starting positions for optimal staggered appearance

## Known Issues

None currently identified.

## Recent Changes

### Refactoring (November 2025)
- Refactored from tightly-coupled components to reusable diorama system
- Extracted logic into hooks (`useThemeLayer`, `useDioramaAnimation`)
- Created utility modules (`themeLayer.ts`, `animations.ts`, `shapes.tsx`)
- Created shared components (`DioramaLayer`, `DioramaEntity`, `DioramaContainer`, `DioramaFrame`)
- Created configuration file (`ocean-diorama/config.ts`)
- Replaced old components with thin wrapper components

**Removed**:
- `LayerWrapper.tsx` → Replaced by `DioramaLayer`
- `WhaleWrapper.tsx` → Replaced by `DioramaEntity`
- Old `Layer1-6.tsx` → Replaced by `OceanLayer1-6.tsx`
- Old `Whale1-3.tsx` → Replaced by `OceanWhale1-3.tsx`

### Visual Design Changes (November 2025)
- Removed texture feature (documented in chat records at `/home/james/Documents/portfolio-profile/records/portfolio-website/`)
- Removed glow animation effect (paper lantern glow was not adding value)
- Updated color palette to shadow theatre/paper lantern theme
- Updated drop shadows: Increased blur → centered (non-directional) → reduced blur → matched color

### Animation Refinements (November 2025)
- Implemented staggered whale animations using different keyframe paths
- Adjusted whale speeds: Whale3 (70s), Whale2 (90s), Whale1 (120s)
- Created custom keyframes: `scroll-whale-slow`, `scroll-whale-medium`, `scroll-whale-fast`
- Path lengths adjusted: Slower whales travel shorter distances, faster whales travel longer distances

## Technical Debt

None currently identified.

## Build Status

- ✅ TypeScript compilation: Passing
- ✅ ESLint: No errors
- ✅ Build: Successful
- ✅ Dev server: Running

## Dependencies

**Production**:
- react: ^19.1.1
- react-dom: ^19.1.1
- react-router-dom: ^7.9.5
- clsx: ^2.1.1

**Development**:
- TypeScript: ~5.9.3
- Vite: ^7.1.7
- Tailwind CSS: ^4.1.17
- vite-plugin-svgr: ^4.5.0

## Next Steps

1. Continue refining whale animation timing for optimal staggered appearance
2. Plan rectangular arch dioramas for hero page
3. Consider additional diorama types for different projects
4. Integrate dioramas into broader portfolio content structure

## Notes

- Chat records documenting development history are stored in `/home/james/Documents/portfolio-profile/records/portfolio-website/`
- The diorama system is designed to be extensible for future diorama types
- Configuration-driven approach makes it easy to create new dioramas

