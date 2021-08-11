import { css } from '../lib/dom'
import { Div } from './elements'

css(`
._card{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  background: var(--white-lighter);
  padding:20px;
  margin: 1px 0px;
  color: var(--selection-dark);
  cursor: pointer;
}
._card:hover {
  background: var(--white-darker);
}
._btnsolve{
  color: var(--background-darker);
  background: transparent;
  padding: 10px;
  border: none;
  outline-color: var(--green-darker);
  cursor: pointer;
}
._title{
  color: var(--background-lighter);
  font-size: 20px;
}
._info{
  color: var(--red-darker);
  font-size: 15px;
}
._btnsolve:focus {
  background: transparent;
  color: var(--background-darker);
  background: transparent;
  outline-color: var(--green-darker);
  cursor: pointer;
}
`)

export const ChallengeCard = ({ data }) => (
  <Div class="_card">
    <section>
      <h1 class="_title">{data.title}</h1>
      <small class="_info">Click on for more details 👉</small>
    </section>
    <section>
      <button class="_btnsolve">Solve challenge</button>
    </section>
  </Div>
)
