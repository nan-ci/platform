import { toChildArray } from 'preact'

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
    name.replace(/-([a-z])/g, replaceToCamel),
    (props) => ((getStyle(props).color = value), Span(props)),
  ]),
)

export const divider = <Color.comment># {'+-'.repeat(38)} #</Color.comment>
export const equal = <Color.pink> = </Color.pink>

export const Main = ({ children }) => (
  <main>
    {toChildArray(children).map((child) => [
      <div>{divider}</div>,
      <section>{child}</section>,
    ])}
  </main>
)

export const Footer = ({ children }) => (
  <footer>
    <hr />
    {children}
  </footer>
)

const iconStyle = { style: { marignLeft: '2em' } }
export const Link = colorize(({ icon, children, ...props }) => (
  <a {...props}>
    {Icons[icon]
      ? h(Icons[icon], { ...iconStyle, fill: props.style?.color })
      : null}
    {children}
  </a>
))
