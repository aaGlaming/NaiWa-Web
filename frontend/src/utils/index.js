/**
 * Neo-Brutalism color system
 */
export const ACCENT_COLORS = [
  '#FF6B6B',  // Hot Red
  '#FFD93D',  // Vivid Yellow
  '#C4B5FD',  // Soft Violet
  '#000000',  // Black
  '#FFFFFF'   // White
]

export const ACCENT_COLOR_NAMES = ['accent', 'secondary', 'muted', 'black', 'white']

/**
 * Get accent color by index (with modulo rotation)
 */
export function getAccentColor(index) {
  return ACCENT_COLORS[index % ACCENT_COLORS.length]
}

/**
 * Format image filename for display
 */
export function formatFilename(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
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
