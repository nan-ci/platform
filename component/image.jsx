import { h } from 'preact'
import { user } from '../lib/auth'

export const Img = ({ className, size = 150, uri }) => {
  const props = {
    height: size,
    width: size,
    className: className || undefined,
  }
  const src = uri || undefined
  const alt = user.name
  return h('img', { src, alt, ...props }, null)
}
