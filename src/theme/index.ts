/**
 * Theatrical Diorama Theme Constants
 * 
 * Site-wide theme constants for the theatrical diorama design system.
 * Colors are ordered from dark to light, where:
 * - Darkest colors = surface layers (closest to viewer)
 * - Lightest colors = deepest layers (furthest away)
 * 
 * This creates the paper-cut diorama effect where deepest layers appear almost white
 * (lit from behind) and surface layers are dark slate blue.
 */

/**
 * Color spectrum array ordered from dark to light.
 * Index 0 = darkest (surface layer - closest), Index 9 = lightest (deepest layer - furthest away).
 * Usage: colorSpectrum[layerNumber - 1]
 * 
 * Based on palette: INKWELL → LUNAR ECLIPSE → CREME BRULEE → AU LAIT
 * Surface layers are dark slate blue, transitioning through candle flame colors to almost white for deepest layers.
 */
export const colorSpectrum = [
  '#1A2326', // Very dark slate blue (index 0 - surface layer 1)
  '#2C3639', // INKWELL - Dark slate blue (index 1)
  '#3F4E4F', // LUNAR ECLIPSE - Muted teal/grey-green (index 2 - layer 2)
  '#5A6B5F', // Medium teal-grey (index 3)
  '#7A6B5F', // Warm teal-brown transition (index 4 - layer 3)
  '#9A7B5F', // Warm brown (index 5 - layer 4)
  '#B8906F', // Light caramel - candle light tones (index 6)
  '#D4B99A', // Very light warm beige (index 7 - layer 5)
  '#E8D4C4', // Very light warm peach (index 8)
  '#F0DCC8', // Warm candle light - light warm peach (index 9 - layer 6, deepest)
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


