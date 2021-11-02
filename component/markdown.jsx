import { Span, Color, P, Div } from './elements.jsx'
import { css } from '../lib/dom.js'
import { NavLink } from './header.jsx'

css(`
    li.mli {
      display:block;
    }
`)

export const MTitle = Object.fromEntries(
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((el) => [
    el,
    ({ children, ...props }) =>
      h(
        el,
        props,
        <Color.Red style={{ marginRight: '1ch' }}>
          {'#'.repeat(Number(el.slice(1)))}
        </Color.Red>,
        children,
      ),
  ]),
)

export const Check = ({ val }) => {
  return <Color.Comment bg="white">[{val}]</Color.Comment>
}

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

export const MLi = ({ children, link }) => {
  let ColorIze = link ? Color.CyanDarker : Color.CommentLighter
  return (
    <li class={`mli`}>
      <NavLink href={link ? link : null}>
        <Span fg="orange"> - </Span>
        <Span
          style={{
            padding: '0.1rem',
            background: !link && 'rgba(75, 75, 75, 0.63)',
            textDecoration: link && 'underline',
          }}
          fg={link ? 'cyan-darker' : 'white'}
        >
          <ColorIze>{link ? '[' : '`'}</ColorIze>
          {children}
          <ColorIze>{link ? ']' : '`'}</ColorIze>
        </Span>
      </NavLink>
    </li>
  )
}

export const Warning = ({ children }) => {
  return (
    <Div style={{ outline: '1px dashed red', padding: '0.8rem' }}>
      {children}
    </Div>
  )
}
