import { toChildArray } from 'preact'

import { css } from '../lib/dom.js'
import { RouterLink } from '../lib/router.js'
import * as Icons from './icons.jsx'

/*
  This file contains all basic components
*/

const colors = window.colors || {}
const getStyle = (props) => props.style || (props.style = {})
const colorize = (tag) => (props) => {
  const style = getStyle(props)
  props.bg && (style.backgroundColor = colors[props.bg])
  props.fg && (style.color = colors[props.fg])
  props.bg && console.log({ style, props })
  return h(tag, props)
}

const replaceToCamel = (_, l) => l.toUpperCase()

export const P = colorize('p')
export const Div = colorize('div')
export const Span = colorize('span')
export const Color = Object.fromEntries(
  Object.entries(colors).map(([name, value]) => [
    name.replace(/-([a-z])/g, replaceToCamel).replace(/^(.)/, replaceToCamel),
    (props) => ((getStyle(props).color = value), Span(props)),
  ]),
)

export const divider = <Color.Comment># {'··'.repeat(38)} #</Color.Comment>
export const equal = <Color.Pink> = </Color.Pink>

export const Main = ({ children }) => (
  <main>
    {toChildArray(children).map((child) => [
      <div>{divider}</div>,
      <section>{child}</section>,
    ])}
  </main>
)

css(`
footer {
  margin-bottom: 1ch;
}
`)

export const Title = ({ children, ...props }) => (
  <Color.Purple {...props}>
    {children}
    {':\n'}
  </Color.Purple>
)

const iconStyle = { style: { marignLeft: '2em' } }
export const Link = colorize(({ icon, children, ...props }) => {
  const tag = /^(http|\/api\/)/.test(props.href) ? 'a' : RouterLink
  return h(
    tag,
    props,
    Icons[icon]
      ? h(Icons[icon], { ...iconStyle, fill: props.style?.color })
      : null,
    children,
  )
})
