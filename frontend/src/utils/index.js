/**
 * Editorial color system — Paper / Ink / Vermilion
 */
export const ACCENT_COLORS = [
  '#A94B3C',
  '#292825',
  '#8B877D',
  '#181816',
  '#F8F6F0'
]

export const ACCENT_COLOR_NAMES = ['accent', 'charcoal', 'gray', 'ink', 'paper']

export function getAccentColor(index) {
  return ACCENT_COLORS[index % ACCENT_COLORS.length]
}

export function formatFilename(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
}

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
