/**
 * Utility functions for the Color Mixer components
 */

/**
 * Determines appropriate text color (black or white) for a given background color
 * @param hexColor - Hex color code (with # prefix)
 * @returns - '#000000' for dark text or '#FFFFFF' for light text
 */
export const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate brightness (weighted RGB)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#FFFFFF';
};