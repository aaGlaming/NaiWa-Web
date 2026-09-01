/**
 * Color rotation for the five accent colors
 */
export const ACCENT_COLORS = [
  '#FFE600', // Yellow (primary)
  '#FF3AF2', // Magenta
  '#00F5D4', // Cyan
  '#FF6B35', // Orange
  '#7B2FFF'  // Purple
]

export const ACCENT_COLOR_NAMES = [
  'accent', 'secondary', 'tertiary', 'quaternary', 'quinary'
]

/**
 * Get accent color by index (with modulo rotation)
 */
export function getAccentColor(index) {
  return ACCENT_COLORS[index % ACCENT_COLORS.length]
}

/**
 * Get clashing border color for a given background accent
 */
export function getClashingBorder(bgIndex) {
  const clashIndex = (bgIndex + 2) % ACCENT_COLORS.length
  return ACCENT_COLORS[clashIndex]
}

/**
 * Format image filename for display
 */
export function formatFilename(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/_/g, ' ')       // Replace underscores with spaces
    .replace(/-/g, ' ')       // Replace hyphens with spaces
}

/**
 * Get image category from filename
 */
export function getImageCategory(filename) {
  const lower = filename.toLowerCase()
  if (lower.includes('idle') || lower.includes('waiting') || lower.includes('waving') ||
      lower.includes('jumping') || lower.includes('running') || lower.includes('failed') ||
      lower.includes('review')) {
    return 'animation'
  }
  if (lower.endsWith('.gif') || lower.endsWith('.webp')) {
    return 'emoji'
  }
  return 'sticker'
}
