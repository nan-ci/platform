import { h } from 'preact'

export const Img = ({ size, ...props }) => {
  const img = new Image(size, size)
  img.alt = props.description
  const src = (img.src = props.source.length > 0 ? props.source : '')
  return h('img', { src }, null)
}
