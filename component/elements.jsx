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
  <div class="main-content">
     <div class="top-bar">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="menu-icon" id="hamburgerMenu" width="24" height="24" viewBox="0 0 24 24">
            <title>menu</title>
            <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
        </svg>
        <a href="index.html">
            <svg xmlns='http://www.w3.org/2000/svg'  class="img-logoNaN" viewBox='0 0 50 50'><defs><radialGradient id='g' fy='0'><stop stop-color='#F7AEF8'/><stop offset='100%' stop-color='#777FFF'/></radialGradient></defs><path fill='url(#g)' d='M25 0L0 25l5 5 20-20 20 20 5-5M25 40l-5 5 5 5 5-5M25 20L10 35l5 5 10-10 10 10 5-5'/></svg>
        </a>
    </div>
    {children}
  </div>
)

export const Image = ({alt,image,...props}) => <img src={"../assets/img/"+image} alt={alt ? alt: image} {...props}/>


css(`
footer {
  margin-bottom: 1ch;
}
`)

export const Title = ({children,...props}) => (
  <div class="u-pad-default" {...props}>
    <h1 class="page-heading">{children}</h1>
  </div>
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
