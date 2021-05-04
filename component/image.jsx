import { h } from 'preact'

export const Img = ({ size, description, source }) => {
  const img = new Image(size, size)
  const src = (img.src = `/assets/img/${source}` || '')
  const alt = description || undefined
  return h('img', { src, alt, height: size, width: size }, null)
}
