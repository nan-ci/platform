import { Span, Color, P, Div } from './elements.jsx'
import { css } from '../lib/dom.js'
import { NavLink } from '../component/header.jsx'
import { NavLink } from './header.jsx'

css(`
    li.mli {
      display:block;
    }

    .warn{
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
    <NavLink class={`mli`} href={link ? link : null}>
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
  )
}

export const Warning = ({ children }) => {
  return <Div class="warn">{children}</Div>
}
