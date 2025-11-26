import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { theme as defaultTheme } from '../theme';
import type { Theme } from '../theme';

/**
 * Hook to access the theme in non-styled components.
 * Returns the theme from ThemeProvider, or falls back to default theme.
 * 
 * @returns The theme object
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  // If theme is not available (component outside ThemeProvider), return default
  return (theme as Theme | undefined) || defaultTheme;
};

