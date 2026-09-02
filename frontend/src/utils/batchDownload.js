import JSZip from 'jszip'

export async function downloadImagesAsZip(images, baseUrl, zipName = '奶蛙表情包') {
  if (!images.length) return 0

  const zip = new JSZip()
  const folder = zip.folder(zipName)
  let count = 0

  for (const image of images) {
    try {
      const res = await fetch(`${baseUrl}images/${image.filename}`)
      if (!res.ok) continue
      const blob = await res.blob()
      folder.file(image.filename, blob)
      count++
    } catch {
      /* skip failed files */
    }
  }

  if (!count) throw new Error('没有可下载的图片')

  const content = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(content)
  link.download = `${zipName}_${count}张.zip`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
  return count
}
