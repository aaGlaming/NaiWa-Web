export async function shareContent({ title, text, url }) {
  const shareUrl = url || window.location.href
  const payload = `${text}\n${shareUrl}`

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: shareUrl })
      return 'shared'
    } catch (e) {
      if (e.name === 'AbortError') return 'cancelled'
    }
  }

  try {
    await navigator.clipboard.writeText(payload)
    return 'copied'
  } catch {
    return 'failed'
  }
}
