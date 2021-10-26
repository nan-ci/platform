import { Span, Color, P } from './elements.jsx'
import { css } from '../lib/dom.js'

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

export const MItalicWorld = ({ children }) => {
  return (
    <P>
      <Span fg="orange"> > </Span>
      <Color.CommentLighter>*</Color.CommentLighter>
      <Span style={{ fontStyle: 'italic' }}>{children}</Span>
      <Color.CommentLighter>*</Color.CommentLighter>
    </P>
  )
}

export const MLi = ({ children }) => {
  return (
    <li class="mli">
      <Span fg="orange"> - </Span>
      <Span style={{ padding: '0.1rem', background: '#4b4b4ba1' }}>
        <Color.CommentLighter>`</Color.CommentLighter>
        {children}
        <Color.CommentLighter>`</Color.CommentLighter>
      </Span>
    </li>
  )
}
