/**
 * Theatrical Diorama Theme Constants
 * 
 * Site-wide theme constants for the theatrical diorama design system.
 * Colors are ordered from dark to light, where:
 * - Darkest colors = surface layers (closest to viewer)
 * - Lightest colors = deepest layers (furthest away)
 * 
 * This creates the paper-cut diorama effect where deepest layers appear almost white
 * (lit from behind) and surface layers are very dark blue-grey.
 */

/**
 * Color spectrum array ordered from dark to light.
 * Index 0 = darkest (surface layer - closest), Index 10 = lightest (deepest layer - furthest away).
 * Usage: colorSpectrum[layerNumber - 1]
 * 
 * Shadow theatre palette: Dark navy surface transitioning to warm paper lantern colors
 * Surface layer = dark navy shadow, deeper layers = spectrum of paper lantern glow
 */
export const colorSpectrum = [
  '#0F1218', // Dark sleek tech surface (cut open to reveal light) (index 0 - surface layer 1)
  '#C85A3D', // Deep warm orange-red (paper lantern) (index 1)
  '#D97A4F', // Rich warm orange (paper lantern) (index 2)
  '#E89A61', // Bright warm orange (paper lantern) (index 3)
  '#F0B073', // Warm orange-yellow (paper lantern) (index 4)
  '#F5C685', // Bright warm yellow-orange (paper lantern) (index 5)
  '#F9D897', // Warm yellow (paper lantern) (index 6)
  '#FBE5A9', // Pale warm yellow (paper lantern) (index 7)
  '#FDEFBB', // Light warm cream-yellow (paper lantern) (index 8)
  '#FEF7CD', // Very light warm cream (paper lantern) (index 9)
  '#FFF9DF', // Warm off-white cream (brightest lantern glow) (index 10 - layer 6, deepest)
] as const;

/**
 * Clockwork durations array in milliseconds.
 * Expanded array with multiples pattern for different diorama speeds.
 * Index 0 = fastest, higher indices = slower.
 * Usage: clockworkDurations[index] - select appropriate range for each diorama
 * 
 * Pattern: multiples of base durations (3s, 6s, 12s, 24s, 48s, 96s, 192s, 384s, 768s, 1536s, etc.)
 * Ocean diorama uses indices 4-8 (120s, 240s, 480s, 960s, 1920s) where 120s is fastest
 */
export const clockworkDurations = [
  3000,    // 3 seconds
  6000,    // 6 seconds
  12000,   // 12 seconds
  24000,   // 24 seconds
  30000,   // 30 seconds (ocean diorama fastest - index 4)
  48000,   // 48 seconds
  60000,   // 60 seconds (ocean diorama - index 6)
  96000,   // 96 seconds
  120000,  // 120 seconds (ocean diorama - index 8)
  240000,  // 240 seconds (ocean diorama - index 9)
  480000,  // 480 seconds (ocean diorama slowest - index 10)
  960000,  // 960 seconds
  1920000, // 1920 seconds
  3840000, // 3840 seconds
  7680000, // 7680 seconds
] as const;


