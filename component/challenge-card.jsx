import { css } from '../lib/dom'
import { Div, P, Span } from './elements'

css(`
.block{
  background: var(--white-darker);
  padding: 10px;
  margin: 20px 0px;
  border-radius: 5px;
  color: var(--selection-dark);
}
details > summary {
  outline: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--selection-dark);

}
.block-item{
  margin: 10px 0px;
  font-size: 1.3rem;
  color: var(--selection-dark);
}
.kata-item {
  font-size: 1.3rem;
  cursor: pointer;
  padding: 2px;
  color: var(--selection-dark);
}
.kata-item:hover{
  background: var(--grey-lighter);
  width: 100%;
}
`)

export const ChallengeCard = ({ data }) => (
  <details class="block">
    <summary class="block-title">
      {data.title}
      <P style={{ color: 'var(--selection-dark)' }}>{data.description}</P>
    </summary>
    <Div class="block-item">
      {data.kata.map((m) => (
        <ul key={m.id}>
          <li class="kata-item">
            {m.title}{' '}
            {m.submited ? (
              <Span
                class="fa fa-check"
                style={{ color: 'var(--orange)' }}
              ></Span>
            ) : null}
          </li>
        </ul>
      ))}
    </Div>
  </details>
)
