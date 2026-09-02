export function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function hasSeen(key) {
  return localStorage.getItem(key) === '1'
}

export function markSeen(key) {
  localStorage.setItem(key, '1')
}
