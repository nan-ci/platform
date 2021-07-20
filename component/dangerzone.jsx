import { css } from '../lib/dom'
import { Div, P } from './elements'

css(`
.panel{
  margin: 25px 0px;
  border: 1px solid var(--red-lighter);
  border-radius: 4px;
}
.panel-heading {
  padding: 10px 15px;
  background: var(--red-lighter);
  text-align: center;
}
.panel-text{
  padding: 20px 0px;
  text-align: center;
}
.btn-panel{
  background: var(--red);
  color: var(--white);
  outline: none;
  padding: 15px;
  width: 40%;
  cursor: pointer;
}
.btn-block-panel{
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
`)
export const DangerZone = ({ discordId, userId }) => {
  const onCloseAccount = () => {}
  return (
    <Div class="panel">
      <Div class="panel-heading">Danger zone</Div>
      <P class="panel-text">Changes in this section are permanent.</P>
      <Div class="btn-block-panel">
        <button class="btn-panel" onClick={onCloseAccount}>
          Delete my account
        </button>
      </Div>
    </Div>
  )
}
P
