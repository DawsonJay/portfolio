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
 * Based on provided palette: Very dark navy → Royal blue → Bright blue → Periwinkle → Lavender → 
 * Pink → Terracotta → Coral → Peach → Cream → Off-white (candlelight)
 */
export const colorSpectrum = [
  '#0A0F1A', // Very dark deep navy (almost black) (index 0 - surface layer 1)
  '#1E3A8A', // Rich vibrant royal blue (index 1)
  '#2563EB', // Bright medium blue (index 2)
  '#818CF8', // Soft muted periwinkle / light sky blue (index 3)
  '#C4B5FD', // Dusty lavender / light mauve (index 4)
  '#EC4899', // Bright medium pink / fuchsia (index 5)
  '#C9735F', // Muted reddish-brown / terracotta (index 6)
  '#FB7185', // Vibrant orange-pink / coral (index 7)
  '#FBC5A0', // Pale peach / light coral (index 8)
  '#FEF3C7', // Soft light yellow / cream (index 9)
  '#FFFEF9', // Very light almost off-white cream - candlelight (index 10 - layer 6, deepest)
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


