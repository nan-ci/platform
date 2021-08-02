import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'

css(`
   .prof-cours-moduleCard {
      width: 100%;
      height: 60px;
      border: 1px solid white;
      margin: 20px 0px;
   }
`)

export const ModuleCard = ({ data: { name, description } }) => {
  return (
    <Div class="prof-cours-moduleCard">
      <h3>{name}</h3>
      <P>{description}</P>
    </Div>
  )
}
