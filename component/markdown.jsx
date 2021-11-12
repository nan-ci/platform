import { Span, Color, P, Div, Link } from './elements.jsx'
import { css } from '../lib/dom.js'

css(`
    li.mli {
      display:block;
    }

    div.warn{
      outline:1px dashed red;
      padding:0.8rem;
    }

`)

export const MTitle = Object.fromEntries(
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((el) => [
    el,
    ({ children, ...props }) =>
      h(
        el,
        props,
        <>
          <Span fg="red">{'#'.repeat(Number(el.slice(1)))}</Span>&nbsp;
        </>,
        children,
      ),
  ]),
)

const NavLink = (props) => (
  <li>
    {' '}
    - <Link {...props} />
  </li>
)

export const MItalicWord = ({ children, color, type }) => {
  return (
    <P>
      <Color.Orange>{'>'}</Color.Orange>
      <Color.CommentLighter>*</Color.CommentLighter>
      <Span fg={color} style={{ fontStyle: 'italic' }}>
        {children}
      </Span>
      <Color.CommentLighter>*</Color.CommentLighter>
      {type === 'ps' && <Color.Orange>{'<'}</Color.Orange>}
    </P>
  )
}

const Text = ({ text, link, ...props }) => {
  const Colorize = link ? Color.CyanDarker : Color.CommentLighter
  return <Colorize {...props}>{link ? `[${text}]` : `\`${text}\``}</Colorize>
}

export const MLi = ({ children }) => {
  return (
    <li>
      <Span fg="orange"> - </Span>
      <Text
        text={children}
        style={{
          padding: '0.1rem',
          background: 'rgba(75, 75, 75, 0.63)',
        }}
      />
    </li>
  )
}

export const MLink = ({ children, link }) => {
  return (
    <NavLink class="mli" href={link}>
      <Span fg="orange"> - </Span>
      <Text text={children} link style={{ padding: '0.1rem' }} />
    </NavLink>
  )
}

export const Warning = ({ children }) => {
  return <Div class="warn">{children}</Div>
}
