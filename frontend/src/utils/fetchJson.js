/**
 * Fetch JSON with timeout — works on GitHub Pages without axios hang.
 */
export async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

export async function loadImagesCatalog(baseUrl = import.meta.env.BASE_URL || './') {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  // GitHub Pages: static images.json first
  try {
    const data = await fetchJson(`${base}images.json`)
    if (data?.images?.length) return data.images
  } catch (_) { /* try API next */ }

  try {
    const data = await fetchJson(`${base}api/images`)
    if (data?.images?.length) return data.images
  } catch (e) {
    throw new Error('无法加载图片列表，请稍后重试')
  }

  return []
}
