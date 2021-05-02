import { h } from 'preact'

export const Img = ({ size, ...props }) => {
  const img = new Image(size, size)
  const src = (img.src = props.source.length > 0 ? props.source : '')
  const alt = props.description || undefined
  return h('img', { src, alt }, null)
}
